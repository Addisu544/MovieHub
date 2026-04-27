import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PageLoader from "./components/PageLoader";
import { FavoritesProvider } from "./context/FavoritesContext";
import { ThemeProvider } from "./context/ThemeContext";

const MovieDetails = lazy(() => import("./pages/MovieDetails"));
const Favorites = lazy(() => import("./pages/Favorites"));
function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <Router>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </Suspense>
        </Router>
      </FavoritesProvider>
    </ThemeProvider>
  );
}

export default App;
