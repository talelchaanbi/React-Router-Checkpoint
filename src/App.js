import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import NotFound from './components/NotFound';
import { MoviesProvider } from './context/MoviesContext';
import { FavoritesProvider } from './context/FavoritesContext';

const MovieDescription = lazy(() => import('./components/MovieDescription'));

function App() {
  return (
    <MoviesProvider>
      <FavoritesProvider>
        <div className="container app-container d-flex flex-column min-vh-100">
          <Navbar />

          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<MovieList />} />
              <Route
                path="/movies/:id"
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MovieDescription />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>

          <Footer />
        </div>
      </FavoritesProvider>
    </MoviesProvider>
  );
}

export default App;
