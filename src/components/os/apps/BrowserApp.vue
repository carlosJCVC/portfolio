<template>
  <div class="h-full flex flex-col bg-white text-gray-800 font-sans">
    <!-- Browser Toolbar -->
    <div class="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-2 gap-2">
      <div class="flex gap-1 text-gray-500">
        <button class="p-1 hover:bg-gray-200 rounded transition-colors" @click="goBack">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button class="p-1 hover:bg-gray-200 rounded transition-colors" @click="goForward">
          <i class="fas fa-arrow-right"></i>
        </button>
        <button class="p-1 hover:bg-gray-200 rounded transition-colors" @click="reload">
          <i class="fas fa-redo"></i>
        </button>
      </div>

      <!-- Address Bar -->
      <div class="flex-grow relative">
        <input
          v-model="urlInput"
          @keydown.enter="navigate"
          type="text"
          class="w-full bg-white border border-gray-300 rounded-full py-1 px-4 text-sm focus:outline-none focus:border-blue-500 transition-colors"
        />
      </div>

      <!-- Menu -->
      <button class="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500">
        <i class="fas fa-ellipsis-v"></i>
      </button>
    </div>

    <!-- Browser Content -->
    <div class="flex-grow relative bg-gray-50">
      <iframe
        v-if="currentUrl"
        :src="currentUrl"
        class="w-full h-full border-none"
        sandbox="allow-scripts allow-same-origin allow-forms"
      ></iframe>

      <!-- New Tab Page -->
      <div v-else class="h-full flex flex-col items-center justify-center p-8">
        <img src="@/assets/icons/logo-on-white-bg.svg" alt="Logo" class="w-24 h-24 mb-8 opacity-50" />
        
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl w-full">
          <button
            v-for="bookmark in bookmarks"
            :key="bookmark.name"
            class="flex flex-col items-center gap-3 p-4 rounded-lg hover:bg-white hover:shadow-md transition-all group"
            @click="navigateTo(bookmark.url)"
          >
            <div class="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
              <i :class="bookmark.icon" :style="{ color: bookmark.color }"></i>
            </div>
            <span class="text-sm font-medium text-gray-600 group-hover:text-gray-900">{{ bookmark.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const urlInput = ref('')
const currentUrl = ref(null)

const bookmarks = [
  { name: 'Portfolio', url: 'https://carlos-veizaga.com', icon: 'fas fa-briefcase', color: '#3b82f6' },
  { name: 'GitHub', url: 'https://github.com/carlosJCVC', icon: 'fab fa-github', color: '#1f2937' },
  { name: 'LinkedIn', url: 'https://linkedin.com/in/carlos-veizaga-c', icon: 'fab fa-linkedin', color: '#0a66c2' },
  { name: 'Google', url: 'https://www.google.com/webhp?igu=1', icon: 'fab fa-google', color: '#ea4335' }
]

const navigate = () => {
  let url = urlInput.value.trim()
  if (!url) return

  if (!url.startsWith('http')) {
    url = 'https://' + url
  }
  
  currentUrl.value = url
}

const navigateTo = (url) => {
  urlInput.value = url
  currentUrl.value = url
}

const goBack = () => {
  // Iframe history manipulation is tricky due to cross-origin, 
  // so we'll just reset to home for now or implement a simple history stack later.
  currentUrl.value = null
  urlInput.value = ''
}

const goForward = () => {
  // Placeholder
}

const reload = () => {
  const url = currentUrl.value
  currentUrl.value = null
  setTimeout(() => {
    currentUrl.value = url
  }, 100)
}
</script>
