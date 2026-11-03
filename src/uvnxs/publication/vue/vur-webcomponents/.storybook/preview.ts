import { setup } from '@storybook/vue3-vite'
import type { Preview } from '@storybook/vue3-vite'
import './dguv.scss'
import '../../../static/css/common.css'
import './preview.css'

setup((app) => {
  app.config.compilerOptions.isCustomElement = (tag) => tag === 'search-results'
})

const preview: Preview = {
  decorators: [() => ({ template: '<main class="nexus vur storybook-vur"><story /></main>' })],
  parameters: { layout: 'fullscreen', controls: { expanded: true } },
}
export default preview
