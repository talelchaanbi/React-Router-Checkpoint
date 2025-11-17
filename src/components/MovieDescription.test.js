import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { MoviesProvider } from '../context/MoviesContext';
import MovieDescription from './MovieDescription';

const sampleMovies = [
  {
    id: 1,
    title: 'Test Movie One',
    description: 'Test description',
    posterUrl: '',
    rate: 9,
    trailer: 'https://www.youtube.com/embed/test',
  },
];

describe('MovieDescription', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => sampleMovies,
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders movie details for a valid id', async () => {
    render(
      <MemoryRouter initialEntries={["/movies/1"]}>
        <MoviesProvider>
          <Routes>
            <Route path="/movies/:id" element={<MovieDescription />} />
          </Routes>
        </MoviesProvider>
      </MemoryRouter>
    );

    const title = await screen.findByRole('heading', { name: /Test Movie One/i });
    expect(title).toBeInTheDocument();
    expect(screen.getByText(/Test description/i)).toBeInTheDocument();
  });
});
