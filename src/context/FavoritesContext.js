import React, { createContext, useContext, useEffect, useState } from 'react';

const FavoritesContext = createContext({ favorites: [], toggleFavorite: () => {} });

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('favorites');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (e) {
      // ignore
    }
  }, [favorites]);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const exists = prev.includes(id);
      if (exists) return prev.filter((f) => f !== id);
      return [...prev, id];
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}
