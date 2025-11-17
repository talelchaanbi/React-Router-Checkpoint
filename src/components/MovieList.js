import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import { useMovies } from '../context/MoviesContext';
import { useFavorites } from '../context/FavoritesContext';

function MovieList() {
  const navigate = useNavigate();
  const { movies, loading } = useMovies();
  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('title-asc');
  const [minRating, setMinRating] = useState(0);
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const { favorites } = useFavorites();

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    let res = movies.filter((m) => m.title.toLowerCase().includes(q));
    if (minRating) res = res.filter((m) => (m.rating ?? 0) >= minRating);
    if (favoritesOnly) res = res.filter((m) => favorites.includes(m.id));

    // sorting
    const sorted = [...res].sort((a, b) => {
      if (sortBy === 'title-asc') return a.title.localeCompare(b.title);
      if (sortBy === 'title-desc') return b.title.localeCompare(a.title);
      if (sortBy === 'rating-desc') return (b.rating ?? 0) - (a.rating ?? 0);
      if (sortBy === 'rating-asc') return (a.rating ?? 0) - (b.rating ?? 0);
      return 0;
    });

    return sorted;
  }, [movies, query, minRating, favoritesOnly, sortBy, favorites]);

  if (loading) return <div>Loading movies...</div>;

  return (
    <div>
      <div className="mb-3 d-flex flex-wrap align-items-center gap-2">
        <input
          type="search"
          className="form-control flex-grow-1"
          placeholder="Search movies by title..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <select className="form-select w-auto" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="title-asc">Title A → Z</option>
          <option value="title-desc">Title Z → A</option>
          <option value="rating-desc">Rating ↓</option>
          <option value="rating-asc">Rating ↑</option>
        </select>

        <select className="form-select w-auto" value={minRating} onChange={(e) => setMinRating(Number(e.target.value))}>
          <option value={0}>Any rating</option>
          <option value={1}>1+</option>
          <option value={2}>2+</option>
          <option value={3}>3+</option>
          <option value={4}>4+</option>
          <option value={5}>5</option>
        </select>

        <div className="form-check form-switch ms-2">
          <input className="form-check-input" type="checkbox" id="favOnly" checked={favoritesOnly} onChange={(e) => setFavoritesOnly(e.target.checked)} />
          <label className="form-check-label" htmlFor="favOnly">Favorites only</label>
        </div>

        <button className="btn btn-outline-secondary" onClick={() => { setQuery(''); setMinRating(0); setSortBy('title-asc'); setFavoritesOnly(false); }}>Reset</button>
      </div>

      {filtered.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <div className="row g-3">
          {filtered.map((movie) => (
            <div key={movie.id} className="col-12 col-sm-6 col-md-4">
              <MovieCard movie={movie} onClick={() => navigate(`/movies/${movie.id}`)} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MovieList;
