import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { RouterProvider } from 'react-router-dom';
import router from './router';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}
createRoot(container).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
