<template>
  <span :class="['inline-flex h-4 items-end gap-[3px]', { 'is-active': active }]" aria-hidden="true">
    <span v-for="bar in 4" :key="bar" class="bar" :style="{ animationDelay: `${bar * 0.12}s` }" />
  </span>
</template>

<script setup>
defineProps({
  active: { type: Boolean, default: false }
})
</script>

<style scoped>
.bar {
  @apply block h-1 w-[3px] rounded-full bg-teal-300 transition-all;
}
.is-active .bar {
  animation: wave 0.9s ease-in-out infinite;
}
@keyframes wave {
  0%,
  100% {
    height: 4px;
  }
  50% {
    height: 16px;
  }
}
</style>
