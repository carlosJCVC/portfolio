import { onBeforeUnmount, ref } from 'vue'

const isAudioResponse = (response) => response.ok && (response.headers.get('content-type') ?? '').startsWith('audio/')

export function useRecordedClips() {
  const audio = typeof Audio !== 'undefined' ? new Audio() : null
  const available = ref(false)
  const playing = ref(false)
  let pending = null

  const detect = async (url) => {
    try {
      available.value = Boolean(audio) && isAudioResponse(await fetch(url, { method: 'HEAD' }))
    } catch {
      available.value = false
    }
    return available.value
  }

  const settle = (played) => {
    if (!pending) return
    const { resolve } = pending
    pending = null
    playing.value = false
    audio.onended = null
    audio.onerror = null
    resolve(played)
  }

  const play = (url) =>
    new Promise((resolve) => {
      stop()
      if (!audio || !available.value) return resolve(false)
      pending = { resolve }
      playing.value = true
      audio.onended = () => settle(true)
      audio.onerror = () => settle(false)
      audio.src = url
      audio.play().catch(() => settle(false))
    })

  function stop() {
    if (!pending) return
    audio.pause()
    settle(true)
  }

  const setMuted = (value) => {
    if (audio) audio.muted = value
  }

  onBeforeUnmount(stop)

  return { available, playing, detect, play, stop, setMuted }
}
