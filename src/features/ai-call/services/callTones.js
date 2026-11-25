let context = null

const audioContext = () => {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null
  context ??= new AudioContextClass()
  return context
}

const playSequence = (notes) => {
  const ctx = audioContext()
  if (!ctx) return
  notes.forEach(({ frequency, start, duration }) => {
    const oscillator = ctx.createOscillator()
    const gain = ctx.createGain()
    oscillator.type = 'sine'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + start)
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + start + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + start + duration)
    oscillator.connect(gain).connect(ctx.destination)
    oscillator.start(ctx.currentTime + start)
    oscillator.stop(ctx.currentTime + start + duration + 0.05)
  })
}

export const playConnectTone = () =>
  playSequence([
    { frequency: 660, start: 0, duration: 0.12 },
    { frequency: 880, start: 0.14, duration: 0.18 }
  ])

export const playHangUpTone = () =>
  playSequence([
    { frequency: 480, start: 0, duration: 0.15 },
    { frequency: 360, start: 0.18, duration: 0.25 }
  ])
