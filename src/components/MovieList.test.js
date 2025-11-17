import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import MovieList from './MovieList';
import { MoviesProvider } from '../context/MoviesContext';

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

describe('MovieList', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({ ok: true, json: async () => sampleMovies });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('renders movie cards', async () => {
    render(
      <MemoryRouter>
        <MoviesProvider>
          <MovieList />
        </MoviesProvider>
      </MemoryRouter>
    );

    const movieTitles = await screen.findAllByRole('heading', { level: 5 });
    expect(movieTitles.length).toBeGreaterThan(0);
  });
});
