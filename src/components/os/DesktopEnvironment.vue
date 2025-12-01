<template>
  <div
    class="h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center relative select-none"
  >
    <!-- Boot Screen Overlay -->
    <Transition name="fade">
      <BootScreen v-if="store.isBooting" />
    </Transition>

    <!-- Desktop Icons Area -->
    <div
      class="absolute inset-0 p-8 grid grid-flow-col grid-rows-6 gap-8 content-start items-start w-max"
    >
      <div
        v-for="app in apps"
        :key="app.id"
        class="flex flex-col items-center gap-2 group cursor-pointer w-24"
        @dblclick="openApp(app)"
      >
        <div
          class="w-16 h-16 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-3xl text-white shadow-lg group-hover:bg-white/20 transition-all duration-300 border border-white/10"
        >
          <i :class="app.icon"></i>
        </div>
        <span class="text-white text-sm font-medium drop-shadow-md bg-black/20 px-2 rounded-full">{{
          app.title
        }}</span>
      </div>
    </div>

    <!-- Window Manager -->
    <WindowFrame v-for="window in store.windows" :key="window.id" :window="window" />

    <!-- Taskbar -->
    <div
      class="absolute bottom-0 left-0 right-0 h-12 bg-[#1e1e1e]/90 backdrop-blur-xl border-t border-white/10 flex items-center px-4 gap-4 z-[9000]"
    >
      <button
        class="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
      >
        <i class="fab fa-windows text-white text-lg"></i>
      </button>

      <div class="h-8 w-[1px] bg-white/10 mx-2"></div>

      <!-- Active Windows -->
      <div class="flex gap-2">
        <button
          v-for="window in store.windows"
          :key="window.id"
          class="px-4 h-8 rounded-md flex items-center gap-2 transition-all"
          :class="
            store.activeWindowId === window.id ? 'bg-white/20' : 'bg-white/5 hover:bg-white/10'
          "
          @click="store.focusWindow(window.id)"
        >
          <span class="text-white text-xs truncate max-w-[100px]">{{ window.title }}</span>
        </button>
      </div>

      <div class="flex-grow"></div>

      <!-- Clock -->
      <div class="text-white text-xs font-mono">
        {{ currentTime }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useOSStore } from '@/store/useOSStore'
import BootScreen from './BootScreen.vue'
import WindowFrame from './WindowFrame.vue'

// Import App Components
import TerminalApp from './apps/TerminalApp.vue'
import ExplorerApp from './apps/ExplorerApp.vue'
import MessengerApp from './apps/MessengerApp.vue'

const store = useOSStore()
const currentTime = ref('')

const apps = [
  { id: 'terminal', title: 'Terminal', icon: 'fas fa-terminal', component: TerminalApp },
  { id: 'projects', title: 'Projects', icon: 'fas fa-folder-open', component: ExplorerApp },
  { id: 'skills', title: 'Skills', icon: 'fas fa-code', component: TerminalApp }, // Reusing Terminal for now
  { id: 'contact', title: 'Contact', icon: 'fas fa-envelope', component: MessengerApp },
  { id: 'browser', title: 'Chrome', icon: 'fab fa-chrome', component: null }
]

const openApp = (app) => {
  if (app.component) {
    store.openWindow(app.id, app.title, app.component)
  } else {
    alert('App under construction!')
  }
}

const updateTime = () => {
  const now = new Date()
  currentTime.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

let timeInterval
onMounted(() => {
  updateTime()
  timeInterval = setInterval(updateTime, 1000)
})

onUnmounted(() => {
  clearInterval(timeInterval)
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
