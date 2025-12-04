<template>
  <div class="h-full flex flex-col bg-white text-gray-800 font-sans">
    <!-- Browser Toolbar -->
    <div class="h-10 bg-gray-100 border-b border-gray-300 flex items-center px-2 gap-2">
      <div class="flex gap-1 text-gray-500">
        <button class="p-1 hover:bg-gray-200 rounded transition-colors" @click="goHome" title="Home">
          <i class="fas fa-home"></i>
        </button>
        <button class="p-1 hover:bg-gray-200 rounded transition-colors" @click="reload" title="Reload">
          <i class="fas fa-redo"></i>
        </button>
      </div>

      <!-- Address Bar -->
      <div class="flex-grow relative">
        <div
          class="w-full bg-white border border-gray-300 rounded-full py-1 px-4 text-sm text-gray-600 flex items-center"
        >
          <i class="fas fa-lock text-xs text-green-500 mr-2"></i>
          <span>{{ urlInput }}</span>
        </div>
      </div>

      <!-- Menu -->
      <button 
        class="p-1 hover:bg-gray-200 rounded transition-colors text-gray-500"
        @click="openExternal"
        title="Open in New Tab"
      >
        <i class="fas fa-external-link-alt"></i>
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
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const urlInput = ref('/classic')
const currentUrl = ref('/classic')

const goHome = () => {
  currentUrl.value = '/classic'
  urlInput.value = '/classic'
}

const openExternal = () => {
  window.open(window.location.origin + '/classic', '_blank')
}

const reload = () => {
  const url = currentUrl.value
  currentUrl.value = null
  setTimeout(() => {
    currentUrl.value = url
  }, 100)
}
</script>
