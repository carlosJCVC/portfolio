<template>
  <div class="flex w-full flex-col items-center">
    <span class="mb-3 inline-flex items-center gap-1.5 rounded-full bg-amber-400 px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-slate-900">
      <i class="fas fa-star text-[10px]" aria-hidden="true" />{{ $t('aiCall.flagship.badge') }}
    </span>
    <button type="button" class="flagship-card" @click="open = true">
      <img :src="project.image" :alt="project.title" class="w-full rounded-2xl" />
    </button>

    <ol class="mt-6 flex w-full items-center justify-between gap-1" :aria-label="$t('aiCall.flagship.pipeline')">
      <li v-for="(step, index) in PIPELINE" :key="step.key" class="pipeline-step" :style="{ animationDelay: `${300 + index * 220}ms` }">
        <span class="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-teal-300">
          <i :class="['fas', step.icon]" aria-hidden="true" />
        </span>
        <span class="mt-1.5 text-[10px] font-medium text-slate-300">{{ $t(`aiCall.flagship.steps.${step.key}`) }}</span>
      </li>
    </ol>

    <a :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-teal-300">
      {{ project.liveUrl.replace('https://', '') }} <i class="fas fa-arrow-up-right-from-square text-xs" aria-hidden="true" />
    </a>

    <ProjectModal :project="open ? project : null" @close="open = false" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectModal from '@/components/classic/ProjectModal.vue'

defineProps({
  project: { type: Object, required: true }
})

const open = ref(false)

const PIPELINE = [
  { key: 'voice', icon: 'fa-microphone' },
  { key: 'text', icon: 'fa-closed-captioning' },
  { key: 'translate', icon: 'fa-language' },
  { key: 'speech', icon: 'fa-headphones' }
]
</script>

<style scoped>
.flagship-card {
  @apply relative w-full overflow-hidden rounded-2xl shadow-2xl shadow-indigo-900/60 ring-1 ring-white/10 transition active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.pipeline-step {
  @apply relative flex flex-1 flex-col items-center text-center;
  animation: step-in 0.4s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.pipeline-step:not(:last-child)::after {
  content: '';
  @apply absolute left-[calc(50%+24px)] right-[calc(-50%+24px)] top-5 h-px bg-gradient-to-r from-teal-300/60 to-indigo-400/60;
}
@keyframes step-in {
  from {
    opacity: 0;
    transform: translateY(8px);
  }
}
</style>
