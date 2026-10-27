<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { filterIds, type FilterSelections, type SearchFilter, type SortBy } from './types'

const props = defineProps<{
  filters: SearchFilter[]
  filterHeading: string
  totalCount: number
  filteredCount: number
}>()
const sortBy = defineModel<SortBy>('sortBy', { required: true })
const emit = defineEmits<{ 'selection-change': [selections: FilterSelections] }>()

const filterSection = ref<HTMLElement>()
const destroyMultiSelects: Array<() => void> = []
let selectionObserver: MutationObserver | undefined

function syncFilterSelections() {
  const next: FilterSelections = { rubrik: [], fachbereich: [], sachgebiet: [] }
  for (const key of filterIds) {
    const rows = filterSection.value?.querySelectorAll<HTMLElement>(
      `[data-filter="${key}"] .ms-option:not(.ms-option-all)[aria-selected="true"]`,
    )
    next[key] = Array.from(rows ?? [], (row) => row.dataset.value ?? '')
  }
  if (
    props.filters.some((filter) => {
      const values = next[filter.id]
      return (
        values.length !== filter.selected.length ||
        values.some((value, index) => value !== filter.selected[index])
      )
    })
  ) {
    emit('selection-change', next)
  }
}

onMounted(() => {
  const initMultiSelect = window.uvnxstheme?.initMultiSelect;
  if (!initMultiSelect) {
    throw new Error('uvnxstheme.initMultiSelect is not available')
  }
  filterSection.value?.querySelectorAll<HTMLElement>('.form-multi-select').forEach((container) => {
    destroyMultiSelects.push(initMultiSelect(container))
  });
  // The vanilla control reports selection changes through aria-selected.
  selectionObserver = new MutationObserver(syncFilterSelections)
  if (filterSection.value) {
    selectionObserver.observe(filterSection.value, {
      subtree: true,
      attributes: true,
      attributeFilter: ['aria-selected'],
    })
  }
})

onBeforeUnmount(() => {
  selectionObserver?.disconnect()
  destroyMultiSelects.forEach((destroy) => destroy())
})
</script>

<template>
  <section class="vur-filter-section" ref="filterSection">
    <div class="vur-filter-section__filters">
      <div
        class="vur-filter-section__header d-flex flex-wrap align-items-baseline justify-content-between gap-3"
      >
        <h2>{{ filterHeading }}</h2>
        <p class="small">Mehrfachauswahl erweitert die Trefferliste.</p>
      </div>

      <div class="vur-filter-section__filterlist" :style="{ '--filter-columns': filters.length }">
        <div
          v-for="filter in filters"
          :key="filter.id"
          class="form-group"
          :class="{ 'flex-fill': filter.id === 'sachgebiet' }"
        >
          <label :id="`${filter.id}-label`" :for="`${filter.id}-multi-select`">{{
            filter.label
          }}</label>
          <div
            class="form-multi-select"
            :data-filter="filter.id"
            :id="`${filter.id}-multi-select-container`"
            data-max-chips="5"
            data-placeholder="Auswählen"
          >
            <div class="ms-field">
              <button
                class="ms-trigger"
                :id="`${filter.id}-multi-select`"
                :aria-controls="`${filter.id}-multi-select-listbox`"
                aria-expanded="false"
                aria-haspopup="listbox"
                :aria-labelledby="`${filter.id}-label`"
                type="button"
              ></button>
              <span class="ms-value"></span>
              <span class="ms-chevron" aria-hidden="true"></span>
            </div>
            <ul
              class="ms-listbox"
              :id="`${filter.id}-multi-select-listbox`"
              :aria-labelledby="`${filter.id}-label`"
              aria-multiselectable="true"
              hidden
              role="listbox"
            >
              <li
                class="ms-option ms-option-all"
                :id="`${filter.id}-multi-select-option-all`"
                aria-selected="false"
                role="option"
                tabindex="-1"
              >
                <span class="ms-check" aria-hidden="true"></span
                ><span class="ms-option-label">Alle auswählen</span>
              </li>
              <li
                v-for="option in filter.options"
                :key="option"
                class="ms-option"
                :data-value="option"
                :aria-selected="filter.selected.includes(option)"
                role="option"
                tabindex="-1"
              >
                <span class="ms-check" aria-hidden="true"></span
                ><span class="ms-option-label">{{ option }}</span>
              </li>
            </ul>
            <span class="ms-visually-hidden" aria-live="polite"></span>
          </div>
        </div>
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
          <option value="score">Relevanz</option>
          <option value="article_id">Artikel-ID</option>
          <option value="title">Titel</option>
          <option value="pub_date">Ausgabedatum</option>
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
