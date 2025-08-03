import { render, screen } from '@testing-library/react';
import Layout from '.';
import { messages } from './messages';

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
    expect(title).toHaveTextContent(messages.TITLE);
  });

  it('renders footer with correct text', () => {
    expect(screen.getByText(messages.FOOTER)).toBeInTheDocument();
  });

  it('renders routed content using Outlet', () => {
    expect(screen.getByRole('button', { name: 'test' })).toBeInTheDocument();
  });
});
