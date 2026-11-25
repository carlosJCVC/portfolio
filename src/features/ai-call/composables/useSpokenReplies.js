import { watch } from 'vue'
import { toSpeakableText } from '../domain/speakableText'

const replyTextOf = (message) =>
  message.parts
    .filter((part) => part.type === 'text')
    .map((part) => part.text)
    .join('\n')

export function useSpokenReplies({ messages, voice, locale, enabled }) {
  watch(
    () => {
      const last = messages.value.at(-1)
      return last?.role === 'assistant' ? `${last.id}:${last.status}` : ''
    },
    (key) => {
      const last = messages.value.at(-1)
      if (!key.endsWith(':done') || !enabled.value) return
      const text = toSpeakableText(replyTextOf(last))
      if (text) voice.speak(text, { locale: locale.value })
    }
  )
}
