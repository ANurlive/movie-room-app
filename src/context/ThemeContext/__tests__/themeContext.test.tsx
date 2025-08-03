import { render, screen, fireEvent } from '@testing-library/react';
import { useTheme } from '../ThemeContext';
import ThemeProvider from '../ThemeProvider';

const TestComponent = () => {
  const { theme, toggleTheme } = useTheme();
  return (
    <div>
      <span data-testid="theme">{theme}</span>
      <button onClick={toggleTheme}>Toggle</button>
    </div>
  );
};

describe('ThemeContext', () => {
  it('provides default theme and toggles it', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    const span = screen.getByTestId('theme');
    const button = screen.getByText('Toggle');

    expect(span.textContent).toBe('light');

    fireEvent.click(button);
    expect(span.textContent).toBe('dark');

    fireEvent.click(button);
    expect(span.textContent).toBe('light');
  });

  it('applies theme to localStorage and document.classList', () => {
    const classListToggleSpy = jest.spyOn(
      document.documentElement.classList,
      'toggle'
    );

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    fireEvent.click(screen.getByText('Toggle'));
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(classListToggleSpy).toHaveBeenCalledWith('dark', true);
  });
});
