import { ref } from 'vue'

export function useSystemPower() {
  const isBooting = ref(true)
  const isShuttingDown = ref(false)
  const isPoweredOff = ref(false)

  const setBootComplete = () => {
    isBooting.value = false
  }

  const initiateShutdown = () => {
    isShuttingDown.value = true
  }

  const completeShutdown = () => {
    isShuttingDown.value = false
    isPoweredOff.value = true
  }

  const turnOn = () => {
    isPoweredOff.value = false
    isBooting.value = true
  }

  return {
    isBooting,
    isShuttingDown,
    isPoweredOff,
    setBootComplete,
    initiateShutdown,
    completeShutdown,
    turnOn
  }
}
