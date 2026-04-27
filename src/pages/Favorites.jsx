import { useFavorites } from "../hooks/useFavorites";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import AppShell from "../layout/AppShell";
import EmptyState from "../components/EmptyState";
import "./Home.css";
import "./Favorites.css";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <AppShell header={{ showSearch: false }}>
      <div className="home-page">
        <div className="favorites-header">
          <Link to="/" className="back-btn" aria-label="Go back">
            <FiArrowLeft />
          </Link>
        </div>

        {favorites.length === 0 ? (
          <EmptyState
            title="No favorites yet"
            description="Tap the heart on any movie card to build your list."
          />
        ) : (
          <div className="movies-grid">
            {favorites.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
};

export default Favorites;
