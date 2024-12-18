/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_AI_PROVIDER: string
  readonly VITE_NORMAL_MODEL: string
  readonly VITE_LARGE_MODEL: string
  readonly VITE_OPENAI_API_KEY: string
  readonly VITE_ANTHROPIC_API_KEY: string
  readonly VITE_HEURISTIC_API_KEY: string
  readonly VITE_GALADRIEL_API_KEY: string
  readonly VITE_OLLAMA_HOST: string
  readonly VITE_TERMINAL_HISTORY_SIZE: string
  readonly VITE_TERMINAL_MAX_OUTPUT: string
  readonly VITE_RATE_LIMIT_MAX_REQUESTS: string
  readonly VITE_RATE_LIMIT_WINDOW_MS: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}