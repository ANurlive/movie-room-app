import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import * as reactRouter from 'react-router-dom';
import HomePage from '../HomePage';
import { Provider } from 'react-redux';

import store from '../../../store';
import { HOME_PAGE_MESSAGES } from '../messages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock('../useLocalStorage', () => () => ({
  inputValue: '',
  setInputValue: jest.fn(),
  saveValueToLS: jest.fn(),
}));

describe('HomePage', () => {
  beforeEach(() => {
    (reactRouter.useLoaderData as jest.Mock).mockReturnValue({
      movies: [
        {
          id: 123,
          posterPath: '/test.jpg',
          title: 'Test movie',
          overview: 'This is a test movie overview',
          releaseDate: '2025-07-19',
        },
      ],
      page: 1,
      totalPages: 1,
    });

    (reactRouter.useSearchParams as jest.Mock).mockReturnValue([
      new URLSearchParams(),
      jest.fn(),
    ]);

    Object.defineProperty(window, 'location', {
      writable: true,
      value: { pathname: '/' },
    });

    render(
      <Provider store={store}>
        <MemoryRouter>
          <HomePage />
        </MemoryRouter>
      </Provider>
    );
  });

  it('renders main components', () => {
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(
      HOME_PAGE_MESSAGES.HEADING
    );
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('movie-list')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });
});
