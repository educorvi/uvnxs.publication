<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SearchResultItem from './SearchResult.vue'
import SearchFilters from './SearchFilters.vue'
import {
  filterIds,
  type FilterSelections,
  type SearchFilter,
  type SearchResult,
  type SortBy,
} from './types'

// Supply JSON via the search-results attribute or searchResults property.
// External filter controls supply their selections as array properties.
const props = withDefaults(
  defineProps<{
    searchResults?: string
    filterHeading?: string
    rubrikenOptions?: string
    fachbereicheOptions?: string
    sachgebieteOptions?: string
    rubriken?: string[]
    fachbereiche?: string[]
    sachgebiete?: string[]
  }>(),
  {
    searchResults: '[]',
    filterHeading: 'Dokumente filtern',
    fachbereicheOptions: '[]',
    sachgebieteOptions: '[]',
    rubriken: () => [],
    fachbereiche: () => [],
    sachgebiete: () => [],
  },
)

const selectedFilters = ref<FilterSelections>({ rubrik: [], fachbereich: [], sachgebiet: [] })

watch(
  () => [props.rubriken, props.fachbereiche, props.sachgebiete] as const,
  ([rubriken, fachbereiche, sachgebiete]) => {
    selectedFilters.value = {
      rubrik: [...rubriken],
      fachbereich: [...fachbereiche],
      sachgebiet: [...sachgebiete],
    }
  },
  { immediate: true },
)

const sortBy = ref<SortBy>('score')
const expandedResults = ref(new Set<SearchResult>())
const documents = computed<SearchResult[]>(() => JSON.parse(props.searchResults))

const filterOptions = computed(() => ({
  rubrik: JSON.parse(props.rubrikenOptions ?? '[]') as string[],
  fachbereich: JSON.parse(props.fachbereicheOptions) as string[],
  sachgebiet: (JSON.parse(props.sachgebieteOptions) as { name: string }[]).map(({ name }) => name),
}))

const filterLabels = { rubrik: 'Rubrik', fachbereich: 'Fachbereich', sachgebiet: 'Sachgebiet' }
const filters = computed<SearchFilter[]>(() =>
  filterIds
    .filter((id) => id !== 'rubrik' || props.rubrikenOptions !== undefined)
    .map((id) => ({
      id,
      label: filterLabels[id],
      options: filterOptions.value[id],
      selected: selectedFilters.value[id],
    })),
)

watch(documents, () => expandedResults.value.clear())

const filteredResults = computed(() => {
  const selections = filterIds.map((id) => [id, new Set(selectedFilters.value[id])] as const)

  return documents.value
    .filter(( doc ) =>
      selections.every(([key, values]) => values.size === 0 || values.has(doc[key] ?? '')),
    )
    .sort(( a, b) => {
      const first = String(a[sortBy.value] ?? '')
      const second = String(b[sortBy.value] ?? '')
      switch (sortBy.value) {
        case 'score':
          return b.score - a.score
        case 'pub_date':
          return second.localeCompare(first, 'de')
        default:
          return first.localeCompare(second, 'de', { numeric: sortBy.value === 'article_id' })
      }
    })
})
</script>

<template>
  <SearchFilters
    v-model:sort-by="sortBy"
    :filters="filters"
    :filter-heading="filterHeading"
    :total-count="documents.length"
    :filtered-count="filteredResults.length"
    @selection-change="selectedFilters = $event"
  />
  <section class="vur-documents-list" aria-label="Suchergebnisse">
    <SearchResultItem
      v-for="doc in filteredResults"
      :key="doc.uid"
      :doc="doc"
      :expanded="expandedResults.has(doc)"
      @expand="expandedResults.add(doc)"
    />
  </section>
</template>
