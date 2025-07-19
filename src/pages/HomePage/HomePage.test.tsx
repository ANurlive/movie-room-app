import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import movieService from '../../services/movieAPIs';
import type { MovieItem } from '../../types';
import HomePage from './HomePage';
import { LS_KEYS } from '../../constants';
import { DEFAULT_ERROR_MESSAGE } from '../../components/ErrorMessage/messages';

jest.mock('../../services/movieAPIs');

const mockList: MovieItem[] = [
  {
    id: 1,
    title: 'The happiness',
    overview: 'The happiness overview',
    releaseDate: '2025-07-19',
    posterPath: '/poster.jpg',
  },
];

describe('HomePage component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders movie list on successful fetch with empty input', async () => {
    (movieService.getMoviesList as jest.Mock).mockResolvedValue(mockList);

    render(<HomePage />);

    expect(screen.getByRole('textbox')).toHaveValue('');

    expect(screen.getByTestId('loader')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('The happiness')).toBeInTheDocument();
    });
  });

  test('performs search and updates localStorage', async () => {
    (movieService.searchMovie as jest.Mock).mockResolvedValue(mockList);

    render(<HomePage />);

    const input = screen.getByRole('textbox');
    const form = input.closest('form');

    if (!form) {
      throw new Error('Form element not found');
    }
    const rawInput = '      The happiness    ';
    fireEvent.change(input, {
      target: { value: rawInput }, //to test trim()
    });

    await waitFor(() => {
      expect(input).toHaveValue(rawInput);
    });

    fireEvent.submit(form);

    await waitFor(() => {
      expect(movieService.searchMovie).toHaveBeenCalledWith('The happiness');
      expect(screen.getByText('The happiness')).toBeInTheDocument();
      expect(localStorage.getItem(LS_KEYS.INPUT_VALUE)).toBe('The happiness');
    });
  });

  test('renders error message on API error', async () => {
    const error = new Error('Server down');
    (movieService.getMoviesList as jest.Mock).mockRejectedValue(error);

    render(<HomePage />);

    await waitFor(() => {
      expect(screen.getByText(DEFAULT_ERROR_MESSAGE)).toBeInTheDocument();
    });
  });
});
