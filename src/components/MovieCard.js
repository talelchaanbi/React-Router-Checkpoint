import React from 'react';
import { useFavorites } from '../context/FavoritesContext';

function MovieCard({ movie, onClick }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.includes(movie.id);

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <div
      className={`card movie-card h-100 ${isFav ? 'border-primary shadow-sm' : ''}`}
      onClick={onClick}
      onKeyDown={onKeyDown}
      role="button"
      tabIndex={0}
    >
      <div className="position-relative">
        <img src={movie.posterURL} className="card-img-top movie-poster" alt={movie.title} />
        <span className="badge bg-warning text-dark position-absolute top-0 start-0 m-2">⭐ {movie.rating}</span>
        <button
          className={`btn btn-sm favorite-btn ${isFav ? 'btn-danger' : 'btn-outline-light'}`}
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(movie.id);
          }}
          aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFav ? '♥' : '♡'}
        </button>
      </div>

      <div className="card-body d-flex flex-column">
        <h5 className="card-title">{movie.title}</h5>
        <p className="card-text text-truncate">{movie.description}</p>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <small className="text-muted">ID: {movie.id}</small>
          <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); onClick(); }}>View</button>
        </div>
      </div>
    </div>
  );
}

export default MovieCard;
