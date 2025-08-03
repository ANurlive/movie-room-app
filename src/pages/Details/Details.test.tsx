import { render, screen, fireEvent } from '@testing-library/react';
import Details from '../Details';
import {
  MemoryRouter,
  useLoaderData,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import type { MovieItem } from '../../types/types';
import { PAGES } from '../../constants/pages';
import { Provider } from 'react-redux';
import store from '../../store';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useLoaderData: jest.fn(),
  useLocation: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockMovie: MovieItem = {
  id: 1,
  title: 'Test Movie',
  overview: 'Test overview',
  posterPath: '/poster.jpg',
  releaseDate: '2025-01-01',
};

describe('Details', () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useLoaderData as jest.Mock).mockReturnValue(mockMovie);
    (useLocation as jest.Mock).mockReturnValue({ search: '?query=test' });
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders content and handles close', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <Details />
        </MemoryRouter>
      </Provider>
    );
    expect(screen.getByText('Test Movie')).toBeInTheDocument();
    expect(screen.getByText('Test overview')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: /close/i }));
    expect(mockNavigate).toHaveBeenCalledWith(`${PAGES.HOME}?query=test`);
  });
});
