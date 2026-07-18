import { useEffect } from 'react'
import { motion } from 'framer-motion'
import confetti from 'canvas-confetti'
import { useLocale } from '../i18n/LocaleContext'
import type { TranslationKey } from '../i18n/translations'
import type { RoundResult } from '../types'

interface Props {
  results: RoundResult[]
  bestScore: number
  onPlayAgain: () => void
  onChangeSetup: () => void
  onHome: () => void
}

function verdictKey(score: number): { key: TranslationKey; emoji: string } {
  if (score >= 15) return { key: 'results.legendary', emoji: '🏆' }
  if (score >= 10) return { key: 'results.amazing', emoji: '🤩' }
  if (score >= 6) return { key: 'results.nice', emoji: '🙌' }
  if (score >= 3) return { key: 'results.good', emoji: '👍' }
  return { key: 'results.keepPracticing', emoji: '🎭' }
}

export default function ResultsScreen({ results, bestScore, onPlayAgain, onChangeSetup, onHome }: Props) {
  const { t } = useLocale()
  const correct = results.filter((r) => r.status === 'correct')
  const passed = results.filter((r) => r.status === 'passed')
  const score = correct.length
  const isNewBest = score > 0 && score >= bestScore
  const { key, emoji } = verdictKey(score)

  useEffect(() => {
    const colors = ['#facc15', '#f472b6', '#a855f7', '#22d3ee']
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.3 }, colors })
    if (isNewBest) {
      const timer = setTimeout(() => {
        confetti({ particleCount: 140, spread: 100, origin: { y: 0.25 }, colors, startVelocity: 45 })
      }, 300)
      return () => clearTimeout(timer)
    }
  }, [isNewBest])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="safe-top safe-bottom absolute inset-0 flex flex-col items-center bg-gradient-to-b from-purple-800 via-fuchsia-800 to-pink-700 px-6 py-8 text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.6 }}
        className="text-6xl"
      >
        {emoji}
      </motion.div>
      <h1 className="font-display mt-2 text-2xl font-extrabold">{t(key)}</h1>
      {isNewBest && (
        <div className="mt-1 rounded-full bg-yellow-400/90 px-3 py-1 text-xs font-extrabold text-purple-900">
          🏆 {t('results.newBest')}
        </div>
      )}

      <div className="font-display mt-4 text-8xl font-black drop-shadow-lg">{score}</div>
      <p className="text-sm font-semibold text-white/70">{t('results.wordsGuessed')}</p>

      <div className="mt-6 flex w-full max-w-sm flex-1 flex-col gap-3 overflow-y-auto">
        {results.length === 0 && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 text-center">
            <div className="text-5xl">🙈</div>
            <p className="font-display text-lg font-bold text-white/80">{t('results.emptyTitle')}</p>
            <p className="text-sm text-white/50">{t('results.emptySubtitle')}</p>
          </div>
        )}
        {correct.length > 0 && (
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="mb-1 text-sm font-bold text-emerald-300">
              ✅ {t('results.guessed')} ({correct.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {correct.map((r, i) => (
                <span key={i} className="rounded-full bg-emerald-400/20 px-2 py-1 text-xs font-semibold text-emerald-100">
                  {r.text}
                </span>
              ))}
            </div>
          </div>
        )}
        {passed.length > 0 && (
          <div className="rounded-2xl bg-white/10 p-3">
            <div className="mb-1 text-sm font-bold text-white/60">
              ⏭️ {t('results.passed')} ({passed.length})
            </div>
            <div className="flex flex-wrap gap-1.5">
              {passed.map((r, i) => (
                <span key={i} className="rounded-full bg-white/10 px-2 py-1 text-xs font-semibold text-white/60">
                  {r.text}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 flex w-full max-w-sm flex-col gap-3">
        <motion.button
          onClick={onPlayAgain}
          whileTap={{ scale: 0.96 }}
          className="font-display w-full rounded-3xl bg-gradient-to-r from-yellow-300 to-amber-400 py-4 text-xl font-extrabold text-purple-900 shadow-lg"
        >
          🔁 {t('results.playAgain')}
        </motion.button>
        <div className="flex gap-3">
          <button
            onClick={onChangeSetup}
            className="flex-1 rounded-2xl bg-white/15 py-3 text-sm font-bold text-white active:bg-white/25"
          >
            🎯 {t('results.changeSetup')}
          </button>
          <button onClick={onHome} className="flex-1 rounded-2xl bg-white/15 py-3 text-sm font-bold text-white active:bg-white/25">
            🏠 {t('results.home')}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
