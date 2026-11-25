<template>
  <ol class="w-full space-y-2">
    <li
      v-for="(job, index) in timeline"
      :key="job.id"
      class="slide-in flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5"
      :style="{ animationDelay: `${index * 130}ms` }"
    >
      <span :class="['h-2.5 w-2.5 shrink-0 rounded-full', index === timeline.length - 1 ? 'bg-teal-300 shadow-[0_0_10px] shadow-teal-300' : 'bg-indigo-400']" />
      <div class="min-w-0">
        <p class="truncate text-sm font-semibold">{{ job.role }}</p>
        <p class="truncate text-xs text-slate-400">{{ job.company }} · {{ job.period }}</p>
      </div>
    </li>
  </ol>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  jobs: { type: Array, required: true }
})

const timeline = computed(() => [...props.jobs].reverse())
</script>

<style scoped>
.slide-in {
  animation: slide 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes slide {
  from {
    opacity: 0;
    transform: translateX(-16px);
  }
}
</style>
