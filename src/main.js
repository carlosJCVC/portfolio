import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import i18n from './i18n'

import App from './App.vue'

import router from './router'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Toast)
app.use(i18n)
app.mount('#app')

// Console Easter Egg for Developers
console.log(
  '%c👋 Hello there, fellow developer!',
  'color: #6366f1; font-size: 20px; font-weight: bold; padding: 10px;'
)
console.log(
  '%cLooking for the source code? Check out my GitHub: https://github.com/carlosJCVC',
  'color: #10b981; font-size: 14px; padding: 5px;'
)
console.log(
  '%cBuilt with Vue 3 + Vite + Tailwind CSS 🚀',
  'color: #f59e0b; font-size: 12px; font-style: italic; padding: 5px;'
)
