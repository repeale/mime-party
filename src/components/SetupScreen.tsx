import { motion } from 'framer-motion'
import { getCategoriesForLocale } from '../data/categories'
import { useLocale } from '../i18n/LocaleContext'
import type { DifficultyFilter } from '../types'

interface Props {
  categoryIds: string[]
  onCategoryIdsChange: (ids: string[]) => void
  difficulty: DifficultyFilter
  onDifficultyChange: (d: DifficultyFilter) => void
  duration: number
  onDurationChange: (d: number) => void
  onStart: () => void
  onBack: () => void
}

const DIFFICULTIES: { value: DifficultyFilter; key: 'difficulty.easy' | 'difficulty.medium' | 'difficulty.hard' | 'difficulty.mixed'; emoji: string }[] = [
  { value: 'easy', key: 'difficulty.easy', emoji: '🟢' },
  { value: 'medium', key: 'difficulty.medium', emoji: '🟡' },
  { value: 'hard', key: 'difficulty.hard', emoji: '🔴' },
  { value: 'mixed', key: 'difficulty.mixed', emoji: '🎲' },
]

const DURATIONS = [45, 60, 90, 120]

export default function SetupScreen({
  categoryIds,
  onCategoryIdsChange,
  difficulty,
  onDifficultyChange,
  duration,
  onDurationChange,
  onStart,
  onBack,
}: Props) {
  const { locale, t } = useLocale()
  const categories = getCategoriesForLocale(locale)

  const toggleCategory = (id: string) => {
    if (categoryIds.includes(id)) onCategoryIdsChange(categoryIds.filter((c) => c !== id))
    else onCategoryIdsChange([...categoryIds, id])
  }

  const allSelected = categoryIds.length === categories.length
  const toggleAll = () => onCategoryIdsChange(allSelected ? [] : categories.map((c) => c.id))

  const canStart = categoryIds.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      className="safe-top safe-bottom absolute inset-0 flex flex-col bg-gradient-to-b from-indigo-950 via-purple-950 to-slate-950 text-white"
    >
      <div className="flex items-center gap-3 px-4 pb-2 pt-4">
        <button
          onClick={onBack}
          aria-label={t('setup.back')}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl active:scale-90"
        >
          ←
        </button>
        <h1 className="font-display text-2xl font-extrabold">{t('setup.title')}</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-40">
        <div className="mt-2 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-white/90">{t('setup.categories')}</h2>
          <button onClick={toggleAll} className="text-sm font-bold text-fuchsia-300 active:opacity-60">
            {allSelected ? t('setup.clearAll') : t('setup.selectAll')}
          </button>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {categories.map((cat) => {
            const selected = categoryIds.includes(cat.id)
            return (
              <button
                key={cat.id}
                onClick={() => toggleCategory(cat.id)}
                className={`relative overflow-hidden rounded-2xl bg-gradient-to-br p-4 text-left transition-transform active:scale-95 ${cat.gradient} ${
                  selected ? 'ring-4 ring-white/90' : 'opacity-70 grayscale-[0.3]'
                }`}
              >
                <div className="text-3xl">{cat.emoji}</div>
                <div className="font-display mt-1 text-base font-bold text-white drop-shadow">{cat.name}</div>
                <div className="text-xs font-semibold text-white/80">
                  {cat.words.length} {t('setup.words')}
                </div>
                {selected && (
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-white text-sm font-bold text-slate-900">
                    ✓
                  </div>
                )}
              </button>
            )
          })}
        </div>

        <h2 className="font-display mt-6 text-lg font-bold text-white/90">{t('setup.difficulty')}</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {DIFFICULTIES.map((d) => (
            <button
              key={d.value}
              onClick={() => onDifficultyChange(d.value)}
              className={`flex flex-col items-center gap-1 rounded-xl py-3 text-sm font-bold transition-colors ${
                difficulty === d.value ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              <span className="text-lg">{d.emoji}</span>
              {t(d.key)}
            </button>
          ))}
        </div>

        <h2 className="font-display mt-6 text-lg font-bold text-white/90">{t('setup.roundLength')}</h2>
        <div className="mt-3 grid grid-cols-4 gap-2">
          {DURATIONS.map((d) => (
            <button
              key={d}
              onClick={() => onDurationChange(d)}
              className={`rounded-xl py-3 text-sm font-bold transition-colors ${
                duration === d ? 'bg-fuchsia-500 text-white' : 'bg-white/10 text-white/70'
              }`}
            >
              {d}s
            </button>
          ))}
        </div>
      </div>

      <div className="safe-bottom absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/95 to-transparent px-4 pb-6 pt-10">
        <motion.button
          disabled={!canStart}
          onClick={onStart}
          whileTap={canStart ? { scale: 0.96 } : undefined}
          className={`font-display w-full rounded-3xl py-4 text-xl font-extrabold shadow-lg transition-opacity ${
            canStart ? 'bg-gradient-to-r from-yellow-300 to-amber-400 text-purple-900' : 'bg-white/10 text-white/40'
          }`}
        >
          {canStart
            ? `${t('setup.startGame')} · ${categoryIds.length} ${categoryIds.length === 1 ? t('setup.category') : t('setup.categoryPlural')}`
            : t('setup.pickCategory')}
        </motion.button>
      </div>
    </motion.div>
  )
}
