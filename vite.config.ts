import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
// @ts-ignore
const ignoreTypeScriptPlugin = require('./vite-ignore-typescript-plugin');

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const skipTsCheck = process.env.VITE_SKIP_TS_CHECK === 'true';
  
  const plugins = [react()];
  
  // Only add the TypeScript plugin if we're skipping type checking
  if (skipTsCheck) {
    console.log('TypeScript type checking is disabled for this build.');
    plugins.push(ignoreTypeScriptPlugin());
  }
  
  return {
    plugins,
    resolve: {
      alias: {
        '@': resolve(__dirname, './src')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json']
    },
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
      assetsDir: 'assets',
      // Disable TypeScript checking during build
      rollupOptions: {
        onwarn(warning, warn) {
          // Ignore TypeScript errors
          if (warning.code === 'TS_ERROR' || skipTsCheck) return;
          warn(warning);
        }
      }
    },
    esbuild: {
      // Skip type checking during build
      logOverride: {
        'this-is-undefined-in-esm': 'silent'
      }
    }
  };
});