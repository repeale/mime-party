import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useSound } from '../hooks/useSound'
import { useLocale } from '../i18n/LocaleContext'

interface Props {
  soundOn: boolean
  onDone: () => void
}

export default function CountdownScreen({ soundOn, onDone }: Props) {
  const [step, setStep] = useState(0)
  const play = useSound(soundOn)
  const { t } = useLocale()
  const steps = [t('countdown.ready'), 3, 2, 1, t('countdown.go')]

  useEffect(() => {
    if (step === 0) {
      const timer = setTimeout(() => setStep(1), 700)
      return () => clearTimeout(timer)
    }
    if (step <= 3) {
      play('countdown')
      const timer = setTimeout(() => setStep((s) => s + 1), 650)
      return () => clearTimeout(timer)
    }
    if (step === 4) {
      play('go')
      const timer = setTimeout(onDone, 500)
      return () => clearTimeout(timer)
    }
  }, [step, onDone, play])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-indigo-800 via-purple-800 to-fuchsia-700 px-6 text-center text-white"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 1.4, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.5, duration: 0.4 }}
          className={`font-display max-w-full font-extrabold drop-shadow-lg ${
            step === 0 ? 'text-4xl' : 'text-8xl'
          }`}
        >
          {steps[step]}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
