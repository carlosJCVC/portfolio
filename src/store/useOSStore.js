import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useWindowManager } from '@/composables/useWindowManager'
import { useSystemPower } from '@/composables/useSystemPower'
import { useSystemDialog } from '@/composables/useSystemDialog'

export const useOSStore = defineStore('os', () => {
  // 1. Window Management Logic
  const {
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition
  } = useWindowManager()

  // 2. System Power Logic
  const {
    isBooting,
    isShuttingDown,
    isPoweredOff,
    isLoggedIn,
    setBootComplete,
    login,
    initiateShutdown,
    completeShutdown: powerCompleteShutdown,
    turnOn
  } = useSystemPower()

  // 3. System Dialog Logic
  const {
    isDialogOpen,
    dialogOptions,
    openDialog,
    closeDialog
  } = useSystemDialog()

  // 4. Global OS State (Wallpaper, Theme)
  const wallpaper = ref(
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  )
  const theme = ref('dark') // 'dark' | 'light'

  // Custom Shutdown Logic to clear windows
  const completeShutdown = () => {
    powerCompleteShutdown()
    windows.value = [] // Clear windows on shutdown
  }

  return {
    // Windows
    windows,
    activeWindowId,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition,

    // Power
    isBooting,
    isShuttingDown,
    isPoweredOff,
    isLoggedIn,
    setBootComplete,
    login,
    initiateShutdown,
    completeShutdown,
    turnOn,

    // Dialogs
    isDialogOpen,
    dialogOptions,
    openDialog,
    closeDialog,

    // Global
    wallpaper,
    theme
  }
})
