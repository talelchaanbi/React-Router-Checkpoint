import React from 'react';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const sampleMovies = [
  {
    id: 1,
    title: 'Test Movie One',
    description: 'Test description',
    posterUrl: '',
    rate: 9,
    trailer: 'https://www.youtube.com/embed/test',
  },
  {
    id: 2,
    title: 'Other Movie',
    description: 'Another description',
    posterUrl: '',
    rate: 8.2,
    trailer: 'https://www.youtube.com/embed/test2',
  },
];

describe('App navigation', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => sampleMovies,
    });
  });

  afterEach(() => {
    global.fetch.mockRestore();
  });

  test('navigates to movie description when clicking a card', async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );

    // Wait for the movie title to appear in the list
    const movieTitle = await screen.findByText(/Test Movie One/i);
    expect(movieTitle).toBeInTheDocument();

  // click view button belonging to the Test Movie One card
  const card = movieTitle.closest('.card') || movieTitle.closest('div');
  const viewButton = within(card).getByRole('button', { name: /View/i });
  await userEvent.click(viewButton);

    // after navigation, expect to find the description title
    const detailTitle = await screen.findByRole('heading', { name: /Test Movie One/i });
    expect(detailTitle).toBeInTheDocument();
  });
});
