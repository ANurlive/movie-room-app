import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import ErrorBoundary from '.';
import { ERROR_BOUNDARY_MESSAGES } from './messages';
import { ApiError } from '../../helpers/handleAPIErrors';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useRouteError: jest.fn(),
  isRouteErrorResponse: jest.fn(),
  useNavigate: jest.fn(),
}));

const mockedUseRouteError = jest.requireMock('react-router-dom')
  .useRouteError as jest.Mock;
const mockedIsRouteErrorResponse = jest.requireMock('react-router-dom')
  .isRouteErrorResponse as jest.Mock;

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ErrorMessage with status if error is a route error', () => {
    mockedUseRouteError.mockReturnValue({ status: 404 });
    mockedIsRouteErrorResponse.mockReturnValue(true);

    render(<ErrorBoundary />, { wrapper: MemoryRouter });

    expect(screen.getByText(/404/i)).toBeInTheDocument();
  });

  it('renders ErrorMessage if error is an instance of ApiError', () => {
    const apiError = new ApiError(500, 'Some API error');
    mockedUseRouteError.mockReturnValue(apiError);
    mockedIsRouteErrorResponse.mockReturnValue(false);

    render(<ErrorBoundary />, { wrapper: MemoryRouter });

    expect(screen.getByText(/500/i)).toBeInTheDocument();
  });

  it('renders fallback UI for unknown error and navigates to home on button click', () => {
    mockedUseRouteError.mockReturnValue(new Error('Unknown error'));
    mockedIsRouteErrorResponse.mockReturnValue(false);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    render(<ErrorBoundary />, { wrapper: MemoryRouter });

    expect(
      screen.getByText(ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE)
    ).toBeInTheDocument();

    const button = screen.getByRole('button', {
      name: ERROR_BOUNDARY_MESSAGES.BUTTON,
    });
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith('/');
  });
});
