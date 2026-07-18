import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, type PanInfo } from 'framer-motion'
import { getWordPool } from '../data/categories'
import { shuffle } from '../utils/shuffle'
import { useSound } from '../hooks/useSound'
import { useLocale } from '../i18n/LocaleContext'
import type { DifficultyFilter, RoundResult, WordEntry } from '../types'

interface Props {
  categoryIds: string[]
  difficulty: DifficultyFilter
  duration: number
  soundOn: boolean
  hapticsOn: boolean
  onFinish: (results: RoundResult[]) => void
  onExit: () => void
}

const RADIUS = 46
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

function nextFrom(queue: WordEntry[], pool: WordEntry[], last: WordEntry | null): [WordEntry, WordEntry[]] {
  let q = queue
  if (q.length === 0) q = shuffle(pool)
  if (q.length > 1 && last && q[q.length - 1].text === last.text) {
    ;[q[q.length - 1], q[q.length - 2]] = [q[q.length - 2], q[q.length - 1]]
  }
  const word = q[q.length - 1]
  return [word, q.slice(0, -1)]
}

export default function GameScreen({ categoryIds, difficulty, duration, soundOn, hapticsOn, onFinish, onExit }: Props) {
  const poolRef = useRef<WordEntry[] | null>(null)
  const queueRef = useRef<WordEntry[]>([])
  const resultsRef = useRef<RoundResult[]>([])
  const play = useSound(soundOn)
  const { locale, t } = useLocale()

  if (poolRef.current === null) {
    let pool = getWordPool(categoryIds, difficulty, locale)
    if (pool.length === 0) pool = getWordPool(categoryIds, 'mixed', locale)
    poolRef.current = pool
    queueRef.current = shuffle(pool)
  }

  const [current, setCurrent] = useState<WordEntry>(() => {
    const [word, rest] = nextFrom(queueRef.current, poolRef.current!, null)
    queueRef.current = rest
    return word
  })
  const [exitDir, setExitDir] = useState(0)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(duration)

  const vibrate = (pattern: number | number[]) => {
    if (hapticsOn && 'vibrate' in navigator) navigator.vibrate(pattern)
  }

  useEffect(() => {
    if (timeLeft <= 0) return
    const id = setTimeout(() => setTimeLeft((prev) => prev - 1), 1000)
    return () => clearTimeout(id)
  }, [timeLeft])

  useEffect(() => {
    if (timeLeft > 0 && timeLeft <= 10) play('tick')
  }, [timeLeft, play])

  const finished = useRef(false)
  useEffect(() => {
    if (timeLeft <= 0 && !finished.current) {
      finished.current = true
      play('timeup')
      vibrate([100, 60, 100, 60, 220])
      onFinish(resultsRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeLeft])

  const handleAction = (status: 'correct' | 'passed') => {
    if (finished.current) return
    resultsRef.current = [...resultsRef.current, { text: current.text, status }]
    if (status === 'correct') {
      setScore((s) => s + 1)
      play('correct')
      vibrate(40)
      setExitDir(1)
    } else {
      play('pass')
      vibrate([20, 30, 20])
      setExitDir(-1)
    }
    const [word, rest] = nextFrom(queueRef.current, poolRef.current!, current)
    queueRef.current = rest
    setCurrent(word)
  }

  const onDragEnd = (_: unknown, info: PanInfo) => {
    if (info.offset.x > 110) handleAction('correct')
    else if (info.offset.x < -110) handleAction('passed')
  }

  const urgent = timeLeft <= 10
  const progress = timeLeft / duration
  const dashoffset = CIRCUMFERENCE * (1 - progress)
  const difficultyLabel =
    current.difficulty === 'easy' ? t('difficulty.easy') : current.difficulty === 'medium' ? t('difficulty.medium') : t('difficulty.hard')

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`safe-top safe-bottom absolute inset-0 flex flex-col bg-gradient-to-b ${
        urgent ? 'from-rose-700 to-red-900' : 'from-slate-900 to-slate-950'
      } text-white transition-colors duration-500`}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <button
          onClick={onExit}
          aria-label={t('game.quit')}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-xl active:scale-90"
        >
          ✕
        </button>

        <div className="relative flex h-20 w-20 items-center justify-center">
          <svg className="absolute h-20 w-20 -rotate-90">
            <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="7" />
            <circle
              cx="40"
              cy="40"
              r={RADIUS}
              fill="none"
              stroke={urgent ? '#fecdd3' : '#facc15'}
              strokeWidth="7"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashoffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className={`font-display text-2xl font-extrabold ${urgent ? 'animate-wiggle' : ''}`}>{timeLeft}</span>
        </div>

        <div className="flex h-11 min-w-11 items-center justify-center rounded-full bg-white/10 px-3 text-lg font-bold">
          {score} ✅
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center px-6">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={current.text}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.7}
            onDragEnd={onDragEnd}
            initial={{ scale: 0.7, opacity: 0, rotate: 0 }}
            animate={{ scale: 1, opacity: 1, rotate: 0 }}
            exit={{
              x: exitDir * 400,
              opacity: 0,
              rotate: exitDir * 20,
              transition: { duration: 0.3 },
            }}
            whileDrag={{ scale: 1.03 }}
            transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
            className="flex aspect-[4/5] w-full max-w-xs cursor-grab flex-col items-center justify-center gap-4 rounded-[2rem] bg-white p-8 text-center shadow-2xl active:cursor-grabbing"
          >
            <div className="text-7xl">{current.emoji}</div>
            <div className="font-display text-3xl font-extrabold text-slate-900">{current.text}</div>
            <div
              className={`rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide ${
                current.difficulty === 'easy'
                  ? 'bg-emerald-100 text-emerald-700'
                  : current.difficulty === 'medium'
                    ? 'bg-amber-100 text-amber-700'
                    : 'bg-rose-100 text-rose-700'
              }`}
            >
              {difficultyLabel}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center gap-4 px-6 pb-8">
        <motion.button
          onClick={() => handleAction('passed')}
          whileTap={{ scale: 0.92 }}
          className="font-display flex-1 rounded-2xl bg-white/10 py-4 text-lg font-bold text-white active:bg-white/20"
        >
          ⏭️ {t('game.pass')}
        </motion.button>
        <motion.button
          onClick={() => handleAction('correct')}
          whileTap={{ scale: 0.92 }}
          className="font-display flex-1 rounded-2xl bg-gradient-to-r from-emerald-400 to-green-500 py-4 text-lg font-bold text-emerald-950 shadow-lg"
        >
          ✅ {t('game.gotIt')}
        </motion.button>
      </div>
      <p className="pb-4 text-center text-xs font-medium text-white/40">{t('game.hint')}</p>
    </motion.div>
  )
}
