<script setup lang="ts">
import type { SearchResult } from './types'

defineProps<{ doc: SearchResult; expanded: boolean }>()
defineEmits<{ expand: [] }>()

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('de-DE', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
  })
}
</script>

<template>
  <div class="vur-documents-list__item">
    <a :href="doc.url || '#'" class="text-black text-decoration-none">
      <div class="vur-documents-list__item-content">
        <p class="vur-documents-list__article-id">{{ doc.article_id }}</p>
        <h3 class="vur-documents-list__title">{{ doc.title }}</h3>
      </div>
      <div class="vur-documents-list__item-dates">
        <div v-if="doc.pub_date">
          <span>Ausgabedatum: </span>
          <strong>{{ formatDate(doc.pub_date) }}</strong>
        </div>
        <div v-if="doc.pub_date_updated">
          <span>Aktualisierte Fassung: </span>
          <strong>{{ formatDate(doc.pub_date_updated) }}</strong>
        </div>
      </div>
    </a>
    <div v-if="doc.matches?.length" class="vur-documents-list__matches">
      <p
        v-for="(match, index) in doc.matches"
        :key="index"
        :hidden="index >= 2 && !expanded"
        class="vur-documents-list__snippet"
      >
        <span>... {{ match.snippet.substring(0, match.start) }}</span>
        <mark>{{ match.snippet.substring(match.start, match.end) }} </mark>
        <span>{{ match.snippet.substring(match.end) }} ...</span>
      </p>
      <button
        v-if="doc.matches.length > 2 && !expanded"
        type="button"
        class="btn btn-secondary btn-sm"
        @click="$emit('expand')"
      >
        Weitere Auszüge anzeigen ({{ doc.matches.length - 2 }})
      </button>
    </div>
  </div>
</template>

<style scoped>
.vur-documents-list__item:not(:last-child) {
  border-bottom: 1px solid var(--dguv-border, #555);
}

.vur-documents-list__item > a {
  padding: var(--space-l2, 2rem) var(--space-m, 1rem) var(--space-s, 0.5rem);
  display: grid;
  align-items: start;
  grid-template-columns: 1fr;
}

.vur-documents-list__item:hover {
  background: var(--dguv-background-light, #ededed);
  color: var(--dguv-text, #000);
}

.vur-documents-list__item-content {
  padding-right: var(--space-l3, 3rem);
}

.vur-documents-list__article-id {
  margin: 0;
  color: var(--dguv-text-secondary, #555);
  font: var(--font-s-bold, 700 0.875rem/1.5 "Source Sans 3");
}

.vur-documents-list__title {
  margin-top: var(--space-s, 0.5rem);
  font: var(--font-xxl-bold, 700 1.5rem/1.5 "Source Sans 3");
}

.vur-documents-list__item-dates {
  display: flex;
  flex-direction: row;
  gap: var(--space-l, 1.5rem);
}

.vur-documents-list__matches {
  padding: 0 var(--space-m, 1rem) var(--space-l2, 2rem);
}

.vur-documents-list__matches .vur-documents-list__snippet {
  margin: 0;
  padding: var(--space-s, 0.5rem) 0;
}

.vur-documents-list__matches .vur-documents-list__snippet:not(:last-of-type) {
  border-bottom: 1px solid var(--dguv-border, #555);
}

.vur-documents-list__matches .btn {
  margin-top: var(--space-l2, 2rem);
  height: auto;
  min-height: 0;
  font-size: 1rem;
  line-height: 1;
}

@media (min-width: 1024px) {
  .vur-documents-list__item > a {
    grid-template-columns: 70% 30%;
  }

  .vur-documents-list__item-dates {
    flex-direction: column;
    gap: var(--space-sm, 0.75rem);
  }
}
</style>
