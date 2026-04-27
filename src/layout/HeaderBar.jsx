import { Link, useLocation } from "react-router-dom";
import { FiHeart, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { useTheme } from "../hooks/useTheme";
import "./HeaderBar.css";

const HeaderBar = ({
  searchValue,
  onSearchChange,
  onSearchClear,
  searchPlaceholder = "Search movies…",
  searchStatus,
  showSearch = false,
}) => {
  const { darkMode, toggleTheme } = useTheme();
  const location = useLocation();

  const isFavorites = location.pathname === "/favorites";

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="MovieHub home">
          <span className="brand-mark" aria-hidden="true" />
          <span className="brand-text">MovieHub</span>
        </Link>

        {showSearch && (
          <div className="search" role="search">
            <FiSearch className="search-icon" aria-hidden="true" />
            <input
              className="search-input"
              value={searchValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder={searchPlaceholder}
              aria-label="Search movies"
              spellCheck={false}
            />

            {!!searchValue && (
              <button
                type="button"
                className="icon-btn"
                onClick={() => onSearchClear?.()}
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}

            {searchStatus && <div className="search-status">{searchStatus}</div>}
          </div>
        )}

        <div className="actions">
          <Link
            to="/favorites"
            className={`action-link ${isFavorites ? "active" : ""}`}
            aria-label="Favorites"
          >
            <FiHeart />
            <span className="action-text">Favorites</span>
          </Link>

          <button
            type="button"
            className="icon-btn"
            onClick={toggleTheme}
            aria-label={darkMode ? "Switch to light theme" : "Switch to dark theme"}
          >
            {darkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderBar;

