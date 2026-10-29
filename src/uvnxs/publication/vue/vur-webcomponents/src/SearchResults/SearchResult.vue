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
  border-bottom: 1px solid var(--dguv-border, #d5d5d5);
}

.vur-documents-list__item > a {
  padding: 32px 16px 8px;
  display: grid;
  align-items: start;
  grid-template-columns: 70% 30%;
}

.vur-documents-list__item:hover {
  background: var(--dguv-background-light, #ededed);
  color: var(--dguv-text, #000);
}

.vur-documents-list__item-content {
  padding-right: 48px;
}

.vur-documents-list__article-id {
  margin: 0;
  color: var(--dguv-text-secondary, #555);
  font-size: 14px;
  font-weight: 700;
  line-height: 1;
  text-transform: uppercase;
}

.vur-documents-list__title {
  margin-top: 10px;
  font-size: 22px;
  font-weight: 500;
}

.vur-documents-list__matches {
  padding: 0 16px 32px;
}

.vur-documents-list__matches .vur-documents-list__snippet:not(:last-of-type) {
  border-bottom: 1px solid var(--dguv-border, #d5d5d5);
}

.vur-documents-list__matches .btn {
  margin-top: 16px;
  height: auto;
  min-height: 0;
  font-size: 1rem;
  line-height: 1;
}

.vur-documents-list__item-dates {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

@media (max-width: 1023.99px) {
  .vur-documents-list__item > a {
    grid-template-columns: 1fr;
  }

  .vur-documents-list__item-dates {
    flex-direction: row;
    gap: 24px;
  }
}
</style>
