import { createBrowserRouter } from 'react-router-dom';
import { PAGES } from './constants/pages';
import ErrorBoundary from './components/ErrorBoundary';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import homePageLoader from './loaders/homePageLoader';
import Details from './pages/Details';
import detailsLoader from './loaders/detailsLoader';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';

const router = createBrowserRouter([
  {
    path: PAGES.HOME,
    Component: Layout,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        path: PAGES.HOME,
        Component: HomePage,
        loader: homePageLoader,
        children: [
          {
            path: PAGES.DETAILS,
            Component: Details,
            loader: detailsLoader,
          },
        ],
      },
      {
        path: PAGES.ABOUT,
        Component: AboutPage,
      },
    ],
  },
  {
    path: PAGES.NOTFOUND,
    Component: NotFoundPage,
  },
]);

export default router;
