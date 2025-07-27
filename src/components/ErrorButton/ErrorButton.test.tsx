import { render, screen } from '@testing-library/react';
import ErrorButton from './ErrorButton';
import { ERROR_BUTTON_MESSAGES } from './messages';

describe('ErrorButton', () => {
  it('renders the button with correct text', () => {
    render(<ErrorButton />);
    expect(
      screen.getByRole('button', {
        name: ERROR_BUTTON_MESSAGES.BUTTON_NAME,
      })
    ).toBeInTheDocument();
  });
});
