<template>
  <div class="flex flex-col items-center text-center">
    <div class="relative" :style="{ width: `${size}px`, height: `${size}px` }">
      <template v-if="ringing">
        <span v-for="ring in 3" :key="ring" class="pulse-ring" :style="{ animationDelay: `${(ring - 1) * 0.6}s` }" aria-hidden="true" />
      </template>
      <img :src="profile.avatar" :alt="profile.name" class="relative h-full w-full rounded-full object-cover ring-4 ring-white/10" />
    </div>
    <h1 class="mt-6 text-3xl font-bold tracking-tight">{{ profile.name }}</h1>
    <p class="mt-1 text-base text-slate-300">{{ profile.role }}</p>
    <p class="mt-1 flex items-center gap-1.5 text-sm text-teal-300">
      <i class="fas fa-wand-magic-sparkles text-xs" aria-hidden="true" />{{ subtitle }}
    </p>
  </div>
</template>

<script setup>
import { profile } from '@/data/profile'

defineProps({
  size: { type: Number, default: 128 },
  ringing: { type: Boolean, default: false },
  subtitle: { type: String, default: '' }
})
</script>

<style scoped>
.pulse-ring {
  @apply absolute inset-0 rounded-full border-2 border-teal-300/50;
  animation: pulse 1.8s ease-out infinite;
}
@keyframes pulse {
  from {
    transform: scale(1);
    opacity: 0.8;
  }
  to {
    transform: scale(1.9);
    opacity: 0;
  }
}
@media (prefers-reduced-motion: reduce) {
  .pulse-ring {
    animation: none;
  }
}
</style>
