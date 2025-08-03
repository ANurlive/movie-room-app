import { fireEvent, render, screen } from '@testing-library/react';
import type { MovieItem } from '../../types/types';
import MovieCard from '.';
import { IMAGE_BASE_URL } from './MovieCard';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { messages } from './messages';
import { toggleCard } from '../../store/selectedCards/reducer';

const mockMovie: MovieItem = {
  id: 123,
  posterPath: '/test.jpg',
  title: 'Test movie',
  overview: 'This is a test movie overview',
  releaseDate: '2025-07-19',
};

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(),
}));

describe('MovieCard', () => {
  const mockDispatch = jest.fn();
  const mockNavigate = jest.fn();
  const mockSetParams = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    (useSelector as unknown as jest.Mock).mockReturnValue(false);
    (useNavigate as unknown as jest.Mock).mockReturnValue(mockNavigate);
    (useSearchParams as unknown as jest.Mock).mockReturnValue([
      new URLSearchParams('page=2'),
      mockSetParams,
    ]);

    render(<MovieCard movie={mockMovie} />);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the movie information', () => {
    expect(screen.getByText(mockMovie.title)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.releaseDate)).toBeInTheDocument();

    const img = screen.getByRole('img') as HTMLImageElement;
    expect(img.src).toContain(`${IMAGE_BASE_URL}${mockMovie.posterPath}`);
    expect(img.alt).toBe(`${mockMovie.title} movie image`);
  });

  it('dispatches toggleCard on card click', () => {
    fireEvent.click(screen.getByTestId('movie-card'));
    expect(mockDispatch).toHaveBeenCalledWith(toggleCard(mockMovie));
  });

  it('navigates with params when Show More is clicked', () => {
    fireEvent.click(screen.getByText(messages.SHOW_MORE_BUTTON));
    expect(mockNavigate).toHaveBeenCalledWith(`/${mockMovie.id}?page=2`);
  });
});
