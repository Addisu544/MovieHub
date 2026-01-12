import { useEffect, useRef, useState } from "react";
import MovieCard from "../components/MovieCard";
import FilterBar from "../components/FilterBar";
import SearchBar from "../components/SearchBar";
import TopBar from "../components/TopBar";

import "./Home.css";

const API_KEY = "fd43471a30e013ebf4bef262861b112e";
const BASE_URL = "https://api.themoviedb.org/3";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);

  const [selectedGenre, setSelectedGenre] = useState("");
  const [minRating, setMinRating] = useState("0");
  const [sortBy, setSortBy] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef(null);

  useEffect(() => {
    fetchMovies(1);
    fetchGenres();
  }, []);

  const fetchMovies = async (pageNumber = 1) => {
    if (loading) return;

    setLoading(true);

    const res = await fetch(
      `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNumber}`
    );
    const data = await res.json();

    setMovies((prev) =>
      pageNumber === 1 ? data.results : [...prev, ...data.results]
    );

    setLoading(false);
  };

  const fetchGenres = async () => {
    const res = await fetch(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
    const data = await res.json();
    setGenres(data.genres);
  };

  const handleSearch = async (query) => {
    const res = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );
    const data = await res.json();
    setMovies(data.results);
    setPage(1);
  };

  // 🔥 Infinite Scroll Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !loading) {
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => observer.disconnect();
  }, [loading]);

  // Fetch new page
  useEffect(() => {
    if (page > 1) fetchMovies(page);
  }, [page]);

  const filteredMovies = movies
    .filter(
      (movie) =>
        selectedGenre === "" || movie.genre_ids.includes(Number(selectedGenre))
    )
    .filter((movie) => movie.vote_average >= Number(minRating))
    .sort((a, b) => {
      if (sortBy === "rating") return b.vote_average - a.vote_average;
      if (sortBy === "date")
        return new Date(b.release_date) - new Date(a.release_date);
      return 0;
    });

  return (
    <div className="home-page">
      <TopBar />

      <SearchBar onSearch={handleSearch} />

      <FilterBar
        genres={genres}
        selectedGenre={selectedGenre}
        setSelectedGenre={setSelectedGenre}
        minRating={minRating}
        setMinRating={setMinRating}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* <div className="movies-grid">
        {loading
          ? Array.from({ length: 8 }).map((_, i) => (
              <MovieCard key={i} loading={true} />
            ))
          : filteredMovies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
      </div> */}
      <div className="movies-grid">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}

        {/* Skeletons only for next-page loading */}
        {loading &&
          page > 1 &&
          Array.from({ length: 6 }).map((_, i) => (
            <MovieCard key={`skeleton-${i}`} loading />
          ))}
      </div>

      {/* 👇 Scroll trigger */}
      <div ref={observerRef} className="scroll-trigger" />

      {loading && <p className="loading-text">Loading...</p>}
    </div>
  );
};

export default Home;
