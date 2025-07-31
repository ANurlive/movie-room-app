import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout';
import ErrorBoundary from './components/ErrorBoundary';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import NotFoundPage from './pages/NotFoundPage';
import Details from './pages/Details';
import routeLoadersLogic from './helpers/routeLoadersLogic';
import { PAGES } from './constants/pages';
import homePageLoader from './loaders/homePageLoader';
import detailsLoader from './loaders/detailsLoader';

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
        shouldRevalidate: routeLoadersLogic.revalidate,
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
      {
        path: PAGES.NOTFOUND,
        Component: NotFoundPage,
      },
    ],
  },
]);

export default router;
