import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue({
            template: {
                compilerOptions: {
                    isCustomElement: (tag: string) =>
                        tag.includes('xml-editor'),
                },
            },
        }),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
        sourcemap: true,
        lib: {
            entry: './src/main.ce.ts',
            name: 'xml-editor',
            // the proper extensions will be added
            fileName: 'xml-editor',
            formats: ['umd', 'es'],
        },
        outDir: 'dist',
    },
    define: {
        'process.env.NODE_ENV': JSON.stringify('production'),
        // "process.env.NODE_ENV": JSON.stringify("development"),
    },
    css: {
        preprocessorOptions: {
            scss: {
                quietDeps: true,
                silenceDeprecations: ['import'],
            },
        },
    },
})
