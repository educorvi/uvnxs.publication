# vur-webcomponents

Vue 3 and TypeScript web components for the VUR publication frontend in
`uvnxs.publication`. Vite builds the components into browser assets served by
Plone. Storybook provides a preview without a running backend.

The package currently registers `<search-results>`, which displays documents,
multiselect filters, result counts, sorting, German publication dates, and
expandable excerpts with highlighted matches. Filtering and sorting run locally
on the supplied documents; the component does not fetch search results.

## Setup

Use Node.js `^22.18.0` or `>=24.12.0` and Yarn **4.18.1**, as specified in
[package.json](package.json). Run commands from this directory:

```sh
yarn install
yarn storybook
```

Open <http://localhost:6006> and select **VUR / Search results**.

## Using the custom element

Load the built stylesheet and ES module once per page. Importing the module
registers the custom element; no Vue application setup is needed on the host page.

```html
<link rel="stylesheet" href="/++resource++uvnxs.publication.webcomponents/search-results.css">
<script type="module" src="/++resource++uvnxs.publication.webcomponents/search-results.js"></script>

<search-results
  filter-heading="Dokumente filtern"
  search-results='[{"uid":"example-document","score":1,"article_id":"201-025","title":"Taucher-Dienstbuch","url":"/document","pub_date":"2018-10-01","fachbereich":"Bauwesen","sachgebiet":"Tiefbau"}]'
  fachbereiche-options='["Bauwesen"]'
  sachgebiete-options='[{"name":"Tiefbau","fachbereiche":["Bauwesen"]}]'
></search-results>
```

Adjust resource URLs to include the Plone site path when necessary. The component
renders in light DOM (`shadowRoot: false`), so host-page styles apply. The host
page must supply the shared VUR/DGUV theme and utility styles in addition to the
component stylesheet.

### Attributes and properties

JSON inputs remain JSON strings when assigned as JavaScript properties.
Selection properties accept JavaScript arrays.

| HTML attribute | JavaScript property | Value / default |
| --- | --- | --- |
| `search-results` | `searchResults` | JSON document array; `'[]'` |
| `filter-heading` | `filterHeading` | Heading text; `'Dokumente filtern'` |
| `rubriken-options` | `rubrikenOptions` | JSON string array; omitted hides the Rubrik filter |
| `fachbereiche-options` | `fachbereicheOptions` | JSON string array; `'[]'` |
| `sachgebiete-options` | `sachgebieteOptions` | JSON array of objects with `name`; `'[]'` |
| — | `rubriken` | Selected Rubrik values; `[]` |
| — | `fachbereiche` | Selected Fachbereich values; `[]` |
| — | `sachgebiete` | Selected Sachgebiet values; `[]` |

Sachgebiet option objects may also include `fachbereiche`, matching the backend
response. The component currently uses only `name`; it does not restrict options
based on the selected Fachbereich.

For updates from JavaScript, wait for registration and replace selection arrays
rather than mutating them in place:

```js
await customElements.whenDefined('search-results')
const results = document.querySelector('search-results')

results.searchResults = JSON.stringify([
  { uid: 'example-document', score: 1, title: 'Taucher-Dienstbuch', fachbereich: 'Bauwesen' },
])
results.fachbereiche = ['Bauwesen']
```

Provide valid JSON with the documented shape. Inputs are parsed directly without
runtime validation or a fallback for malformed JSON.

### Document format

The complete TypeScript definitions are in
[src/SearchResults/types.ts](src/SearchResults/types.ts).

| Field | Type | Purpose |
| --- | --- | --- |
| `uid` | `string`, required | Stable, unique document identifier used as the Vue list key |
| `score` | `number`, required | Relevance score |
| `article_id` | `string`, `number`, or `null` | Displayed article identifier |
| `title` | `string` or `null` | Document title |
| `url` | `string` | Document link; defaults to `#` when absent or empty |
| `pub_date` | `string` or `null` | Publication date |
| `pub_date_updated` | `string` or `null` | Date of the updated version |
| `rubrik` | `string` | Rubrik filter value |
| `fachbereich` | `string` | Fachbereich filter value |
| `sachgebiet` | `string` | Sachgebiet filter value |
| `matches` | `{ snippet: string, start: number, end: number }[]` | Excerpts and highlight offsets |

