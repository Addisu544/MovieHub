import { useContext } from "react";
import { FavoritesContext } from "../context/favoritesContext";

export function useFavorites() {
  return useContext(FavoritesContext);
}

