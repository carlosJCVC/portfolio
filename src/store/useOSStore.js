import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOSStore = defineStore('os', () => {
  const windows = ref([])
  const activeWindowId = ref(null)
  const zIndexCounter = ref(100)
  const isBooting = ref(true)
  const isShuttingDown = ref(false)
  const isPoweredOff = ref(false)
  const wallpaper = ref(
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  )
  const theme = ref('dark') // 'dark' | 'light'
  
  // System Dialog State
  const isDialogOpen = ref(false)
  const dialogOptions = ref({
    title: '',
    message: '',
    type: 'info', // 'info', 'error', 'warning'
    onConfirm: null,
    onCancel: null
  })

  const openWindow = (id, title, component, props = {}) => {
    const existingWindow = windows.value.find((w) => w.id === id)
    if (existingWindow) {
      focusWindow(id)
      if (existingWindow.minimized) {
        existingWindow.minimized = false
      }
      // Update props if provided (e.g. opening a new file in existing VS Code)
      if (Object.keys(props).length > 0) {
        existingWindow.props = { ...existingWindow.props, ...props }
      }
      return
    }

    windows.value.push({
      id,
      title,
      component,
      props,
      minimized: false,
      maximized: false,
      zIndex: ++zIndexCounter.value,
      x: 50 + windows.value.length * 20,
      y: 50 + windows.value.length * 20,
      width: 800,
      height: 600
    })
    activeWindowId.value = id
  }

  const closeWindow = (id) => {
    windows.value = windows.value.filter((w) => w.id !== id)
    if (activeWindowId.value === id) {
      const remaining = windows.value
      if (remaining.length > 0) {
        // Focus the window with the highest zIndex
        const next = remaining.reduce((prev, current) =>
          prev.zIndex > current.zIndex ? prev : current
        )
        activeWindowId.value = next.id
      } else {
        activeWindowId.value = null
      }
    }
  }

  const focusWindow = (id) => {
    const window = windows.value.find((w) => w.id === id)
    if (window) {
      window.zIndex = ++zIndexCounter.value
      activeWindowId.value = id
    }
  }

  const minimizeWindow = (id) => {
    const window = windows.value.find((w) => w.id === id)
    if (window) {
      window.minimized = true
      activeWindowId.value = null
    }
  }

  const maximizeWindow = (id) => {
    const window = windows.value.find((w) => w.id === id)
    if (window) {
      window.maximized = !window.maximized
      focusWindow(id)
    }
  }

  const setBootComplete = () => {
    isBooting.value = false
  }

  const initiateShutdown = () => {
    isShuttingDown.value = true
    // The ShutdownScreen component will handle the timing and call completeShutdown
  }

  const completeShutdown = () => {
    isShuttingDown.value = false
    isPoweredOff.value = true
    windows.value = [] // Clear windows on shutdown
  }

  const turnOn = () => {
    isPoweredOff.value = false
    isBooting.value = true
  }

  const updateWindowPosition = (id, x, y) => {
    const window = windows.value.find((w) => w.id === id)
    if (window) {
      window.x = x
      window.y = y
    }
  }

  const openDialog = (options) => {
    dialogOptions.value = {
      title: options.title || 'System Alert',
      message: options.message || '',
      type: options.type || 'info',
      onConfirm: options.onConfirm || null,
      onCancel: options.onCancel || null
    }
    isDialogOpen.value = true
  }

  const closeDialog = () => {
    isDialogOpen.value = false
    dialogOptions.value = {
      title: '',
      message: '',
      type: 'info',
      onConfirm: null,
      onCancel: null
    }
  }

  return {
    windows,
    activeWindowId,
    isBooting,
    isShuttingDown,
    isPoweredOff,
    wallpaper,
    theme,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    setBootComplete,
    initiateShutdown,
    completeShutdown,
    turnOn,
    updateWindowPosition,
    isDialogOpen,
    dialogOptions,
    openDialog,
    closeDialog
  }
})
