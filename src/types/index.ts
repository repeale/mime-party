export type Difficulty = 'easy' | 'medium' | 'hard'

export type Locale = 'en' | 'it'

export interface WordEntry {
  text: string
  difficulty: Difficulty
  emoji?: string
}

export interface Category {
  id: string
  name: string
  emoji: string
  gradient: string
  words: WordEntry[]
}

/** Raw source data: word text carries one entry per supported locale. */
export interface LocalizedWordEntry {
  text: Record<Locale, string>
  difficulty: Difficulty
  emoji?: string
}

/** Raw source data: category name carries one entry per supported locale. */
export interface LocalizedCategory {
  id: string
  name: Record<Locale, string>
  emoji: string
  gradient: string
  words: LocalizedWordEntry[]
}

export type DifficultyFilter = Difficulty | 'mixed'

export interface RoundResult {
  text: string
  status: 'correct' | 'passed'
}

export interface GameSettings {
  categoryIds: string[]
  difficulty: DifficultyFilter
  duration: number
}
