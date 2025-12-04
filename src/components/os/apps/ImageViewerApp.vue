<template>
  <div class="h-full flex flex-col bg-[#1e1e1e] text-gray-300 font-sans select-none">
    <!-- Toolbar -->
    <div class="h-10 border-b border-gray-700 flex items-center px-4 gap-4 bg-[#252526]">
      <div class="flex gap-2">
        <button
          class="hover:text-white transition-colors"
          @click="zoomOut"
          title="Zoom Out"
        >
          <i class="fas fa-search-minus"></i>
        </button>
        <span class="text-xs w-12 text-center">{{ Math.round(scale * 100) }}%</span>
        <button
          class="hover:text-white transition-colors"
          @click="zoomIn"
          title="Zoom In"
        >
          <i class="fas fa-search-plus"></i>
        </button>
      </div>
      <div class="h-4 w-[1px] bg-gray-600"></div>
      <button
        class="hover:text-white transition-colors"
        @click="resetZoom"
        title="Reset Zoom"
      >
        <i class="fas fa-compress"></i>
      </button>
    </div>

    <!-- Image Area -->
    <div class="flex-grow flex items-center justify-center overflow-hidden bg-[#1e1e1e] relative p-4">
      <div
        class="transition-transform duration-200 ease-out"
        :style="{ transform: `scale(${scale})` }"
      >
        <img
          v-if="image"
          :src="image.src"
          :alt="image.caption"
          class="max-w-full max-h-[80vh] object-contain shadow-2xl rounded-sm"
          draggable="false"
        />
        <div v-else class="text-gray-500 flex flex-col items-center gap-2">
          <i class="fas fa-image text-4xl"></i>
          <span>No image selected</span>
        </div>
      </div>
    </div>

    <!-- Status Bar -->
    <div class="h-6 bg-[#007acc] text-white text-xs flex items-center px-3 justify-between select-none">
      <span>{{ image ? image.caption : 'Ready' }}</span>
      <span v-if="image">{{ image.width }}x{{ image.height }} (Estimated)</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  image: {
    type: Object,
    default: null
  }
})

const scale = ref(1)

const zoomIn = () => {
  scale.value = Math.min(scale.value + 0.1, 3)
}

const zoomOut = () => {
  scale.value = Math.max(scale.value - 0.1, 0.1)
}

const resetZoom = () => {
  scale.value = 1
}

// Reset zoom when image changes
watch(() => props.image, () => {
  resetZoom()
})
</script>
