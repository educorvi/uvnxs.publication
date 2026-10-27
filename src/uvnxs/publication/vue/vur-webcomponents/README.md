# vur-webcomponents

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
yarn
```

### Compile and Hot-Reload for Development

```sh
yarn dev
```

### Type-Check, Compile and Minify for Production

```sh
yarn build
```

### Lint with [ESLint](https://eslint.org/)

```sh
yarn lint
```

## Search results custom element

Pass the search documents as a JSON array using `search-results` (or assign the
JSON string to the element's `searchResults` property):

```html
<search-results
  search-results='[{"article_id":"2","title":"Example","url":"/document","pub_date":"2024-06-01"}]'
></search-results>
```

The component renders counts, sorting, German publication dates, and expandable
highlighted excerpts. Documents use the existing search response fields:
`article_id`, `title`, `url`, `pub_date`, `pub_date_updated`, `rubrik`,
`fachbereich`, `sachgebiet`, and `matches` (`snippet`, `start`, `end`).

External filter controls can assign arrays to the element's `rubriken`,
`fachbereiche`, and `sachgebiete` properties. Empty arrays disable that filter;
selections within a filter are combined with OR, and filters are combined with
AND. Replace a selection array when it changes. The component does not initialize
multiselects or manage dependencies between filter options.

```js
const results = document.querySelector('search-results')
results.searchResults = JSON.stringify(documents)
results.fachbereiche = ['Example']
```

The search and folder filter templates load the built `search-results.js` module
through the `uvnxs.publication.webcomponents` resource directory. Run `yarn build`
after component changes. Connecting the external multiselect controls is a
separate integration step.

Filter markup is rendered inside the component. Supply option lists using the
JSON attributes `fachbereiche-options` (string array), `sachgebiete-options`
(array of objects with `name` and `fachbereiche`), and optionally `rubriken-options`
(string array). Omitting `rubriken-options` hides the Rubrik filter. Set
`filter-heading` to customize the heading. Multiselect interaction remains the
responsibility of the separate filter control implementation.

## Storybook

Use Node 22.18+ or 24.12+ and the configured Yarn version:

```sh
yarn install
yarn storybook
```

Open http://localhost:6006. The **VUR / Search results** stories use the supplied
Taucherarbeiten documents and filter options, with controls for the JSON
attributes and filter selections. The fixture retains all ten documents and their original excerpts in `src/stories/search-results.json`.
Default, empty, prefiltered, and optional Rubrik filter states are included.

Vue stories render the source components directly, so edits to `.vue` templates,
scripts, and styles use Vue HMR. The preview imports `../../static/css/common.css`
directly (relative to this package); CSS changes update without a library build
or a running Plone backend. A `.vur` wrapper and minimal theme utilities provide
the page context normally supplied by Plone.

The **Custom Element** story checks the actual `<search-results>` registration
and props. Changes to its entry or component dependencies reload the preview,
because the browser cannot replace a registered custom element constructor.
Use the default Vue stories for state-preserving HMR.

```sh
yarn build-storybook
```

This generates a standalone preview in `storybook-static/`. Storybook uses an
isolated Vite configuration to avoid the library build's production-only defines
and Vue DevTools plugin. The production library still builds with `yarn build`.

### Component styles

Search result item styles live in scoped CSS in `SearchResult.vue`, and filter
panel and responsive grid styles live in `SearchFilters.vue`. They use the
shared DGUV CSS variables with local fallbacks. The filter grid automatically
matches the number of available filters.

`yarn build` emits `dist/search-results.css` alongside the JavaScript library.
Both Plone templates load that stylesheet from the webcomponents resource
directory, since the custom element renders in light DOM. Storybook loads the
component styles directly through Vue and only imports page-level `common.css`.

Storybook loads the DGUV package's `main-scoped.scss` and
`bootstrap-bridge.scss` together in `.storybook/dguv.scss`, inside a
`.nexus` preview wrapper. This supplies the package fonts, design tokens,
buttons, forms, and multiselect styles. Sass is a development dependency;
package styling is restricted to the preview.
