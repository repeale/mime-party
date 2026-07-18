import { useCallback, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import HomeScreen from './components/HomeScreen'
import SetupScreen from './components/SetupScreen'
import CountdownScreen from './components/CountdownScreen'
import GameScreen from './components/GameScreen'
import ResultsScreen from './components/ResultsScreen'
import { useLocalStorage } from './hooks/useLocalStorage'
import type { DifficultyFilter, RoundResult } from './types'

type Screen = 'home' | 'setup' | 'countdown' | 'game' | 'results'

export default function App() {
  const [screen, setScreen] = useState<Screen>('home')
  const [categoryIds, setCategoryIds] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<DifficultyFilter>('mixed')
  const [duration, setDuration] = useState(60)
  const [results, setResults] = useState<RoundResult[]>([])
  const [soundOn, setSoundOn] = useLocalStorage('mime-sound-enabled', true)
  const [hapticsOn, setHapticsOn] = useLocalStorage('mime-haptics-enabled', true)
  const [bestScore, setBestScore] = useLocalStorage('mime-best-score', 0)

  const startSetup = useCallback(() => setScreen('setup'), [])
  const startGame = useCallback(() => setScreen('countdown'), [])
  const beginRound = useCallback(() => setScreen('game'), [])

  const finishGame = useCallback(
    (roundResults: RoundResult[]) => {
      setResults(roundResults)
      const score = roundResults.filter((r) => r.status === 'correct').length
      setBestScore((b) => Math.max(b, score))
      setScreen('results')
    },
    [setBestScore],
  )

  const playAgain = useCallback(() => setScreen('countdown'), [])
  const goHome = useCallback(() => setScreen('home'), [])
  const changeSetup = useCallback(() => setScreen('setup'), [])

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-950">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <HomeScreen
            key="home"
            onPlay={startSetup}
            soundOn={soundOn}
            onToggleSound={() => setSoundOn((s) => !s)}
            hapticsOn={hapticsOn}
            onToggleHaptics={() => setHapticsOn((h) => !h)}
            bestScore={bestScore}
          />
        )}
        {screen === 'setup' && (
          <SetupScreen
            key="setup"
            categoryIds={categoryIds}
            onCategoryIdsChange={setCategoryIds}
            difficulty={difficulty}
            onDifficultyChange={setDifficulty}
            duration={duration}
            onDurationChange={setDuration}
            onStart={startGame}
            onBack={goHome}
          />
        )}
        {screen === 'countdown' && <CountdownScreen key="countdown" soundOn={soundOn} onDone={beginRound} />}
        {screen === 'game' && (
          <GameScreen
            key="game"
            categoryIds={categoryIds}
            difficulty={difficulty}
            duration={duration}
            soundOn={soundOn}
            hapticsOn={hapticsOn}
            onFinish={finishGame}
            onExit={goHome}
          />
        )}
        {screen === 'results' && (
          <ResultsScreen
            key="results"
            results={results}
            bestScore={bestScore}
            onPlayAgain={playAgain}
            onChangeSetup={changeSetup}
            onHome={goHome}
          />
        )}
      </AnimatePresence>
    </div>
  )
}
