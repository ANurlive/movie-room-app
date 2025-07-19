import { render, screen } from '@testing-library/react';
import Loader from './Loader';
import { LOADER_MESSAGES } from './messages';

describe('Loader component', () => {
  test('renders loading status', () => {
    render(<Loader />);
    expect(screen.getByText(LOADER_MESSAGES.DEFAULT)).toBeInTheDocument();
  });
});
