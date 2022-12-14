/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_API_MOCKING: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  msw: {
    worker: SetupWorkerApi;
    rest: any;
  };
}
