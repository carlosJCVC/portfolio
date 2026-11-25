import { computed, onBeforeUnmount, ref } from 'vue'

const pad = (value) => String(value).padStart(2, '0')

export function useCallTimer() {
  const seconds = ref(0)
  let interval = null

  const start = () => {
    stop()
    seconds.value = 0
    interval = setInterval(() => seconds.value++, 1000)
  }

  function stop() {
    clearInterval(interval)
    interval = null
  }

  const formatted = computed(() => `${pad(Math.floor(seconds.value / 60))}:${pad(seconds.value % 60)}`)

  onBeforeUnmount(stop)

  return { seconds, formatted, start, stop }
}
