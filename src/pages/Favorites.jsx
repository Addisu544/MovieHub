// import { useFavorites } from "../context/FavoritesContext";
// import MovieCard from "../components/MovieCard";
// import "./Home.css"; // reuse grid styling
// import TopBar from "../components/TopBar";
// const Favorites = () => {
//   const { favorites } = useFavorites();

//   return (
//     <div className="home-page">
//       {/* <TopBar /> */}
//       <TopBar showFavorites={false} />
//       <h3>Your Favorites</h3>

//       {favorites.length === 0 ? (
//         <p>No favorite movies yet.</p>
//       ) : (
//         <div className="movies-grid">
//           {favorites.map((movie) => (
//             <MovieCard key={movie.id} movie={movie} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Favorites;
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import MovieCard from "../components/MovieCard";
import TopBar from "../components/TopBar";
import "./Home.css";
import "./Favorites.css";

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="home-page">
      <TopBar showFavorites={false} />

      <div className="favorites-header">
        <Link to="/" className="back-btn" aria-label="Go back">
          <FiArrowLeft />
        </Link>

        {/* <h5 className="favorites-title">Your Favorites</h5> */}
      </div>

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
