import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary.tsx';
import { ERROR_BOUNDARY_MESSAGES } from './components/ErrorBoundary/messages.ts';

const container = document.getElementById('root');
if (!container) {
  throw new Error('Root container not found');
}
createRoot(container).render(
  <StrictMode>
    <ErrorBoundary
      fallback={<p>{ERROR_BOUNDARY_MESSAGES.MESSAGE_TRY_AGAIN}</p>}
    >
      <App />
    </ErrorBoundary>
  </StrictMode>
);
