import { ref } from 'vue'

export function useSystemPower() {
  const isBooting = ref(true)
  const isShuttingDown = ref(false)
  const isPoweredOff = ref(false)
  const isLoggedIn = ref(false)

  const setBootComplete = () => {
    isBooting.value = false
    // Note: We don't set isLoggedIn here anymore, we wait for user action
  }

  const login = () => {
    isLoggedIn.value = true
  }

  const initiateShutdown = () => {
    isShuttingDown.value = true
    isLoggedIn.value = false
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
    isLoggedIn,
    setBootComplete,
    login,
    initiateShutdown,
    completeShutdown,
    turnOn
  }
}
