import {fileURLToPath, URL} from 'node:url'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import {resolve} from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag: string) =>
            tag.includes('search-results'),
        },
      },
    }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@untrouble/dguv-vanilla-sass/src/ui-helper-js/multi-select': resolve(import.meta.dirname, 'node_modules/@untrouble/dguv-vanilla-sass/src/ui-helper-js/multi-select.js'),
    },
  },
  build: {
    sourcemap: true,
    lib: {
      entry: './src/main.ce.ts',
      name: 'search-results',
      // the proper extensions will be added
      fileName: 'search-results',
      cssFileName: 'search-results',
      formats: ['umd', 'es'],
    },
    outDir: 'dist',
  },
  define: {
    'process.env.NODE_ENV': JSON.stringify('production'),
    // "process.env.NODE_ENV": JSON.stringify("development"),
  },
})

