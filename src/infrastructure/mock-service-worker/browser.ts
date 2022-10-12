// src/mocks/browser.js
import { surveyMockHandlers } from '@features/survey';
import { setupWorker, rest } from 'msw';

// This configures a Service Worker with the given request handlers.
export const worker = setupWorker(
  ...surveyMockHandlers,
  rest.get<null, { message: string }>('/ping', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json({
        message: 'Hello world!',
      }),
    );
  }),
);
