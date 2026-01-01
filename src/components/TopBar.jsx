import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import "./TopBar.css";

const TopBar = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <div className={`topbar ${darkMode ? "dark" : "light"}`}>
      {/* Left spacer */}
      <div className="topbar-side" />

      {/* Center title */}
      <h1 className="topbar-title">Movies</h1>

      {/* Right actions */}
      <div className="topbar-actions">
        <Link to="/favorites" className="favorites-btn">
          ⭐ Favorites
        </Link>

        <label className="switch">
          <input type="checkbox" checked={darkMode} onChange={toggleTheme} />
          <span className="slider round"></span>
        </label>
      </div>
    </div>
  );
};

export default TopBar;
