<template>
  <span :class="['tech-chip', { 'tech-chip--highlight': highlight }]">{{ label }}</span>
</template>

<script setup>
defineProps({
  label: { type: String, required: true },
  highlight: { type: Boolean, default: false }
})
</script>

<style scoped>
.tech-chip {
  @apply inline-flex items-center rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-xs font-medium text-slate-300 whitespace-nowrap;
}
.tech-chip--highlight {
  @apply border-teal-400/40 bg-teal-400/10 text-teal-200;
}
</style>
