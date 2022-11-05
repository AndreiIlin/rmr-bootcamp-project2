import '@ui-library/scss/index.scss';

import { createRoot } from 'react-dom/client';

import { App } from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);

console.log(import.meta.env);

if (import.meta.env.DEV && import.meta.env.VITE_ENABLE_API_MOCKING === 'true') {
  import('@infrastructure/mock-service-worker/browser')
    .then(({ worker }) => {
      worker.start();
    })
    .then(() => {
      root.render(<App />);
    });
} else {
  root.render(<App />);
}
