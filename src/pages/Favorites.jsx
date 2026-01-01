import { useFavorites } from "../context/FavoritesContext";
import MovieCard from "../components/MovieCard";
import "./Home.css"; // reuse grid styling

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="home-page">
      <h1>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p>No favorite movies yet.</p>
      ) : (
        <div className="movies-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
