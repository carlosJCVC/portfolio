import { computed } from 'vue'
import { useSpeechSynthesis } from './useSpeechSynthesis'
import { useRecordedClips } from './useRecordedClips'

export function useCallVoice() {
  const speech = useSpeechSynthesis()
  const clips = useRecordedClips()

  const speak = async (text, { locale, clip } = {}) => {
    if (clip && clips.available.value && (await clips.play(clip))) return
    await speech.speak(text, locale)
  }

  const stop = () => {
    clips.stop()
    speech.stop()
  }

  const setMuted = (value) => {
    clips.setMuted(value)
    speech.setMuted(value)
  }

  return {
    speak,
    stop,
    setMuted,
    unlock: speech.unlock,
    detectRecordings: clips.detect,
    muted: speech.muted,
    speaking: computed(() => speech.speaking.value || clips.playing.value)
  }
}
