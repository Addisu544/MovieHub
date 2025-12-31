import React, { useEffect, useState } from "react";
import { fetchTrendingMovies, searchMovies } from "../api/tmdb";
import MovieCard from "../components/MovieCard";
import SearchBar from "../components/SearchBar";
import LoadingSpinner from "../components/LoadingSpinner";
import "./Home.css";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTrending = async () => {
      setLoading(true);
      const data = await fetchTrendingMovies();
      setMovies(data);
      setLoading(false);
    };
    loadTrending();
  }, []);

  const handleSearch = async (query) => {
    setLoading(true);
    const data = await searchMovies(query);
    setMovies(data);
    setLoading(false);
  };

  return (
    <div className="home-page">
      <h1>Movie Finder</h1>
      <SearchBar onSearch={handleSearch} />
      {loading ? (
        <LoadingSpinner />
      ) : movies.length ? (
        <div className="movies-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Home;
