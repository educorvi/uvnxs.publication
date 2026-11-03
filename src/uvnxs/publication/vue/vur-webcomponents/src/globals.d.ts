export {}

declare global {
  interface Window {
    uvnxstheme?: {
      initMultiSelect: (root: HTMLElement) => () => void
    }
  }
}
