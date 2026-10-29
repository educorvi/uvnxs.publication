import type { Meta, StoryObj } from '@storybook/vue3-vite'
import SearchResults from './SearchResults.ce.vue'
import documents from '../stories/search-results.json'
import { fachbereicheOptions, sachgebieteOptions, rubrikenOptions } from '../stories/search-options'

const meta = {
  title: 'VUR/Search results',
  component: SearchResults,
  tags: ['autodocs'],
  args: {
    searchResults: JSON.stringify(documents),
    filterHeading: 'Dokumente filtern',
    hideRelevance: false,
    fachbereicheOptions: JSON.stringify(fachbereicheOptions),
    sachgebieteOptions: JSON.stringify(sachgebieteOptions),
    rubrikenOptions: JSON.stringify(rubrikenOptions),
    rubriken: [],
    fachbereiche: [],
    sachgebiete: [],
  },
  argTypes: {
    searchResults: { control: 'text' },
    filterHeading: { control: 'text' },
    hideRelevance: { control: 'boolean' },
    fachbereicheOptions: { control: 'text' },
    sachgebieteOptions: { control: 'text' },
    rubrikenOptions: { control: 'text' },
    rubriken: { control: 'object' },
    fachbereiche: { control: 'object' },
    sachgebiete: { control: 'object' },
  },
  // A fresh mount keeps the imperative multiselect controls in sync with args.
  render: (args) => ({
    components: { SearchResults },
    setup: () => ({ args, storyKey: () => JSON.stringify(args) }),
    template: '<SearchResults :key="storyKey()" v-bind="args" />',
  }),
} satisfies Meta<typeof SearchResults>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const FolderView: Story = {
  args: { hideRelevance: true, rubrikenOptions: undefined },
}
export const Empty: Story = { args: { searchResults: '[]' } }
export const Bauwesen: Story = { args: { fachbereiche: ['Bauwesen'] } }
export const WithoutRubrikFilter: Story = { args: { rubrikenOptions: undefined } }
export const CustomElement: Story = {
  tags: ['!autodocs'],
  render: (args) => ({
    setup: () => ({ args, storyKey: () => JSON.stringify(args) }),
    template: '<search-results :key="storyKey()" v-bind="args" />',
  }),
  beforeEach: async () => {
    await import('../main.ce')
  },
}
