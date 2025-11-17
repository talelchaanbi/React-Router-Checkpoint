# React Router Movie App

This is a simple React application that demonstrates React Router v6 usage and dynamic routes to show a movie list and movie description pages.

Features:
- Movie list page that shows movie cards, with a simple search/filter input
- Each movie includes: title, description, posterURL (normalized), rating, and trailer (YouTube embed link)
- Click a movie card to navigate to a dynamic route `/movies/:id`
- Description page shows the full details and embedded trailer
- Back button to navigate to the home page
- Detailed 404 page
- Navbar and footer across the site
- Dynamic movie data loading from `public/movies.json` (with fallback to `src/data/movies.js`)
  - Note: The app normalizes movie objects so both `rate`/`rating` and `posterUrl`/`posterURL` are supported. `id` values are stringified.
- Route-based code splitting for the description page (React.lazy + Suspense)
- Sorting (title/rating), rating filter, and a favorites system (persisted to localStorage). Use the heart button on a movie card to mark favorites and toggle "Favorites only" to see them.
- Tests: MovieList, MovieDescription, and integration test for navigation
- Uses React Router v6 (BrowserRouter, Routes, Route, useParams, useNavigate)
- Components: MovieList, MovieCard, MovieDescription
- Uses Bootstrap for basic styling

## How to run

1. Install dependencies:

   ```bash
   npm install
   ```

2. Start the development server:

   ```bash
   npm start
   ```

   Open http://localhost:3000 in your browser.

3. Run tests:

   ```bash
   CI=true npm test -- --watchAll=false
   ```

## Notes

- The app uses a static `src/data/movies.js` file for fallback movie data. You can add more movies to `public/movies.json` or update the fallback.
- Trailers use YouTube embed URLs (e.g., `https://www.youtube.com/embed/{VIDEOID}`).

Enjoy!