All fields except `uid` and `score` are optional. Use ISO date strings such as
`2024-06-01`; publication-date sorting compares the supplied strings. Match
`start` is inclusive and `end` is exclusive, using JavaScript string offsets.
Snippets render as text, with the matching range wrapped in `<mark>`.

### Filtering and sorting

- Empty selections leave that filter unrestricted.
- Selections within one filter use OR; different filters combine with AND.
- Filter values must match document fields exactly.
- Relevance sorts by descending `score` and is the default.
- Article IDs sort ascending with German numeric collation; titles sort ascending
  with German collation. Publication dates sort descending.
- Each document initially shows up to two excerpts. The expansion button reveals
  the remainder. Replacing the document input resets expansion state.

The component initializes and cleans up the DGUV vanilla multiselect controls
itself. `SearchFilters.vue` observes their `aria-selected` changes to synchronize
Vue filter state.

## Development and Storybook

The stories cover default results, empty results, a Bauwesen preselection,
omitting the Rubrik filter, and the registered custom element. Controls expose
the JSON inputs, heading, and selection arrays.

- [src/stories/search-results.json](src/stories/search-results.json) contains ten
  sample documents with stable, unique UIDs and excerpts.
- [src/stories/search-options.ts](src/stories/search-options.ts) supplies the
  example filter options.
- [src/SearchResults/SearchResults.stories.ts](src/SearchResults/SearchResults.stories.ts)
  defines the stories.

Vue stories render the source components and support hot updates. Changing story
arguments remounts the component to reinitialize the imperative multiselects.
The **Custom Element** story exercises registration and property binding; entry
changes reload the preview because registered custom elements cannot be redefined.

Storybook uses its own Vite configuration. Its preview loads the DGUV Sass theme,
`../../static/css/common.css` relative to this package, and preview styles inside
a `.nexus.vur` wrapper. Component styles load directly from the Vue files.

```sh
yarn build-storybook
```

This generates a static preview in `storybook-static/`.

## Commands

| Command | Purpose |
| --- | --- |
| `yarn storybook` | Start the component preview on port 6006 |
| `yarn build-storybook` | Build the static Storybook preview |
| `yarn build` | Run type checking and the production library build |
| `yarn build-only` | Build the library without type checking |
| `yarn type-check` | Check Vue and TypeScript files with `vue-tsc` |
| `yarn lint` | Run Oxlint and ESLint; both apply fixes |
| `yarn format` | Format `src/` with Oxfmt |
| `yarn dev` | Start Vite with the minimal `index.html` entry |
| `yarn preview` | Start Vite's preview server |

Use Storybook for component development; the minimal Vite HTML entry does not
include a sample `<search-results>` element. For continuous library builds, run
`yarn build-only --watch`.

## Build and Plone integration

`yarn build` writes these assets and JavaScript source maps to `dist/`:

- `search-results.js`: ES module, used by the Plone templates.
- `search-results.umd.cjs`: UMD bundle.
- `search-results.css`: component styles.

The assets are tracked in the repository. Rebuild them after component changes
so Plone serves the updated implementation.

[../../configure.zcml](../../configure.zcml) exposes `dist/` as the
`uvnxs.publication.webcomponents` resource directory.
[../../views/vur_search_view.pt](../../views/vur_search_view.pt) and
[../../views/vur_filter_view.pt](../../views/vur_filter_view.pt) load the module
and stylesheet and supply backend data through attributes.

## Source layout

```text
src/
  main.ce.ts                         Custom element registration
  SearchResults/
    SearchResults.ce.vue             Input parsing, filtering, sorting, expansion state
    SearchFilters.vue                Filter panel, DGUV controls, counts, sorting input
    SearchResult.vue                 Document links, dates, highlighted excerpts
    types.ts                         Document, filter, and sorting types
    SearchResults.stories.ts         Storybook scenarios
  stories/
    search-results.json              Document fixtures
    search-options.ts                Filter fixtures
.storybook/                          Preview configuration and theme styles
vite.config.ts                       Production library configuration
```
