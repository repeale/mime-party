import { motion } from 'framer-motion'
import { useLocale } from '../i18n/LocaleContext'

interface Props {
  onPlay: () => void
  soundOn: boolean
  onToggleSound: () => void
  hapticsOn: boolean
  onToggleHaptics: () => void
  bestScore: number
}

export default function HomeScreen({ onPlay, soundOn, onToggleSound, hapticsOn, onToggleHaptics, bestScore }: Props) {
  const { locale, setLocale, t } = useLocale()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="safe-top safe-bottom absolute inset-0 flex flex-col items-center justify-between overflow-hidden bg-gradient-to-br from-fuchsia-600 via-purple-700 to-indigo-800 px-6 py-8 text-white"
    >
      <div className="pointer-events-none absolute -left-16 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-10 top-1/3 h-40 w-40 rounded-full bg-pink-400/20 blur-2xl" />

      <div className="flex w-full items-center justify-between">
        <div className="rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold backdrop-blur">
          🏆 {t('home.best')}: {bestScore}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setLocale(locale === 'en' ? 'it' : 'en')}
            aria-label={t('home.toggleLanguage')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-lg backdrop-blur active:scale-90"
          >
            {locale === 'en' ? '🇬🇧' : '🇮🇹'}
          </button>
          <button
            onClick={onToggleHaptics}
            aria-label={t('home.toggleVibration')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-lg backdrop-blur active:scale-90"
          >
            {hapticsOn ? '📳' : '🚫'}
          </button>
          <button
            onClick={onToggleSound}
            aria-label={t('home.toggleSound')}
            className="flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-lg backdrop-blur active:scale-90"
          >
            {soundOn ? '🔊' : '🔇'}
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center text-center">
        <motion.div
          className="animate-float text-8xl drop-shadow-lg"
          initial={{ scale: 0.7, rotate: -8, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
        >
          🎭
        </motion.div>
        <h1 className="font-display mt-4 text-5xl font-extrabold tracking-tight drop-shadow-md">Mime Party</h1>
        <p className="mt-3 max-w-xs text-lg font-semibold text-white/85">{t('home.subtitle')}</p>
      </div>

      <div className="flex w-full max-w-xs items-center justify-between rounded-2xl bg-white/10 px-4 py-3 backdrop-blur">
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-2xl">🎯</span>
          <span className="text-[11px] font-bold text-white/80">{t('home.step1')}</span>
        </div>
        <span aria-hidden className="text-white/30">→</span>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-2xl">🎭</span>
          <span className="text-[11px] font-bold text-white/80">{t('home.step2')}</span>
        </div>
        <span aria-hidden className="text-white/30">→</span>
        <div className="flex flex-col items-center gap-1 text-center">
          <span className="text-2xl">🎉</span>
          <span className="text-[11px] font-bold text-white/80">{t('home.step3')}</span>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <motion.button
          onClick={onPlay}
          whileTap={{ scale: 0.94 }}
          className="font-display w-full max-w-sm rounded-3xl bg-gradient-to-r from-yellow-300 to-amber-400 py-5 text-2xl font-extrabold text-purple-900 shadow-[0_8px_0_0_rgba(180,120,0,0.5)] active:shadow-[0_2px_0_0_rgba(180,120,0,0.5)] active:translate-y-1"
        >
          ▶ {t('home.play')}
        </motion.button>
        <p className="text-sm font-medium text-white/60">{t('home.footer')}</p>
      </div>
    </motion.div>
  )
}
