<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import SearchResultItem from './SearchResult.vue'
import SearchFilters from './SearchFilters.vue'
import type { FilterSelections, SearchFilter, SearchResult, SortBy } from './types'

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

const selectedFilters = ref<FilterSelections>({
  rubrik: [...props.rubriken],
  fachbereich: [...props.fachbereiche],
  sachgebiet: [...props.sachgebiete],
})

watch(
  () => [props.rubriken, props.fachbereiche, props.sachgebiete] as const,
  ([rubriken, fachbereiche, sachgebiete]) => {
    selectedFilters.value = {
      rubrik: [...rubriken],
      fachbereich: [...fachbereiche],
      sachgebiet: [...sachgebiete],
    }
  },
)

const sortBy = ref<SortBy>('score')
const expandedResults = ref(new Set<SearchResult>())
const documents = computed<SearchResult[]>(() => JSON.parse(props.searchResults))

interface SachgebietOption {
  name: string
  fachbereiche: string[]
}

const filters = computed<SearchFilter[]>(() => {
  const fachbereiche: string[] = JSON.parse(props.fachbereicheOptions)
  const sachgebiete: SachgebietOption[] = JSON.parse(props.sachgebieteOptions)
  const fields: SearchFilter[] = [
    {
      id: 'fachbereich',
      label: 'Fachbereich',
      options: fachbereiche,
      selected: selectedFilters.value.fachbereich,
    },
    {
      id: 'sachgebiet',
      label: 'Sachgebiet',
      options: sachgebiete.map((option) => option.name),
      selected: selectedFilters.value.sachgebiet,
    },
  ]
  if (props.rubrikenOptions !== undefined) {
    const rubriken: string[] = JSON.parse(props.rubrikenOptions)
    fields.unshift({
      id: 'rubrik',
      label: 'Rubrik',
      options: rubriken,
      selected: selectedFilters.value.rubrik,
    })
  }
  return fields
})

watch(documents, () => expandedResults.value.clear())

const filteredResults = computed(() => {
  const selections = [
    ['rubrik', new Set(selectedFilters.value.rubrik)],
    ['fachbereich', new Set(selectedFilters.value.fachbereich)],
    ['sachgebiet', new Set(selectedFilters.value.sachgebiet)],
  ] as const

  return documents.value
    .filter((doc) =>
      selections.every(([key, values]) => values.size === 0 || values.has(doc[key] ?? '')),
    )
    .sort((a, b) => {
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
      :key="documents.indexOf(doc)"
      :doc="doc"
      :expanded="expandedResults.has(doc)"
      @expand="expandedResults.add(doc)"
    />
  </section>
</template>
