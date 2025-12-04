import { ref } from 'vue'

export function useWindowManager() {
  const windows = ref([])
  const activeWindowId = ref(null)
  const zIndexCounter = ref(100)

  const openWindow = (id, title, component, props = {}) => {
    const existingWindow = windows.value.find((w) => w.id === id)
    if (existingWindow) {
      focusWindow(id)
      if (existingWindow.minimized) {
        existingWindow.minimized = false
      }
      // Update props if provided
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
    openWindow,
    closeWindow,
    focusWindow,
    minimizeWindow,
    maximizeWindow,
    updateWindowPosition
  }
}
