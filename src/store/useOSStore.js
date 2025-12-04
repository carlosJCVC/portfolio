import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useOSStore = defineStore('os', () => {
  const windows = ref([])
  const activeWindowId = ref(null)
  const zIndexCounter = ref(100)
  const isBooting = ref(true)
  const wallpaper = ref(
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  )
  const theme = ref('dark') // 'dark' | 'light'

  const openWindow = (id, title, component, props = {}) => {
    const existingWindow = windows.value.find((w) => w.id === id)
    if (existingWindow) {
      focusWindow(id)
      if (existingWindow.minimized) {
        existingWindow.minimized = false
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

  const updateWindowPosition = (id, x, y) => {
    const window = windows.value.find((w) => w.id === id)
    if (window) {
      window.x = x
      window.y = y
    }
  }

  return {
    windows,
    activeWindowId,
    isBooting,
    wallpaper,
    theme,
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    setBootComplete,
    updateWindowPosition
  }
})
