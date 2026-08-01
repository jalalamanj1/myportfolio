import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig} from 'vite';
import viteJavascriptObfuscator from 'vite-plugin-javascript-obfuscator';

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      tailwindcss(),
      // Production-only obfuscation. `apply: 'build'` keeps the dev server untouched.
      viteJavascriptObfuscator({
        apply: 'build',
        options: {
          compact: true,
          controlFlowFlattening: false,
          deadCodeInjection: false,
          identifierNamesGenerator: 'hexadecimal',
          log: false,
          renameGlobals: false,
          selfDefending: false,
          simplify: true,
          stringArray: true,
          stringArrayEncoding: ['base64'],
          stringArrayThreshold: 0.2,
          transformObjectKeys: false,
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      // Explicitly minify JS and CSS in production (esbuild is Vite's default).
      minify: 'esbuild' as const,
      cssMinify: 'esbuild' as const,
      // No source maps shipped to visitors.
      sourcemap: false,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
