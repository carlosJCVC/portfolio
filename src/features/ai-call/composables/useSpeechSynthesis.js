import { onBeforeUnmount, ref } from 'vue'
import { splitSentences } from '../domain/speakableText'

const SPEECH_LOCALES = { es: 'es-ES', en: 'en-US' }
const estimateDurationMs = (text) => Math.min(12000, 900 + text.length * 60)
const MIN_AUDIBLE_RATIO = 0.15
const MALE_VOICE_NAMES = [
  'jorge', 'juan', 'diego', 'pablo', 'alvaro', 'álvaro', 'raul', 'raúl', 'enrique', 'andrés', 'andres',
  'carlos', 'daniel', 'aaron', 'alex', 'fred', 'tom', 'david', 'guy', 'mark', 'james', 'arthur', 'eddy', 'reed',
  'rocko', 'thomas', 'oliver', 'ryan', 'brian', 'christopher', 'eric', 'roger', 'male'
]
const FEMALE_HINTS = ['female', 'mujer', 'femenina']

const isMaleVoice = (voice) => {
  const words = voice.name.toLowerCase().split(/[^a-záéíóúñ]+/)
  return !FEMALE_HINTS.some((hint) => words.includes(hint)) && MALE_VOICE_NAMES.some((hint) => words.includes(hint))
}

export function useSpeechSynthesis() {
  const synth = typeof window !== 'undefined' ? window.speechSynthesis : undefined
  const supported = Boolean(synth && window.SpeechSynthesisUtterance)
  const speaking = ref(false)
  const muted = ref(false)
  let pending = null
  let voiceUnavailable = false

  const pickVoice = (lang) => {
    const voices = synth?.getVoices() ?? []
    const base = lang.slice(0, 2)
    const exact = voices.filter((voice) => voice.lang.replace('_', '-') === lang)
    const sameLanguage = voices.filter((voice) => voice.lang.toLowerCase().startsWith(base))
    return (
      exact.find(isMaleVoice) ??
      sameLanguage.find(isMaleVoice) ??
      exact.find((voice) => voice.localService) ??
      exact[0] ??
      sameLanguage[0] ??
      null
    )
  }

  const unlock = () => {
    if (!supported || voiceUnavailable) return
    const silence = new window.SpeechSynthesisUtterance(' ')
    silence.volume = 0
    synth.speak(silence)
  }

  const settle = () => {
    if (!pending) return
    const { resolve, timers } = pending
    timers.forEach(clearTimeout)
    pending = null
    speaking.value = false
    resolve()
  }

  const waitInSilence = (text) => pending.timers.push(setTimeout(settle, estimateDurationMs(text)))

  const speakSentences = (sentences, lang) => {
    const [sentence, ...rest] = sentences
    if (!pending) return
    if (!sentence) return settle()

    if (!supported || muted.value || voiceUnavailable) {
      waitInSilence(sentences.join(' '))
      return
    }

    const utterance = new window.SpeechSynthesisUtterance(sentence)
    utterance.lang = lang
    utterance.voice = pickVoice(lang)
    utterance.rate = 1.04
    const startedAt = performance.now()
    const isCurrent = () => pending?.utterance === utterance
    const next = () => isCurrent() && speakSentences(rest, lang)
    const continueSilently = () => {
      if (!isCurrent()) return
      voiceUnavailable = true
      pending.utterance = null
      waitInSilence(sentences.join(' '))
    }
    utterance.onend = () =>
      performance.now() - startedAt < estimateDurationMs(sentence) * MIN_AUDIBLE_RATIO ? continueSilently() : next()
    utterance.onerror = continueSilently
    pending.utterance = utterance
    pending.remaining = rest
    pending.timers.push(setTimeout(next, estimateDurationMs(sentence) * 2.5))
    synth.speak(utterance)
  }

  const speak = (text, locale = 'en') => {
    stop()
    return new Promise((resolve) => {
      pending = { resolve, timers: [], utterance: null, remaining: [] }
      speaking.value = true
      speakSentences(splitSentences(text), SPEECH_LOCALES[locale] ?? locale)
    })
  }

  function stop() {
    if (!pending) return
    pending.utterance = null
    synth?.cancel()
    settle()
  }

  const setMuted = (value) => {
    muted.value = value
    if (!value || !pending?.utterance) return
    const remainingText = [pending.utterance.text, ...pending.remaining].join(' ')
    pending.utterance = null
    synth.cancel()
    waitInSilence(remainingText)
  }

  onBeforeUnmount(stop)

  return { supported, speaking, muted, speak, stop, setMuted, unlock }
}
