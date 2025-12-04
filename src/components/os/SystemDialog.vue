<template>
  <div class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
    <div
      class="bg-[#252526] w-96 rounded-lg shadow-2xl border border-gray-700 flex flex-col overflow-hidden animate-bounce-in"
    >
      <!-- Header -->
      <div class="h-8 bg-[#333333] flex items-center justify-between px-3 border-b border-gray-700">
        <span class="text-xs font-bold text-gray-300">{{ store.dialogOptions.title }}</span>
        <button
          class="text-gray-400 hover:text-white transition-colors"
          @click="store.closeDialog"
        >
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Body -->
      <div class="p-6 flex gap-4">
        <div class="text-3xl">
          <i
            v-if="store.dialogOptions.type === 'error'"
            class="fas fa-times-circle text-red-500"
          ></i>
          <i
            v-else-if="store.dialogOptions.type === 'warning'"
            class="fas fa-exclamation-triangle text-yellow-500"
          ></i>
          <i v-else class="fas fa-info-circle text-blue-500"></i>
        </div>
        <div class="text-sm text-gray-300 leading-relaxed">
          {{ store.dialogOptions.message }}
        </div>
      </div>

      <!-- Footer -->
      <div class="bg-[#1e1e1e] p-3 flex justify-end gap-2 border-t border-gray-700">
        <button
          v-if="store.dialogOptions.onCancel"
          class="px-4 py-1.5 rounded bg-[#333333] hover:bg-[#444444] text-white text-xs transition-colors border border-gray-600"
          @click="handleCancel"
        >
          Cancel
        </button>
        <button
          class="px-4 py-1.5 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs transition-colors shadow-lg"
          @click="handleConfirm"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useOSStore } from '@/store/useOSStore'

const store = useOSStore()

const handleConfirm = () => {
  if (store.dialogOptions.onConfirm) {
    store.dialogOptions.onConfirm()
  }
  store.closeDialog()
}

const handleCancel = () => {
  if (store.dialogOptions.onCancel) {
    store.dialogOptions.onCancel()
  }
  store.closeDialog()
}
</script>

<style scoped>
@keyframes bounce-in {
  0% {
    transform: scale(0.9);
    opacity: 0;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

.animate-bounce-in {
  animation: bounce-in 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}
</style>
