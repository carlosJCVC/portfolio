<template>
  <div class="h-full bg-[#1e1e1e] text-gray-200 font-sans flex flex-col">
    <div class="p-6 border-b border-gray-700">
      <h2 class="text-2xl font-bold mb-2">System Settings</h2>
      <p class="text-gray-400 text-sm">Customize your DevOS experience.</p>
    </div>

    <div class="flex-grow flex overflow-hidden">
      <!-- Sidebar -->
      <div class="w-48 bg-[#252526] border-r border-gray-700 p-2 space-y-1">
        <button
          v-for="tab in tabs"
          :key="tab.id"
          class="w-full text-left px-4 py-2 rounded transition-colors flex items-center gap-3"
          :class="
            activeTab === tab.id
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:bg-white/5 hover:text-white'
          "
          @click="activeTab = tab.id"
        >
          <i :class="tab.icon"></i>
          <span>{{ tab.label }}</span>
        </button>
      </div>

      <!-- Content -->
      <div class="flex-grow p-8 overflow-auto">
        <!-- Appearance Tab -->
        <div v-if="activeTab === 'appearance'" class="space-y-8">
          <section>
            <h3 class="text-lg font-bold mb-4">Desktop Wallpaper</h3>
            <div class="grid grid-cols-3 gap-4">
              <button
                v-for="(wp, index) in wallpapers"
                :key="index"
                class="aspect-video rounded-lg overflow-hidden border-2 transition-all relative group"
                :class="
                  store.wallpaper === wp.url
                    ? 'border-blue-500 ring-2 ring-blue-500/50'
                    : 'border-transparent hover:border-gray-500'
                "
                @click="store.wallpaper = wp.url"
              >
                <img :src="wp.url" class="w-full h-full object-cover" />
                <div
                  class="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <span class="text-white text-xs font-bold">{{ wp.name }}</span>
                </div>
              </button>
            </div>
          </section>

          <section>
            <h3 class="text-lg font-bold mb-4">Theme</h3>
            <div class="flex gap-4">
              <button
                class="px-6 py-3 rounded-lg border-2 flex items-center gap-2 transition-all"
                :class="
                  store.theme === 'dark'
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                    : 'border-gray-700 hover:border-gray-500'
                "
                @click="store.theme = 'dark'"
              >
                <i class="fas fa-moon"></i>
                <span>Dark Mode</span>
              </button>
              <button
                class="px-6 py-3 rounded-lg border-2 flex items-center gap-2 transition-all opacity-50 cursor-not-allowed"
                title="Coming soon"
              >
                <i class="fas fa-sun"></i>
                <span>Light Mode</span>
              </button>
            </div>
          </section>
        </div>

        <!-- About Tab -->
        <div v-if="activeTab === 'about'" class="space-y-6">
          <div class="flex items-center gap-6">
            <div
              class="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-4xl text-white font-bold shadow-xl"
            >
              OS
            </div>
            <div>
              <h3 class="text-3xl font-bold">DevOS</h3>
              <p class="text-gray-400">Version 1.0.0 (Stable)</p>
            </div>
          </div>

          <div class="bg-[#252526] rounded-lg p-6 space-y-4 border border-gray-700">
            <div class="flex justify-between border-b border-gray-700 pb-2">
              <span class="text-gray-400">Kernel</span>
              <span class="font-mono text-green-400">Vue 3.4.0</span>
            </div>
            <div class="flex justify-between border-b border-gray-700 pb-2">
              <span class="text-gray-400">Build System</span>
              <span class="font-mono text-blue-400">Vite 5.0</span>
            </div>
            <div class="flex justify-between border-b border-gray-700 pb-2">
              <span class="text-gray-400">State Management</span>
              <span class="font-mono text-yellow-400">Pinia</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-400">Styling</span>
              <span class="font-mono text-cyan-400">Tailwind CSS</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useOSStore } from '@/store/useOSStore'

const store = useOSStore()
const activeTab = ref('appearance')

const tabs = [
  { id: 'appearance', label: 'Appearance', icon: 'fas fa-paint-brush' },
  { id: 'about', label: 'About System', icon: 'fas fa-info-circle' }
]

const wallpapers = [
  {
    name: 'Cyber Earth',
    url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop'
  },
  {
    name: 'Deep Space',
    url: 'https://images.unsplash.com/photo-1534796636912-3b95b3ab5986?q=80&w=2072&auto=format&fit=crop'
  },
  {
    name: 'Neon City',
    url: 'https://images.unsplash.com/photo-1515630278258-407f66498911?q=80&w=1974&auto=format&fit=crop'
  },
  {
    name: 'Minimal Dark',
    url: 'https://images.unsplash.com/photo-1483729558449-99ef09a8c325?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Code Matrix',
    url: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop'
  },
  {
    name: 'Abstract Flow',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1964&auto=format&fit=crop'
  }
]
</script>
