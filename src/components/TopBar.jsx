import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./TopBar.css";

const TopBar = ({ showFavorites = true }) => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`topbar ${darkMode ? "dark" : "light"}`}>
      {/* Left spacer */}
      <div className="topbar-side" />

      {/* Center title */}
      <h1 className="topbar-title">Movies Hub</h1>

      {/* Right actions */}
      <div className="topbar-actions">
        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
        {/* <Link to="/favorites" className="favorites-btn">
          ⭐ Favorites
        </Link> */}
        {showFavorites && (
          <Link to="/favorites" className="favorites-btn">
            ⭐ Favorites
          </Link>
        )}
      </div>
    </div>
  );
};

export default TopBar;
