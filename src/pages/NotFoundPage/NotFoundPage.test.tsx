import { render, screen } from '@testing-library/react';
import NotFoundPage from '../NotFoundPage';

describe('NotFoundPage', () => {
  test('renders ErrorMessage component', () => {
    render(<NotFoundPage />);
    const message = screen.getByText('404');
    expect(message).toBeInTheDocument();
  });
});
