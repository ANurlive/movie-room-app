import { render, screen } from '@testing-library/react';
import Layout from '.';
import { LAYOUT_TEXT } from './messages';

describe('Layout component test', () => {
  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    Outlet: () => <button>test</button>,
  }));

  beforeEach(() => {
    render(<Layout />);
  });

  it('renders header with correct title', () => {
    const title = screen.getByRole('heading', { level: 1 });
    expect(title).toBeInTheDocument();
    expect(title).toHaveTextContent(LAYOUT_TEXT.TITLE);
  });

  it('renders footer with correct text', () => {
    expect(screen.getByText(LAYOUT_TEXT.FOOTER)).toBeInTheDocument();
  });

  it('renders routed content using Outlet', () => {
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });
});
