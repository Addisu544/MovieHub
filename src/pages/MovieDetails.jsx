import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import "./MovieDetails.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieDetails(id);
      setMovie(data);
      setLoading(false);
    };

    loadMovie();
  }, [id]);

  if (loading) return <p className="loading">Loading...</p>;
  if (!movie) return <p>Movie not found.</p>;

  const trailer = movie.videos?.results?.find(
    (v) => v.type === "Trailer" && v.site === "YouTube"
  );

  return (
    <div className="movie-details">
      <div className="movie-header">
        <img src={IMAGE_BASE + movie.poster_path} alt={movie.title} />

        <div className="movie-info">
          <h1>{movie.title}</h1>
          <p className="tagline">{movie.tagline}</p>

          <p>
            <strong>Rating:</strong> ⭐ {movie.vote_average}
          </p>
          <p>
            <strong>Release:</strong> {movie.release_date}
          </p>
          <p>
            <strong>Runtime:</strong> {movie.runtime} min
          </p>

          <div className="genres">
            {movie.genres.map((g) => (
              <span key={g.id}>{g.name}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="overview">
        <h3>Overview</h3>
        <p>{movie.overview}</p>
      </div>

      {trailer && (
        <div className="trailer">
          <h3>Trailer</h3>
          <iframe
            src={`https://www.youtube.com/embed/${trailer.key}`}
            title="Trailer"
            allowFullScreen
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
