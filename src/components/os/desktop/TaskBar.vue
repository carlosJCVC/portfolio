<template>
  <div
    class="absolute bottom-0 left-0 right-0 h-12 bg-[#1e1e1e]/90 backdrop-blur-xl border-t border-white/10 flex items-center px-4 gap-4 z-[9000] select-none"
  >
    <!-- Start Button -->
    <button
      class="w-8 h-8 rounded-md hover:bg-white/10 flex items-center justify-center transition-colors relative"
      :class="{ 'bg-white/10': isStartMenuOpen }"
      @click.stop="$emit('toggleStart')"
    >
      <i class="fab fa-windows text-blue-400 text-xl drop-shadow-lg"></i>
    </button>

    <div class="h-6 w-[1px] bg-white/10 mx-1"></div>

    <!-- Pinned / Active Apps -->
    <div class="flex gap-1">
      <button
        v-for="app in apps"
        :key="app.id"
        class="w-10 h-10 rounded-md flex items-center justify-center transition-all relative group"
        :class="isAppActive(app.id) ? 'bg-white/10' : 'hover:bg-white/5'"
        @click="handleAppClick(app)"
      >
        <i
          :class="[app.icon, 'text-lg text-gray-300 group-hover:text-white transition-colors']"
        ></i>
        <!-- Active Indicator -->
        <div
          v-if="isAppOpen(app.id)"
          class="absolute bottom-0 w-3 h-1 bg-blue-400 rounded-t-full"
        ></div>
        <!-- Hover Tooltip -->
        <div
          class="absolute -top-10 bg-[#252526] text-white text-xs px-2 py-1 rounded border border-gray-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap"
        >
          {{ app.title }}
        </div>
      </button>
    </div>

    <div class="flex-grow"></div>

    <!-- System Tray -->
    <div class="flex items-center gap-3 text-white/80 text-xs">
      <div 
        class="hover:bg-white/10 p-1 rounded cursor-pointer transition-colors"
        @click="toggleWifi"
        :title="isWifiOn ? 'Connected to DevNet' : 'Disconnected'"
      >
        <i class="fas" :class="isWifiOn ? 'fa-wifi' : 'fa-wifi-slash text-gray-500'"></i>
      </div>
      <div 
        class="hover:bg-white/10 p-1 rounded cursor-pointer transition-colors"
        @click="toggleSound"
        :title="isMuted ? 'Muted' : 'Volume: 100%'"
      >
        <i class="fas" :class="isMuted ? 'fa-volume-mute text-gray-500' : 'fa-volume-up'"></i>
      </div>
      <div
        class="flex flex-col items-end leading-none hover:bg-white/10 px-2 py-1 rounded cursor-pointer select-none"
        :title="date"
      >
        <span class="font-medium">{{ time }}</span>
        <span class="text-[10px] text-gray-400">{{ date }}</span>
      </div>
      <div class="w-1 h-12 border-l border-white/10 ml-2"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useOSStore } from '@/store/useOSStore'

defineProps({
  apps: Array,
  isStartMenuOpen: Boolean
})

const emit = defineEmits(['toggleStart', 'launch'])
const store = useOSStore()

const time = ref('')
const date = ref('')
const isWifiOn = ref(true)
const isMuted = ref(false)

const isAppOpen = (id) => {
  return store.windows.some((w) => w.id === id)
}

const isAppActive = (id) => {
  return store.activeWindowId === id
}

const handleAppClick = (app) => {
  if (isAppOpen(app.id)) {
    if (store.activeWindowId === app.id) {
      store.minimizeWindow(app.id)
    } else {
      store.focusWindow(app.id)
    }
  } else {
    emit('launch', app)
  }
}

const toggleWifi = () => {
  isWifiOn.value = !isWifiOn.value
}

const toggleSound = () => {
  isMuted.value = !isMuted.value
}

const updateTime = () => {
  const now = new Date()
  time.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  date.value = now.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
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
