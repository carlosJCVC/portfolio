<template>
  <div
    v-if="!window.minimized"
    class="absolute flex flex-col bg-[#1e1e1e] rounded-lg shadow-2xl border border-gray-700 overflow-hidden transition-all duration-200"
    :class="{ 'ring-2 ring-blue-500/50': isActive }"
    :style="{
      left: window.maximized ? '0px' : `${window.x}px`,
      top: window.maximized ? '0px' : `${window.y}px`,
      width: window.maximized ? '100%' : `${window.width}px`,
      height: window.maximized ? '100%' : `${window.height}px`,
      zIndex: window.zIndex,
      transition: isDragging ? 'none' : 'all 0.2s ease-out'
    }"
    @mousedown="focus"
  >
    <!-- Title Bar -->
    <div
      class="h-10 bg-[#2d2d2d] flex items-center justify-between px-4 select-none cursor-default"
      @mousedown="startDrag"
      @dblclick="toggleMaximize"
    >
      <div class="flex items-center gap-2">
        <div class="flex gap-2 group">
          <button
            @click.stop="close"
            class="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 flex items-center justify-center text-[8px] text-black transition-opacity"
          >
            <span class="opacity-0 group-hover:opacity-100">✕</span>
          </button>
          <button
            @click.stop="minimize"
            class="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 flex items-center justify-center text-[8px] text-black transition-opacity"
          >
            <span class="opacity-0 group-hover:opacity-100">−</span>
          </button>
          <button
            @click.stop="toggleMaximize"
            class="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 flex items-center justify-center text-[8px] text-black transition-opacity"
          >
            <span class="opacity-0 group-hover:opacity-100">+</span>
          </button>
        </div>
        <span class="ml-4 text-sm text-gray-400 font-medium">{{ window.title }}</span>
      </div>
    </div>

    <!-- Content Area -->
    <div class="flex-grow overflow-auto bg-[#1e1e1e] relative">
      <component :is="window.component" v-bind="window.props" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useOSStore } from '@/store/useOSStore'

const props = defineProps({
  window: {
    type: Object,
    required: true
  }
})

const store = useOSStore()
const isActive = computed(() => store.activeWindowId === props.window.id)
const isDragging = ref(false)

const focus = () => {
  store.focusWindow(props.window.id)
}

const close = () => {
  store.closeWindow(props.window.id)
}

const minimize = () => {
  store.minimizeWindow(props.window.id)
}

const toggleMaximize = () => {
  store.maximizeWindow(props.window.id)
}

// Drag Logic
let startX = 0
let startY = 0
let initialLeft = 0
let initialTop = 0

const startDrag = (e) => {
  if (props.window.maximized) return
  isDragging.value = true
  startX = e.clientX
  startY = e.clientY
  initialLeft = props.window.x
  initialTop = props.window.y

  window.addEventListener('mousemove', onDrag)
  window.addEventListener('mouseup', stopDrag)
}

const onDrag = (e) => {
  if (!isDragging.value) return
  const dx = e.clientX - startX
  const dy = e.clientY - startY

  // Directly mutating the store object (passed as prop)
  // In a stricter setup, we would use a store action, but for this prototype,
  // we acknowledge the mutation of the reactive object from the store.
  // To satisfy lint, we can emit or just suppress, but let's add a store action for correctness.
  store.updateWindowPosition(props.window.id, initialLeft + dx, initialTop + dy)
}

const stopDrag = () => {
  isDragging.value = false
  window.removeEventListener('mousemove', onDrag)
  window.removeEventListener('mouseup', stopDrag)
}
</script>
