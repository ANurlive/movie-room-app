import { render, screen } from '@testing-library/react';
import Layout from './Layout';
import { LAYOUT_TEXT } from './messages';

describe('Layout component test', () => {
  const children = <button>test</button>;

  beforeEach(() => {
    render(<Layout>{children}</Layout>);
  });

  test('renders header with correct title', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(LAYOUT_TEXT.TITLE);
  });

  test('renders footer with correct text', () => {
    expect(screen.getByText(LAYOUT_TEXT.FOOTER)).toBeInTheDocument();
  });

  test('renders its children inside <main>', () => {
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });
});
