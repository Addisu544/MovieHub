const BASE_URL = "https://api.themoviedb.org/3";

function getApiKey() {
  const key = import.meta.env.VITE_TMDB_KEY;
  if (!key) {
    throw new Error(
      "Missing TMDB key. Set VITE_TMDB_KEY in your .env file (see .env.example)."
    );
  }
  return key;
}

function toQueryString(params) {
  const qs = new URLSearchParams();
  Object.entries(params).forEach(([k, v]) => {
    if (v === undefined || v === null || v === "") return;
    qs.set(k, String(v));
  });
  return qs.toString();
}

async function tmdbGet(path, params = {}, { signal } = {}) {
  const api_key = getApiKey();
  const query = toQueryString({ api_key, language: "en-US", ...params });
  const res = await fetch(`${BASE_URL}${path}?${query}`, { signal });

  if (!res.ok) {
    let details = "";
    try {
      const body = await res.json();
      details = body?.status_message ? ` (${body.status_message})` : "";
    } catch {
      // ignore
    }
    throw new Error(`TMDB request failed: ${res.status} ${res.statusText}${details}`);
  }

  return await res.json();
}

export async function fetchPopularMovies({ page = 1, signal } = {}) {
  return await tmdbGet("/movie/popular", { page }, { signal });
}

export async function fetchTrendingMovies({ timeWindow = "week", signal } = {}) {
  return await tmdbGet(`/trending/movie/${timeWindow}`, {}, { signal });
}

export async function searchMovies({ query, page = 1, signal } = {}) {
  return await tmdbGet("/search/movie", { query, page, include_adult: false }, { signal });
}

export async function fetchGenres({ signal } = {}) {
  return await tmdbGet("/genre/movie/list", {}, { signal });
}

export async function fetchMovieDetails({ id, signal } = {}) {
  return await tmdbGet(
    `/movie/${id}`,
    { append_to_response: "videos,credits" },
    { signal }
  );
}
