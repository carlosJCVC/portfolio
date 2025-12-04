<template>
  <div
    class="fixed inset-0 z-[9900] flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl text-white transition-opacity duration-700"
  >
    <div class="flex flex-col items-center gap-6 animate-fade-in-up">
      <!-- Avatar -->
      <div class="relative group">
        <div
          class="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl group-hover:scale-105 transition-transform duration-300"
        >
          <img :src="profile.avatar" alt="User Avatar" class="w-full h-full object-cover" />
        </div>
        <div
          class="absolute inset-0 rounded-full bg-gradient-to-tr from-blue-500/20 to-purple-500/20 pointer-events-none"
        ></div>
      </div>

      <!-- User Info -->
      <div class="text-center space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">{{ profile.name }}</h1>
        <p class="text-white/60 text-sm font-medium tracking-widest uppercase">
          {{ profile.role }}
        </p>
      </div>

      <!-- Login Button -->
      <button
        @click="handleLogin"
        class="mt-4 px-8 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-full backdrop-blur-md transition-all duration-300 group flex items-center gap-2"
      >
        <span>Enter Portfolio</span>
        <i class="fas fa-arrow-right group-hover:translate-x-1 transition-transform text-sm"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
import { profile } from '@/data/profile'
import { useOSStore } from '@/store/useOSStore'

const store = useOSStore()

const handleLogin = () => {
  store.login()
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
