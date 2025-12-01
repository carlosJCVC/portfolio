<template>
  <div
    class="fixed inset-0 bg-black z-[9999] flex flex-col items-center justify-center font-mono text-white p-8 cursor-none"
  >
    <div class="w-full max-w-2xl space-y-2">
      <div v-for="(line, index) in lines" :key="index" class="text-green-500">
        <span class="mr-2">[{{ line.status }}]</span>
        <span>{{ line.text }}</span>
      </div>
      <div class="animate-pulse text-gray-400 mt-4">_</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useOSStore } from '@/store/useOSStore'

const store = useOSStore()
const lines = ref([])

const bootSequence = [
  { text: 'Initializing Kernel...', status: 'OK' },
  { text: 'Loading Vue.js Core...', status: 'OK' },
  { text: 'Mounting File System...', status: 'OK' },
  { text: 'Starting Graphical Interface...', status: 'OK' },
  { text: 'Loading Portfolio Assets...', status: 'OK' },
  { text: 'Welcome, Guest User.', status: 'DONE' }
]

onMounted(async () => {
  for (const step of bootSequence) {
    await new Promise((resolve) => setTimeout(resolve, 400))
    lines.value.push(step)
  }
  await new Promise((resolve) => setTimeout(resolve, 800))
  store.setBootComplete()
})
</script>
