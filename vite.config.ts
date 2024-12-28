import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      }
    },
    appType: 'spa',
    server: {
      host: true,
      strictPort: true,
      port: 5173,
      hmr: {
        port: 5173
      }
    },
    build: {
      outDir: 'dist',
      target: 'esnext',
      sourcemap: true,
      emptyOutDir: true,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        output: {
          manualChunks: {
            'ai-providers': [
              './src/services/ai/providers/openai.ts',
              './src/services/ai/providers/anthropic.ts',
              './src/services/ai/providers/heuristic.ts',
              './src/services/ai/providers/galadriel.ts',
              './src/services/ai/providers/ollama.ts'
            ]
          }
        }
      }
    }
  };
});