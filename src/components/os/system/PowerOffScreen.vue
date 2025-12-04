<template>
  <div class="fixed inset-0 bg-black z-[9999] flex items-center justify-center">
    <button
      @click="turnOn"
      class="group relative flex items-center justify-center w-24 h-24 rounded-full bg-gray-900 border border-gray-800 shadow-[0_0_50px_rgba(0,0,0,1)] transition-all duration-500 hover:border-gray-700 hover:shadow-[0_0_80px_rgba(59,130,246,0.1)] active:scale-95"
    >
      <!-- Power Icon -->
      <i
        class="fas fa-power-off text-4xl text-gray-700 transition-all duration-500 group-hover:text-blue-500 group-hover:drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]"
      ></i>

      <!-- Ring Animation -->
      <div
        class="absolute inset-0 rounded-full border border-transparent group-hover:border-blue-500/20 w-full h-full transition-all duration-500 scale-110 group-hover:scale-125 opacity-0 group-hover:opacity-100"
      ></div>
    </button>
    
    <div class="absolute bottom-10 text-gray-800 text-sm font-mono">
      System Halted
    </div>
  </div>
</template>

<script setup>
import { useOSStore } from '@/store/useOSStore'

const store = useOSStore()

const turnOn = () => {
  store.turnOn()
}
</script>
