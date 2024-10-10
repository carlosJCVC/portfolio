import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'

import i18n from './i18n'

import App from './App.vue'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(Toast)
app.use(i18n)
app.mount('#app')
