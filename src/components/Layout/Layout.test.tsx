import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  Outlet: () => <button>test</button>,
}));

import Layout from '.';
import { messages } from './messages';

describe('Layout component test', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <Layout />
      </MemoryRouter>
    );
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
