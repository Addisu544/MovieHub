import "./FilterBar.css";

const FilterBar = ({
  genres,
  selectedGenre,
  setSelectedGenre,
  minRating,
  setMinRating,
  sortBy,
  setSortBy,
}) => {
  return (
    <div className="filter-bar">
      {/* Genre Filter */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
      >
        <option value="">All Genres</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>

      {/* Rating Filter */}
      <select value={minRating} onChange={(e) => setMinRating(e.target.value)}>
        <option value="0">All Ratings</option>
        <option value="5">5+</option>
        <option value="6">6+</option>
        <option value="7">7+</option>
        <option value="8">8+</option>
      </select>

      {/* Sort */}
      <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
        <option value="">Sort By</option>
        <option value="rating">Rating</option>
        <option value="date">Release Date</option>
      </select>
    </div>
  );
};

export default FilterBar;
