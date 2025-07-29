import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import movieService from './services/movieAPIs';
import Details from './pages/Details';
import routeLoadersLogic from './helpers/routeLoadersLogic';

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
        shouldRevalidate: routeLoadersLogic.revalidate,
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
        shouldRevalidate: routeLoadersLogic.revalidate,
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
