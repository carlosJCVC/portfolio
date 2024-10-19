import { ref, watch } from 'vue'
import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', () => {
  const key = 'theme'
  const theme = ref(localStorage.getItem(key) || 'light')

  watch(theme, (newTheme) => {
    localStorage.setItem(key, newTheme)
    updateTheme(newTheme)
  })

  const updateTheme = (newTheme) => {
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }

  updateTheme(theme.value)

  return { theme, toggleTheme }
})
