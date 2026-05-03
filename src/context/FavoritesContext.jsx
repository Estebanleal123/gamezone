import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const { user } = useAuth(); //clave para separar por usuario
  const [favorites, setFavorites] = useState([]);

  //Generar clave dinámica
  const getStorageKey = () => {
    return user ? `favorites_${user.email}` : 'gamezone_favorites';
  };

  //Cargar favoritos cuando cambia el usuario
  useEffect(() => {
    try {
      const key = getStorageKey();
      const saved = localStorage.getItem(key);
      setFavorites(saved ? JSON.parse(saved) : []);
    } catch {
      setFavorites([]);
    }
  }, [user]);

  //Guardar favoritos
  useEffect(() => {
    try {
      const key = getStorageKey();
      localStorage.setItem(key, JSON.stringify(favorites));
    } catch (err) {
      console.error('No se pudo guardar en localStorage:', err);
    }
  }, [favorites, user]);

  //Agregar o quitar favorito
  const toggleFavorite = useCallback((game) => {
    setFavorites((prev) => {
      const exists = prev.some((g) => g.id === game.id);
      return exists
        ? prev.filter((g) => g.id !== game.id)
        : [...prev, game];
    });
  }, []);

  //Verificar si es favorito
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