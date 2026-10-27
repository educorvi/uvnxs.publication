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
  score: number
}

export type SortBy = 'article_id' | 'title' | 'pub_date' | 'score'

export interface FilterSelections {
  rubrik: string[]
  fachbereich: string[]
  sachgebiet: string[]
}

export interface SearchFilter {
  id: keyof FilterSelections
  label: string
  options: string[]
  selected: string[]
}
