/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GALADRIEL_API_KEY: string
  readonly VITE_RATE_LIMIT_MAX_REQUESTS: string
  readonly VITE_RATE_LIMIT_WINDOW_MS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.pdf' {
  const value: string;
  export default value;
}

declare module '*?url' {
  const value: string;
  export default value;
}