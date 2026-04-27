const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

export const TMDB_POSTER_SIZES = {
  sm: "w342",
  md: "w500",
  lg: "w780",
};

export const TMDB_BACKDROP_SIZES = {
  sm: "w780",
  md: "w1280",
  lg: "original",
};

export function tmdbImageUrl(path, { size = "w500" } = {}) {
  if (!path) return "";
  return `${TMDB_IMAGE_BASE}/${size}${path}`;
}

