import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import ThemeProvider from './context/ThemeContext/ThemeProvider';
import { PAGES } from './constants/pages';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import Details from './pages/Details';
import ErrorBoundary from './components/ErrorBoundary';
import NotFoundPage from './pages/NotFoundPage';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}
createRoot(container).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path={PAGES.HOME}
              element={
                <ErrorBoundary>
                  <Layout />
                </ErrorBoundary>
              }
            >
              <Route index element={<HomePage />} />
              <Route path={PAGES.ABOUT} element={<AboutPage />} />
              <Route path={PAGES.DETAILS} element={<HomePage />}>
                <Route index element={<Details />} />
              </Route>
              <Route path={PAGES.NOTFOUND} element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
