import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import BrokenComponent from '../BrokenComponent/BrokenComponent';
import { ERROR_BOUNDARY_MESSAGES } from './messages';

const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});
afterAll(() => {
  console.error = originalError;
});
afterEach(() => {
  jest.clearAllMocks();
});

describe('ErrorBoundary component', () => {
  const setup = (children: React.ReactNode, fallback?: React.ReactNode) => {
    return render(
      <ErrorBoundary fallback={fallback}>{children}</ErrorBoundary>
    );
  };

  test('It catches and handles JavaScript errors in child components', () => {
    setup(<BrokenComponent errorMessage="test error" />);
    expect(
      screen.getByText(ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE)
    ).toBeInTheDocument();
    expect(console.error).toHaveBeenCalled();
  });

  test('It should render fallback UI and button', () => {
    const fallback = <p>Oops!</p>;
    setup(<BrokenComponent errorMessage="test error" />, fallback);
    expect(screen.getByText('Oops!')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });
});
