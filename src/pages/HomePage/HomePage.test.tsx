import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import HomePage from './HomePage';
import { HOME_PAGE_MESSAGES } from './messages';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: () => ({
    movies: [{ id: 1, title: 'Inception' }],
    page: 1,
    totalPages: 10,
  }),
  useNavigate: jest.fn(),
}));

jest.mock('./useLocalStorage', () => ({
  __esModule: true,
  default: () => ({
    inputValue: 'batman',
    setInputValue: jest.fn(),
    saveValueToLS: jest.fn(),
  }),
}));

describe('HomePage', () => {
  it('renders heading and SearchBar', () => {
    render(<HomePage />, { wrapper: MemoryRouter });

    expect(
      screen.getByRole('heading', { name: HOME_PAGE_MESSAGES.HEADING })
    ).toBeInTheDocument();

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls navigate with query when form is submitted', () => {
    const mockNavigate = useNavigate() as jest.Mock;
    render(<HomePage />, { wrapper: MemoryRouter });

    const form = screen.getByRole('form') || screen.getByTestId('search-form');

    fireEvent.submit(form);

    expect(mockNavigate).toHaveBeenCalledWith('/search?query=batman');
  });

  it('renders MovieList and Pagination when movies are available', () => {
    render(<HomePage />, { wrapper: MemoryRouter });

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
  });
});
