import { Link } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";
import "./MovieCard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie, loading = false }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  // If loading, render skeleton
  if (loading) {
    return (
      <div className="movie-card skeleton">
        <div className="image-wrapper skeleton-box" />
        <div className="movie-info">
          <div className="title-placeholder skeleton-box" />
        </div>
        <div className="fav-btn skeleton-box" />
      </div>
    );
  }

  const favorite = isFavorite(movie.id);

  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`} className="movie-link">
        <div className="image-wrapper">
          <img src={IMAGE_BASE + movie.poster_path} alt={movie.title} />
        </div>

        <div className="movie-info">
          <h3 title={movie.title}>{movie.title}</h3>
        </div>
      </Link>

      <button
        className="fav-btn"
        onClick={() =>
          favorite ? removeFromFavorites(movie.id) : addToFavorites(movie)
        }
      >
        {favorite ? "❤️ Remove" : "🤍 Favorite"}
      </button>
    </div>
  );
};

export default MovieCard;
