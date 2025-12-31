import React from "react";
import { Link } from "react-router-dom";
import "./MovieCard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <Link to={`/movie/${movie.id}`}>
        <img
          src={
            movie.poster_path
              ? IMAGE_BASE + movie.poster_path
              : "/placeholder.png"
          }
          alt={movie.title}
        />
        <h3>{movie.title}</h3>
        <p>⭐ {movie.vote_average}</p>
      </Link>
    </div>
  );
};

export default MovieCard;
