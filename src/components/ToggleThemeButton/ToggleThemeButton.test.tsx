import { render, screen, fireEvent } from '@testing-library/react';
import ToggleThemeButton from './ToggleThemeButton';
import { useTheme } from '../../context/ThemeContext/ThemeContext';

jest.mock('../../context/ThemeContext/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('ToggleThemeButton', () => {
  const mockToggleTheme = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders Sun icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleThemeButton />);
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('sun')
    );
  });

  it('renders Moon icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleThemeButton />);
    expect(screen.getByRole('button')).toContainElement(
      screen.getByTestId('moon')
    );
  });

  it('calls toggleTheme when button is clicked', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      toggleTheme: mockToggleTheme,
    });

    render(<ToggleThemeButton />);
    fireEvent.click(screen.getByRole('button'));
    expect(mockToggleTheme).toHaveBeenCalled();
  });
});
