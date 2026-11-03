export interface SearchMatch {
  snippet: string
  start: number
  end: number
}

export interface SearchResult {
  url?: string
  article_id?: string | number | null
  title?: string | null
  pub_date?: string | null
  pub_date_updated?: string | null
  rubrik?: string
  fachbereich?: string
  sachgebiet?: string
  matches?: SearchMatch[]
  score?: number
  uid: string
}

export type SortBy = 'article_id' | 'title' | 'pub_date' | 'score'

export const filterIds = ['rubrik', 'fachbereich', 'sachgebiet'] as const

export type FilterSelections = Record<(typeof filterIds)[number], string[]>

export interface SearchFilter {
  id: keyof FilterSelections
  label: string
  options: string[]
  selected: string[]
}
