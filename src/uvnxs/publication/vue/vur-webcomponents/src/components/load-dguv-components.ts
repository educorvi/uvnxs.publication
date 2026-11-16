export async function loadDguvComponents() {
  // @ts-ignore
  await import('@untrouble/dguv-angular-elements/dist/bundle/dguv-elements.js')
  await customElements.whenDefined('dguv-multi-select')
}
