import { render, screen } from '@testing-library/react';
import { RouterProvider, createMemoryRouter } from 'react-router-dom';
import { PAGES } from '../constants/pages';
import router from './router';

describe('router', () => {
  it('renders HomePage on default route', async () => {
    const testRouter = createMemoryRouter(router.routes, {
      initialEntries: [PAGES.HOME],
    });

    render(<RouterProvider router={testRouter} />);

    expect(await screen.findByRole('textbox')).toBeInTheDocument();

    it('renders AboutPage on /about route', async () => {
      const testRouter = createMemoryRouter(router.routes, {
        initialEntries: [PAGES.ABOUT],
      });

      render(<RouterProvider router={testRouter} />);

      expect(await screen.findByText(/rsschool/i)).toBeInTheDocument();
    });

    it('renders NotFoundPage on /not-found route', async () => {
      const testRouter = createMemoryRouter(router.routes, {
        initialEntries: [PAGES.NOTFOUND],
      });

      render(<RouterProvider router={testRouter} />);

      expect(await screen.findByText(/404/i)).toBeInTheDocument();
    });
  });
});
