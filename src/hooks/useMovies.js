import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { fetchGenres, fetchPopularMovies, searchMovies } from "../api/tmdb";

function normalizePagedResponse(data) {
  return {
    page: data?.page ?? 1,
    totalPages: data?.total_pages ?? 1,
    results: Array.isArray(data?.results) ? data.results : [],
  };
}

export function useMovies({ query }) {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [isPageLoading, setIsPageLoading] = useState(false);
  const [error, setError] = useState(null);

  const activeAbort = useRef(null);

  const mode = useMemo(() => {
    const q = (query ?? "").trim();
    return q ? { type: "search", q } : { type: "popular" };
  }, [query]);

  const canLoadMore = page < totalPages && !isPageLoading && !isInitialLoading;

  const loadPage = useCallback(
    async (nextPage, { replace } = { replace: false }) => {
      if (activeAbort.current) activeAbort.current.abort();
      const controller = new AbortController();
      activeAbort.current = controller;

      setError(null);
      if (replace) setIsInitialLoading(true);
      else setIsPageLoading(true);

      try {
        const data =
          mode.type === "search"
            ? await searchMovies({
                query: mode.q,
                page: nextPage,
                signal: controller.signal,
              })
            : await fetchPopularMovies({ page: nextPage, signal: controller.signal });

        const normalized = normalizePagedResponse(data);
        setPage(normalized.page);
        setTotalPages(normalized.totalPages);
        setMovies((prev) =>
          replace ? normalized.results : [...prev, ...normalized.results]
        );
      } catch (e) {
        if (e?.name === "AbortError") return;
        setError(e instanceof Error ? e : new Error("Failed to fetch movies"));
      } finally {
        setIsInitialLoading(false);
        setIsPageLoading(false);
      }
    },
    [mode]
  );

  const refresh = useCallback(() => {
    setMovies([]);
    setPage(1);
    setTotalPages(1);
    return loadPage(1, { replace: true });
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (!canLoadMore) return;
    return loadPage(page + 1, { replace: false });
  }, [canLoadMore, loadPage, page]);

  useEffect(() => {
    refresh();
    return () => {
      if (activeAbort.current) activeAbort.current.abort();
    };
  }, [refresh]);

  useEffect(() => {
    const controller = new AbortController();
    fetchGenres({ signal: controller.signal })
      .then((data) => setGenres(Array.isArray(data?.genres) ? data.genres : []))
      .catch(() => {
        // genres are non-critical; ignore for now
      });
    return () => controller.abort();
  }, []);

  return {
    movies,
    genres,
    mode,
    page,
    totalPages,
    canLoadMore,
    isInitialLoading,
    isPageLoading,
    error,
    refresh,
    loadMore,
  };
}

