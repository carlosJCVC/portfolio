<template>
  <div class="min-h-[5.5rem] px-6" aria-live="polite">
    <Transition name="caption" mode="out-in">
      <p :key="text" class="text-center text-lg font-medium leading-snug text-white/95">{{ text }}</p>
    </Transition>
  </div>
</template>

<script setup>
defineProps({
  text: { type: String, default: '' }
})
</script>

<style scoped>
.caption-enter-active,
.caption-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.caption-enter-from {
  opacity: 0;
  transform: translateY(6px);
}
.caption-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}
</style>
