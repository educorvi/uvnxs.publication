import type { StorybookConfig } from '@storybook/vue3-vite'
import { fileURLToPath } from 'node:url'

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.ts'],
  addons: ['@storybook/addon-docs'],
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      builder: { viteConfigPath: fileURLToPath(new URL('./vite.config.ts', import.meta.url)) },
    },
  },
  core: { disableTelemetry: true },
  features: { experimentalDocgenServer: true },
  async viteFinal(config) {
    // Keep library build settings and production-only defines out of development.
    config.server = {
      ...config.server,
      fs: {
        ...config.server?.fs,
        allow: [
          fileURLToPath(new URL('..', import.meta.url)),
          fileURLToPath(new URL('../../../static', import.meta.url)),
        ],
      },
    }
    return config
  },
}
export default config
