import { render, screen } from '@testing-library/react';
import type { MovieItem } from '../../types/types';
import MovieList from '.';

jest.mock('../MovieCard/MovieCard', () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="movie-card"></div>),
}));

const mockList: MovieItem[] = [
  {
    id: 1,
    title: 'movie 1',
    overview: 'overview 1',
    releaseDate: '2025-07-19',
    posterPath: '/poster1.jpg',
  },
  {
    id: 2,
    title: 'movie 2',
    overview: 'overview 2',
    releaseDate: '2025-07-20',
    posterPath: '/poster2.jpg',
  },
];

describe('MovieList component', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders EmptySearchResult when movieList is empty', () => {
    render(<MovieList movieList={[]} />);
    expect(screen.getByTestId('empty-search-result')).toBeInTheDocument();
  });

  test('renders a list of MovieCard component', () => {
    render(<MovieList movieList={mockList} />);
    const movieCards = screen.getAllByTestId('movie-card');
    expect(movieCards).toHaveLength(mockList.length);
  });
});
