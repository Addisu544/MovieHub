import { memo } from "react";
import { Link } from "react-router-dom";
import { useFavorites } from "../hooks/useFavorites";
import { TMDB_POSTER_SIZES, tmdbImageUrl } from "../utils/tmdbImage";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import "./MovieCard.css";

const MovieCard = ({ movie, loading = false }) => {
  const { toggleFavorite, isFavorite } = useFavorites();

  // If loading, render skeleton
  if (loading) {
    return (
      <div className="card skeleton" aria-hidden="true">
        <div className="poster skeleton-box" />
        <div className="card-body">
          <div className="title-placeholder skeleton-box" />
          <div className="card-subtitle skeleton-box" style={{ width: "40%", height: 14 }} />
        </div>
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  return (
    <article className="card">
      <Link to={`/movie/${movie.id}`} className="card-link" aria-label={movie.title}>
        <div className="poster">
          {movie.poster_path ? (
            <img
              src={tmdbImageUrl(movie.poster_path, {
                size: TMDB_POSTER_SIZES.sm,
              })}
              alt={movie.title}
              loading="lazy"
              decoding="async"
              className="poster-img"
            />
          ) : (
            <div className="poster-fallback" aria-hidden="true" />
          )}

          <div className="poster-overlay" aria-hidden="true" />

          <div className="card-badges">
            <span className="badge">⭐ {Number(movie.vote_average || 0).toFixed(1)}</span>
          </div>
        </div>

        <div className="card-body">
          <h3 className="card-title" title={movie.title}>
            {movie.title}
          </h3>
          {movie.release_date && (
            <div className="card-subtitle">
              {new Date(movie.release_date).getFullYear()}
            </div>
          )}
        </div>
      </Link>

      <button
        type="button"
        className={`fav ${favorite ? "is-on" : ""}`}
        onClick={() => toggleFavorite(movie)}
        aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
      >
        {favorite ? <FaHeart /> : <FiHeart />}
      </button>
    </article>
  );
};

export default memo(MovieCard);
