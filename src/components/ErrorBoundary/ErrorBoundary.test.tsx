import { render, screen } from '@testing-library/react';
import ErrorBoundary from '.';
import { ERROR_BOUNDARY_MESSAGES } from './messages';
import ErrorButton from '../ErrorButton';
import userEvent from '@testing-library/user-event';

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

  test('It catches and handles JavaScript errors in child components', async () => {
    setup(<ErrorButton />);

    const button = screen.getByRole('button', { name: /error/i });
    await userEvent.click(button);

    expect(
      screen.getByText(ERROR_BOUNDARY_MESSAGES.DEFAULT_ERROR_MESSAGE)
    ).toBeInTheDocument();

    expect(console.error).toHaveBeenCalled();
  });

  test('It should render fallback UI and button', async () => {
    const fallback = <p>Oops!</p>;
    setup(<ErrorButton />, fallback);

    const button = screen.getByRole('button', { name: /error/i });
    await userEvent.click(button);

    expect(screen.getByText('Oops!')).toBeInTheDocument();
  });
});
