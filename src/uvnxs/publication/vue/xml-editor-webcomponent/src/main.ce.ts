import {defineCustomElement} from "vue";
import CodeEditor from './CodeEditor.ce.vue'

const CodeEditorCe = defineCustomElement(CodeEditor, {
  shadowRoot: false
})
customElements.define('xml-editor', CodeEditorCe)
