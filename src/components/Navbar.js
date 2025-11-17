import React from 'react';
import { Link } from 'react-router-dom';
import { useMovies } from '../context/MoviesContext';

function Navbar() {
  const { movies } = useMovies();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white mb-4 shadow-sm rounded p-3">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          <strong>MovieHub</strong>
        </Link>
        <div className="d-flex align-items-center">
          <span className="text-muted me-3">{movies.length} movies</span>
          <Link to="/" className="btn btn-outline-primary btn-sm">Home</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
