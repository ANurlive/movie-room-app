import '@testing-library/jest-dom';
import SearchBar from './SearchBar';
import { fireEvent, render, screen } from '@testing-library/react';

const setup = (inputValue = '') => {
  const handleChange = jest.fn();
  const handleSubmit = jest.fn();

  render(
    <SearchBar
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      inputValue={inputValue}
    />
  );

  return { handleChange, handleSubmit };
};

describe('SearchBar component', () => {
  describe('Rendering', () => {
    test('It should render search input and search button', () => {
      setup();
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(
        screen.getByRole('button', { name: /search/i })
      ).toBeInTheDocument();
    });

    test('It should display previously saved search term from localStorage on mount', () => {
      setup('batman');
      expect(screen.getByRole('textbox')).toHaveValue('batman');
    });

    test('It shows empty input when no saved term exists', () => {
      setup('');
      expect(screen.getByRole('textbox')).toHaveValue('');
    });
  });

  describe('User interaction', () => {
    test('It should update input value when user types', () => {
      const { handleChange } = setup();
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'spider man' },
      });
      expect(handleChange).toHaveBeenCalled();
    });
  });
});
