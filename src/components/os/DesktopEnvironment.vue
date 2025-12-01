<template>
  <div
    class="h-screen w-screen overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center relative select-none"
    @click="handleDesktopClick"
  >
    <!-- Mobile Warning Overlay -->
    <div
      class="md:hidden fixed inset-0 z-[10000] bg-black flex flex-col items-center justify-center p-8 text-center text-white"
    >
      <i class="fas fa-desktop text-4xl mb-4 text-blue-500"></i>
      <h2 class="text-xl font-bold mb-2">Desktop Experience Required</h2>
      <p class="text-gray-400 text-sm">
        DevOS is optimized for larger screens. Please visit on a desktop or tablet for the full
        experience.
      </p>
    </div>

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
        <span class="text-white text-sm font-medium drop-shadow-md bg-black/20 px-2 rounded-full">
          {{ app.title }}
        </span>
      </div>
    </div>

    <!-- Window Manager -->
    <TransitionGroup name="window">
      <WindowFrame v-for="window in store.windows" :key="window.id" :window="window" />
    </TransitionGroup>

    <!-- Start Menu -->
    <StartMenu
      :is-open="isStartMenuOpen"
      :apps="apps"
      @close="isStartMenuOpen = false"
      @launch="openApp"
    />

    <!-- Taskbar -->
    <TaskBar
      :apps="apps"
      :is-start-menu-open="isStartMenuOpen"
      @toggle-start="toggleStartMenu"
      @launch="openApp"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOSStore } from '@/store/useOSStore'
import BootScreen from './BootScreen.vue'
import WindowFrame from './WindowFrame.vue'
import TaskBar from './TaskBar.vue'
import StartMenu from './StartMenu.vue'

// Import App Components
import TerminalApp from './apps/TerminalApp.vue'
import ExplorerApp from './apps/ExplorerApp.vue'
import MessengerApp from './apps/MessengerApp.vue'

const store = useOSStore()
const isStartMenuOpen = ref(false)

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
    isStartMenuOpen.value = false
  } else {
    alert('App under construction!')
  }
}

const toggleStartMenu = () => {
  isStartMenuOpen.value = !isStartMenuOpen.value
}

// Close Start Menu when clicking outside (simple version)
const handleDesktopClick = (e) => {
  if (
    isStartMenuOpen.value &&
    !e.target.closest('.absolute.bottom-0') &&
    !e.target.closest('.absolute.bottom-14')
  ) {
    isStartMenuOpen.value = false
  }
}
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

/* Window Transitions */
.window-enter-active,
.window-leave-active {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.window-enter-from,
.window-leave-to {
  opacity: 0;
  transform: scale(0.95) translateY(10px);
}
</style>
