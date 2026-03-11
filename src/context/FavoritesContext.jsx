import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // En Next.js localStorage solo existe en el navegador
  // por eso lo cargamos después del primer render
  useEffect(() => {
    try {
      const saved = localStorage.getItem('gamezone_favorites');
      if (saved) setFavorites(JSON.parse(saved));
    } catch {
      setFavorites([]);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('gamezone_favorites', JSON.stringify(favorites));
    } catch (err) {
      console.error('No se pudo guardar en localStorage:', err);
    }
  }, [favorites]);

  const toggleFavorite = useCallback((game) => {
    setFavorites((prev) => {
      const exists = prev.some((g) => g.id === game.id);
      return exists ? prev.filter((g) => g.id !== game.id) : [...prev, game];
    });
  }, []);

  const isFavorite = useCallback(
    (gameId) => favorites.some((g) => g.id === gameId),
    [favorites]
  );

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de FavoritesProvider');
  return ctx;
}