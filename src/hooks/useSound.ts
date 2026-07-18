import { useCallback, useRef } from 'react'

type SoundName = 'correct' | 'pass' | 'tick' | 'countdown' | 'go' | 'timeup'

let sharedCtx: AudioContext | null = null

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null
  const AC = window.AudioContext || (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
  if (!AC) return null
  if (!sharedCtx) sharedCtx = new AC()
  return sharedCtx
}

function tone(ctx: AudioContext, freq: number, start: number, duration: number, type: OscillatorType, gainPeak = 0.2) {
  const osc = ctx.createOscillator()
  const gain = ctx.createGain()
  osc.type = type
  osc.frequency.setValueAtTime(freq, start)
  gain.gain.setValueAtTime(0, start)
  gain.gain.linearRampToValueAtTime(gainPeak, start + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, start + duration)
  osc.connect(gain)
  gain.connect(ctx.destination)
  osc.start(start)
  osc.stop(start + duration)
}

export function useSound(enabled: boolean) {
  const enabledRef = useRef(enabled)
  enabledRef.current = enabled

  const play = useCallback((name: SoundName) => {
    if (!enabledRef.current) return
    const ctx = getCtx()
    if (!ctx) return
    if (ctx.state === 'suspended') void ctx.resume()
    const now = ctx.currentTime

    switch (name) {
      case 'correct':
        tone(ctx, 523.25, now, 0.12, 'triangle')
        tone(ctx, 659.25, now + 0.09, 0.14, 'triangle')
        tone(ctx, 783.99, now + 0.18, 0.2, 'triangle')
        break
      case 'pass':
        tone(ctx, 220, now, 0.16, 'sine', 0.15)
        break
      case 'tick':
        tone(ctx, 880, now, 0.05, 'square', 0.06)
        break
      case 'countdown':
        tone(ctx, 440, now, 0.15, 'square', 0.15)
        break
      case 'go':
        tone(ctx, 880, now, 0.3, 'triangle', 0.2)
        break
      case 'timeup':
        tone(ctx, 330, now, 0.2, 'sawtooth', 0.15)
        tone(ctx, 220, now + 0.18, 0.35, 'sawtooth', 0.15)
        break
    }
  }, [])

  return play
}
