import { render, screen } from '@testing-library/react';
import type { MovieItem } from '../../types/types';
import MovieCard from '.';
import { IMAGE_BASE_URL } from './MovieCard';

const mockMovie: Omit<MovieItem, 'id'> = {
  posterPath: '/test.jpg',
  title: 'Test movie',
  overview: 'This is a test movie overview',
  releaseDate: '2025-07-19',
};

describe('MovieCard component', () => {
  beforeEach(() => {
    render(<MovieCard {...mockMovie} />);
  });

  test('renders the movie image with correct src and alt', () => {
    const image = screen.getByRole('img', { name: /test movie movie image/i });
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      `${IMAGE_BASE_URL}${mockMovie.posterPath}`
    );
    expect(image).toHaveAttribute('alt', `${mockMovie.title} movie image`);
  });

  test('renders the movie title', () => {
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
  });

  test('renders the movie overview', () => {
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
  });

  test('renders the movie release date', () => {
    expect(screen.getByText(mockMovie.releaseDate)).toBeInTheDocument();
  });
});
