import { render, screen } from '@testing-library/react';
import AboutPage from '../AboutPage';
import { RS_LINK } from '../../constants/links';
import { messages } from './messages';

describe('AboutPage', () => {
  it('renders author text and link with correct href and text', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      messages.AUTHOR_TEXT
    );

    const link = screen.getByRole('link', { name: messages.LINK_TEXT });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', RS_LINK);
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noreferrer');
  });
});
