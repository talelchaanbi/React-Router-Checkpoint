import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../context/MoviesContext';

function MovieDescription() {
  const { id } = useParams();
  const { movies, loading } = useMovies();
  const navigate = useNavigate();
  const movie = movies.find((m) => m.id === id);

  if (loading) {
    return <div>Loading movie details...</div>;
  }

  if (!movie) {
    return (
      <div>
        <h2>Movie Not Found</h2>
        <button className="btn btn-secondary mt-3" onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="row">
      <div className="col-md-5">
        <img src={movie.posterURL} alt={movie.title} className="img-fluid rounded detail-poster" />
      </div>
      <div className="col-md-7">
        <h2>{movie.title}</h2>
        <p>{movie.description}</p>
        <p className="movie-rating">Rating: ⭐ {movie.rating}</p>

        <div className="trailer-container mb-3">
          <iframe
            title={`${movie.title} trailer`}
            src={movie.trailer}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        <button className="btn btn-secondary" onClick={() => navigate('/')}>
          Back
        </button>
      </div>
    </div>
  );
}

export default MovieDescription;
