<script setup lang="ts">
import MultiSelect from '../components/MultiSelect.vue'
import { type FilterSelections, type SearchFilter, type SortBy } from './types'

const props = defineProps<{
  filters: SearchFilter[]
  filterHeading: string
  hideRelevance?: boolean
  totalCount: number
  filteredCount: number
}>()
const sortBy = defineModel<SortBy>('sortBy', { required: true })
const emit = defineEmits<{ 'selection-change': [selections: FilterSelections] }>()

function updateSelection(id: SearchFilter['id'], values: string[]) {
  const selections: FilterSelections = { rubrik: [], fachbereich: [], sachgebiet: [] }
  for (const filter of props.filters) {
    selections[filter.id] = filter.id === id ? values : filter.selected
  }
  emit('selection-change', selections)
}
</script>

<template>
  <section class="vur-filter-section">
    <div class="vur-filter-section__filters">
      <div
        class="vur-filter-section__header d-flex flex-wrap align-items-baseline justify-content-between gap-3"
      >
        <h2>{{ filterHeading }}</h2>
        <p class="small">Mehrfachauswahl erweitert die Trefferliste.</p>
      </div>

      <div class="vur-filter-section__filterlist" :style="{ '--filter-columns': filters.length }">
        <MultiSelect
          v-for="filter in filters"
          :key="filter.id"
          :id="filter.id"
          :label="filter.label"
          :options="filter.options"
          :model-value="filter.selected"
          class="form-group"
          :class="{ 'flex-fill': filter.id === 'sachgebiet' }"
          @update:model-value="updateSelection(filter.id, $event)"
        />
      </div>
    </div>
    <div
      class="vur-filter-section__sorting d-flex flex-wrap align-items-center justify-content-between gap-3"
    >
      <div aria-live="polite" aria-atomic="true">
        <strong>{{ totalCount }}</strong> Dokumente
        <span aria-hidden="true"> • </span>
        <span class="vur-filter-section__results-count">
          <strong>{{ filteredCount }}</strong> nach Filtern
        </span>
      </div>
      <label class="vur-filter-section__sort d-flex align-items-center gap-3">
        <strong>Sortieren nach</strong>
        <select v-model="sortBy" class="form-select">
          <option v-if="!hideRelevance" value="score" :selected="sortBy === 'score'">
            Relevanz
          </option>
          <option value="article_id" :selected="sortBy === 'article_id'">Artikel-ID</option>
          <option value="title" :selected="sortBy === 'title'">Titel</option>
          <option value="pub_date" :selected="sortBy === 'pub_date'">Ausgabedatum</option>
        </select>
      </label>
    </div>
  </section>
</template>

<style scoped>
.vur-filter-section {
  margin: 48px 0;
  border: 1px solid var(--dguv-text, #000);
}

.vur-filter-section > * {
  padding: 24px;
}

.vur-filter-section__header h2 {
  margin: 0;
  font-size: 22px;
  font-weight: 500;
  color: var(--dguv-text, #000);
}

.vur-filter-section__sorting {
  border-top: 1px solid var(--dguv-text, #000);
}

.vur-filter-section__sort select {
  width: auto;
}

.vur-filter-section__filterlist {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: repeat(var(--filter-columns, 3), minmax(0, 1fr));
}

@media (max-width: 1023.99px) {
  .vur-filter-section__filterlist {
    grid-template-columns: minmax(0, 1fr);
  }
}
</style>
