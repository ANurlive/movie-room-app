import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '.';
import { ERROR_BOUNDARY_MESSAGES } from './messages';
import { ApiError } from '../../helpers/handleAPIErrors';

jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    __esModule: true,
    ...actual,
    useRouteError: jest.fn(),
    isRouteErrorResponse: jest.fn(),
    useNavigate: jest.fn(),
  };
});

import { useRouteError, useNavigate } from 'react-router-dom';

describe('ErrorBoundary', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders ErrorMessage if error is an instance of ApiError', () => {
    const apiError = new ApiError(500, 'Some API error');
    (useRouteError as jest.Mock).mockReturnValue(apiError);
    render(<ErrorBoundary />);

    expect(screen.getByText(/500/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Server error. Please try again later./i)
    ).toBeInTheDocument();
  });

  it('renders fallback UI for unknown error and navigates to home on button click', () => {
    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    (useRouteError as jest.Mock).mockReturnValue(new Error('Unknown error'));

    render(<ErrorBoundary />);

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
