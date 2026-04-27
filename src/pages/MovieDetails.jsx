import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api/tmdb";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import {
  TMDB_BACKDROP_SIZES,
  TMDB_POSTER_SIZES,
  tmdbImageUrl,
} from "../utils/tmdbImage";
import AppShell from "../layout/AppShell";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchMovieDetails({ id });
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
    <AppShell header={{ showSearch: false }}>
      <div className="details">
      <div className="favorites-header">
          <Link to="/" className="back-btn" aria-label="Go back">
            <FiArrowLeft />
          </Link>
        </div>
        <section className="details-hero" aria-label="Movie header">
          <div className="details-backdrop" aria-hidden="true">
           
            {movie.backdrop_path && (
              <img
                src={tmdbImageUrl(movie.backdrop_path, {
                  size: TMDB_BACKDROP_SIZES.lg,
                })}
                alt=""
                className="details-backdrop-img"
                loading="eager"
                decoding="async"
              />
            )}
            <div className="details-scrim" />
          </div>

          <div className="details-hero-inner">
            <div className="details-poster">
              {movie.poster_path ? (
                <img
                  src={tmdbImageUrl(movie.poster_path, {
                    size: TMDB_POSTER_SIZES.lg,
                  })}
                  alt={movie.title}
                  loading="eager"
                  decoding="async"
                />
              ) : (
                <div className="details-poster-fallback" aria-hidden="true" />
              )}
            </div>

            <div className="details-head">
              <h1 className="details-title">{movie.title}</h1>
              {movie.tagline && <p className="details-tagline">{movie.tagline}</p>}

              <div className="details-meta">
                <span className="pill">⭐ {Number(movie.vote_average || 0).toFixed(1)}</span>
                {movie.release_date && (
                  <span className="pill">
                    {new Date(movie.release_date).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                )}
                {movie.runtime ? <span className="pill">{movie.runtime} min</span> : null}
              </div>

              <div className="details-genres">
                {movie.genres?.map((g) => (
                  <span key={g.id} className="genre">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="details-body" aria-label="Movie overview">
          <div className="details-card">
            <h2 className="details-h2">Overview</h2>
            <p className="details-overview">{movie.overview || "No overview available."}</p>
          </div>

          {trailer && (
            <div className="details-card">
              <h2 className="details-h2">Trailer</h2>
              <div className="video">
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.key}`}
                  title="Trailer"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          )}
        </section>
      </div>
    </AppShell>
  );
};

export default MovieDetails;
