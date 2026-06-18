<script setup lang="ts">
import {basicSetup} from "codemirror"
import {xml} from "@codemirror/lang-xml"
import {Codemirror} from "vue-codemirror";
import {onMounted, ref, watch} from "vue";

const extensions = [basicSetup, xml()]
const codeModel = ref<string>('')
const props = defineProps<{
  name: string,
  initialValue: string,
  disabled?: boolean
}>()

onMounted(() => {
  codeModel.value = props.initialValue
})

watch(() => props.initialValue, (newValue) => {
  codeModel.value = newValue
})
</script>

<template>
  <div class="card">
    <codemirror
    v-model="codeModel"
    :extensions="extensions"
    @change="console.log('change', $event)"
    :disabled="disabled"
  />
  </div>
  <input type="hidden" :value="codeModel" :name="name"></input>
</template>

