import {defineCustomElement} from "vue";
import SearchResults from "./SearchResults/SearchResults.ce.vue";

const SearchResultsCe = defineCustomElement(SearchResults, { shadowRoot: false })

customElements.define('search-results', SearchResultsCe)

// Custom element constructors cannot be redefined in the browser registry.
// Vue stories use native HMR; the integration story reloads on entry changes.
if (import.meta.hot) {
  import.meta.hot.accept(() => window.location.reload())
}
