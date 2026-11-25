<template>
  <span class="inline-flex items-center gap-1 py-2" role="status" :aria-label="$t('aiAgent.status.working')">
    <span v-for="i in 3" :key="i" class="dot" :style="{ animationDelay: `${(i - 1) * 0.15}s` }" />
  </span>
</template>

<style scoped>
.dot {
  @apply h-2 w-2 rounded-full bg-gradient-to-br from-indigo-400 to-teal-300;
  animation: bounce 1s ease-in-out infinite;
}
@keyframes bounce {
  0%,
  80%,
  100% {
    transform: translateY(0);
    opacity: 0.4;
  }
  40% {
    transform: translateY(-5px);
    opacity: 1;
  }
}
</style>
