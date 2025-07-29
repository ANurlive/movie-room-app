import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import movieService from './services/movieAPIs';
import Details from './pages/Details';

const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: '',
        Component: HomePage,
        loader: movieService.searchMoviesLoader,
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          const isNavigatingToDetails = nextUrl.pathname.match(/\/\d+$/);
          const searchChanged = currentUrl.search !== nextUrl.search;

          return searchChanged && !isNavigatingToDetails;
        },
        children: [
          {
            path: ':id',
            Component: Details,
            loader: movieService.getDetailsLoader,
          },
        ],
      },
      {
        path: 'search',
        Component: HomePage,
        loader: movieService.searchMoviesLoader,
        shouldRevalidate: ({ currentUrl, nextUrl }) => {
          const isNavigatingToDetails = nextUrl.pathname.match(/\/\d+$/);
          const searchChanged = currentUrl.search !== nextUrl.search;

          return searchChanged && !isNavigatingToDetails;
        },
        children: [
          {
            path: ':id',
            Component: Details,
            loader: movieService.getDetailsLoader,
          },
        ],
      },

      {
        path: 'about',
        Component: AboutPage,
      },
      {
        path: '*',
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
