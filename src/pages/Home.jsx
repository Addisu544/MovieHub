import { useEffect, useMemo, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import AppShell from "../layout/AppShell";
import { useDebounce } from "../hooks/useDebounce";
import { useMovies } from "../hooks/useMovies";
import { fetchTrendingMovies } from "../api/tmdb";
import HeroFeatured from "../components/HeroFeatured";
import EmptyState from "../components/EmptyState";

import "./Home.css";

const Home = () => {
  const [rawQuery, setRawQuery] = useState("");
  const debouncedQuery = useDebounce(rawQuery, 300);
  const [featured, setFeatured] = useState(null);
  const [featuredLoading, setFeaturedLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("");

  const {
    movies,
    genres,
    canLoadMore,
    isInitialLoading,
    isPageLoading,
    error,
    loadMore,
  } = useMovies({ query: debouncedQuery });

  const observerRef = useRef(null);

  useEffect(() => {
    const controller = new AbortController();
    fetchTrendingMovies({ timeWindow: "week", signal: controller.signal })
      .then((data) => setFeatured(data?.results?.[0] ?? null))
      .catch(() => setFeatured(null))
      .finally(() => setFeaturedLoading(false));
    return () => controller.abort();
  }, []);

  const filteredMovies = useMemo(() => {
    return movies
      .filter(
        (movie) =>
          selectedGenre === "" ||
          movie.genre_ids?.includes?.(Number(selectedGenre))
      )
      .filter((movie) => (movie.vote_average ?? 0) >= Number(minRating))
      .sort((a, b) => {
        if (sortBy === "rating")
          return (b.vote_average ?? 0) - (a.vote_average ?? 0);
        if (sortBy === "date")
          return new Date(b.release_date) - new Date(a.release_date);
        return 0;
      });
  }, [movies, minRating, selectedGenre, sortBy]);

  const showLoadMoreSkeletons = isPageLoading;

  // Infinite Scroll (optimized: stable + avoids redundant triggers)
  useEffect(() => {
    const el = observerRef.current;
    if (!el) return;

    let lastIntersectAt = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        if (!canLoadMore) return;

        const now = Date.now();
        if (now - lastIntersectAt < 750) return;
        lastIntersectAt = now;
        loadMore();
      },
      { rootMargin: "600px 0px", threshold: 0.01 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [canLoadMore, loadMore]);

  return (
    <AppShell
      header={{
        showSearch: true,
        searchValue: rawQuery,
        onSearchChange: setRawQuery,
        onSearchClear: () => setRawQuery(""),
        searchStatus:
          debouncedQuery.trim().length > 0 && isInitialLoading ? "Searching…" : "",
      }}
    >
      <div className="home-page">
        <HeroFeatured movie={featured} loading={featuredLoading} />

      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        minRating={minRating}
        setMinRating={setMinRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {!isInitialLoading && !error && filteredMovies.length === 0 ? (
        <EmptyState
          title={debouncedQuery.trim() ? "No results found" : "Nothing to show"}
          description={
            debouncedQuery.trim()
              ? "Try a different title, or clear the search to browse popular movies."
              : "Adjust your filters to discover something new."
          }
        />
      ) : (
        <div className="movies-grid">
          {isInitialLoading
            ? Array.from({ length: 12 }).map((_, i) => (
                <MovieCard key={`skeleton-initial-${i}`} loading />
              ))
            : filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}

          {/* Skeletons only for next-page loading */}
          {showLoadMoreSkeletons &&
            Array.from({ length: 6 }).map((_, i) => (
              <MovieCard key={`skeleton-${i}`} loading />
            ))}
        </div>
      )}

      {/* 👇 Scroll trigger */}
      <div ref={observerRef} className="scroll-trigger" />

      {error && <p className="loading-text">Failed to fetch movies.</p>}
      </div>
    </AppShell>
  );
};

export default Home;
