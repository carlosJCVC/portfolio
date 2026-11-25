import { computed, ref } from 'vue'
import { playConnectTone, playHangUpTone } from '../services/callTones'

export const CALL_STATES = Object.freeze({
  RINGING: 'ringing',
  PITCH: 'pitch',
  CONVERSATION: 'conversation',
  ENDED: 'ended',
  MISSED: 'missed'
})

export function useCallSession({ scenes, voice, timer, locale }) {
  const state = ref(CALL_STATES.RINGING)
  const sceneIndex = ref(0)
  const caption = ref('')
  let runId = 0

  const currentScene = computed(() => scenes.value[sceneIndex.value])
  const isLive = computed(() => [CALL_STATES.PITCH, CALL_STATES.CONVERSATION].includes(state.value))

  const say = async ({ line, audio }) => {
    caption.value = line
    await voice.speak(line, { locale: locale.value, clip: audio })
  }

  const runPitch = async () => {
    const id = ++runId
    for (let index = 0; index < scenes.value.length; index++) {
      sceneIndex.value = index
      await say(scenes.value[index])
      if (id !== runId) return
    }
    state.value = CALL_STATES.CONVERSATION
  }

  const answer = () => {
    voice.unlock()
    playConnectTone()
    timer.start()
    state.value = CALL_STATES.PITCH
    runPitch()
  }

  const skipPitch = () => {
    runId++
    voice.stop()
    sceneIndex.value = scenes.value.length - 1
    caption.value = scenes.value.at(-1).line
    state.value = CALL_STATES.CONVERSATION
  }

  const hangUp = () => {
    runId++
    voice.stop()
    timer.stop()
    playHangUpTone()
    state.value = CALL_STATES.ENDED
  }

  const decline = () => {
    state.value = CALL_STATES.MISSED
  }

  const callBack = ({ skipIntro = false } = {}) => {
    if (!skipIntro) return answer()
    playConnectTone()
    timer.start()
    skipPitch()
  }

  return { state, isLive, sceneIndex, currentScene, caption, say, answer, decline, skipPitch, hangUp, callBack }
}
