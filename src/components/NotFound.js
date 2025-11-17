import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="text-center py-5">
      <h1>404</h1>
      <p className="lead">We couldn't find the page you're looking for.</p>
      <p>Try checking the URL or go back to the homepage.</p>
      <Link to="/" className="btn btn-primary mt-3">Back to Home</Link>
    </div>
  );
}

export default NotFound;
