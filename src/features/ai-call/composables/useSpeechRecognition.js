import { onBeforeUnmount, ref } from 'vue'

const RECOGNITION_LOCALES = { es: 'es-ES', en: 'en-US' }

export function useSpeechRecognition() {
  const Recognition = typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition)
  const supported = Boolean(Recognition)
  const listening = ref(false)
  const transcript = ref('')
  let recognition = null

  const listen = (locale = 'en') =>
    new Promise((resolve) => {
      if (!supported) return resolve('')
      stop()
      transcript.value = ''
      recognition = new Recognition()
      recognition.lang = RECOGNITION_LOCALES[locale] ?? locale
      recognition.interimResults = true
      recognition.continuous = false
      recognition.maxAlternatives = 1

      recognition.onresult = (event) => {
        transcript.value = Array.from(event.results)
          .map((result) => result[0].transcript)
          .join(' ')
          .trim()
      }
      recognition.onerror = () => (transcript.value = '')
      recognition.onend = () => {
        listening.value = false
        recognition = null
        resolve(transcript.value)
      }

      listening.value = true
      recognition.start()
    })

  function stop() {
    recognition?.stop()
  }

  onBeforeUnmount(() => recognition?.abort())

  return { supported, listening, transcript, listen, stop }
}
