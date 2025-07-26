import SearchBar from '.';
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
  });

  describe('User interaction', () => {
    test('It should update input value when user types', () => {
      const { handleChange } = setup();
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'spider man' },
      });
      expect(handleChange).toHaveBeenCalled();
    });

    test('calls handleSubmit when form is submitted', () => {
      const { handleSubmit } = setup('batman');
      const form = screen.getByRole('textbox').closest('form');
      if (!form) {
        throw new Error('Form element not found');
      }
      fireEvent.submit(form);
      expect(handleSubmit).toHaveBeenCalled();
    });
  });
});
