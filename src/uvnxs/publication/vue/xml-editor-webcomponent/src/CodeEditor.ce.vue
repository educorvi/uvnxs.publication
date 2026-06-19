<script setup lang="ts">
import {basicSetup} from "codemirror"
import {xml} from "@codemirror/lang-xml"
import {Codemirror} from "vue-codemirror";
import {onMounted, ref, watch} from "vue";
import xmlFormat from 'xml-formatter';

const extensions = [basicSetup, xml()]
const codeModel = ref<string>('')
const props = defineProps<{
  name: string,
  initialValue: string,
  disabled?: boolean,
  formatButtonText?: string
}>()

onMounted(() => {
  codeModel.value = props.initialValue
})

watch(() => props.initialValue, (newValue) => {
  codeModel.value = newValue
})

function formatXml() {
  const rootXml = `<root>${codeModel.value}</root>`
  codeModel.value = xmlFormat(rootXml)
    .replace(/^<root>[\r\n]{0,}/g, '')
    .replace(/[\r\n]{0,}<\/root>$/g, '')
}
</script>

<template>
  <div class="card">
    <button class="btn btn-outline-light w-100" v-if="!disabled" @click.stop.prevent="formatXml">
      {{ formatButtonText || 'Reformat' }}
    </button>
    <codemirror
      style="max-height: 500px"
      v-model="codeModel"
      :extensions="extensions"
      :disabled="disabled"
    />
  </div>
  <input type="hidden" :value="codeModel" :name="name"/>
</template>

