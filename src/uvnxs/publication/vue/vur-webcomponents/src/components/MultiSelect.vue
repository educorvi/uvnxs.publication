<script setup lang="ts">
import { computed, useId, useTemplateRef, watch, onMounted, ref } from 'vue'
import {loadDguvComponents} from "./load-dguv-components.ts";

const ready = ref(false)
onMounted(async () => {
  await loadDguvComponents()
  ready.value = true
})

export type MultiSelectProps = {
  id?: string
  label: string
  options: string[]
}

const props = defineProps<MultiSelectProps>()
const generatedId = useId()
const id = computed(() => props.id ?? `multi-select-${generatedId}`)
const model = defineModel<string[]>({ default: () => [] })
const options = computed(() => props.options.map(value => ({ value, label: value })))
const optionsKey = computed(() => JSON.stringify(props.options))
const element = useTemplateRef<HTMLElement>('element')

watch(element, (target, _previous, onCleanup) => {
  if (!target) return
  target.addEventListener('valueChange', onValueChange)
  onCleanup(() => target.removeEventListener('valueChange', onValueChange))
}, { flush: 'post' })

watch(optionsKey, () => {
  const newOptions = props.options
  const selected = model.value.filter(value => newOptions.includes(value))
  if (selected.length !== model.value.length) model.value = selected
})

function onValueChange(event: Event) {
  model.value = (event as CustomEvent<string[]>).detail
}
</script>

<template>
  <div>
    <label :id="`${id}-label`" :for="`${id}-multi-select`">{{ label }}</label>
    <dguv-multi-select
      v-if="ready"
      ref="element"
      :input-id="`${id}-multi-select`"
      :labelledby="`${id}-label`"
      :options.prop="options"
      :value.prop="model"
      placeholder="Auswählen"
    />
    <input disabled v-else></input>
  </div>
</template>
