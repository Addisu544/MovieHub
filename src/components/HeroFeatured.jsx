import { Link } from "react-router-dom";
import { TMDB_BACKDROP_SIZES, tmdbImageUrl } from "../utils/tmdbImage";
import "./HeroFeatured.css";

const clamp = (text, max) => {
  if (!text) return "";
  if (text.length <= max) return text;
  return `${text.slice(0, max - 1).trimEnd()}…`;
};

const HeroFeatured = ({ movie, loading }) => {
  if (loading) {
    return (
      <section className="hero hero-skeleton" aria-label="Featured movie">
        <div className="hero-backdrop skeleton-box" />
        <div className="hero-content">
          <div className="hero-kicker skeleton-box" />
          <div className="hero-title skeleton-box" />
          <div className="hero-meta skeleton-box" />
          <div className="hero-overview skeleton-box" />
          <div className="hero-cta skeleton-box" />
        </div>
      </section>
    );
  }

  if (!movie) return null;

  const backdrop = tmdbImageUrl(movie.backdrop_path, {
    size: TMDB_BACKDROP_SIZES.md,
  });

  return (
    <section className="hero" aria-label="Featured movie">
      <div className="hero-backdrop" aria-hidden="true">
        {backdrop && (
          <img
            src={backdrop}
            alt=""
            loading="eager"
            decoding="async"
            className="hero-backdrop-img"
          />
        )}
        <div className="hero-scrim" />
      </div>

      <div className="hero-content">
        <div className="hero-kicker">Trending this week</div>
        <h2 className="hero-h2">{movie.title}</h2>

        <div className="hero-meta">
          <span className="pill">⭐ {Number(movie.vote_average || 0).toFixed(1)}</span>
          {movie.release_date && (
            <span className="pill">{new Date(movie.release_date).getFullYear()}</span>
          )}
        </div>

        <p className="hero-overview">{clamp(movie.overview, 180)}</p>

        <Link to={`/movie/${movie.id}`} className="btn-primary">
          View details
        </Link>
      </div>
    </section>
  );
};

export default HeroFeatured;

