import React, { createContext, useContext, useEffect, useState } from 'react';
import fallbackMovies from '../data/movies';

const MoviesContext = createContext({ movies: [], loading: true });

export function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    const normalize = (m) => ({
      id: String(m.id),
      title: m.title,
      description: m.description || m.overview || '',
      posterURL: m.posterURL || m.posterUrl || m.posterUrl || m.poster || '',
      rating: typeof m.rating === 'number' ? m.rating : typeof m.rate === 'number' ? m.rate : null,
      trailer: m.trailer || m.video || '',
    });

    fetch('/movies.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then((data) => {
        if (mounted && Array.isArray(data)) {
          setMovies(data.map(normalize));
          setLoading(false);
        }
      })
      .catch(() => {
        // fallback to static data
        setMovies(fallbackMovies.map((m) => normalize(m)));
        setLoading(false);
      });

    return () => (mounted = false);
  }, []);

  return (
    <MoviesContext.Provider value={{ movies, loading }}>
      {children}
    </MoviesContext.Provider>
  );
}

export function useMovies() {
  return useContext(MoviesContext);
}
