<template>
  <WidgetFrame :title="$t('aiAgent.widgets.fitReport')" icon="fa-bullseye">
    <div class="flex flex-col sm:flex-row gap-5 sm:items-center">
      <ScoreGauge :value="matchScore" :label="$t('aiAgent.widgets.matchScore')" class="self-center shrink-0" />
      <div class="min-w-0">
        <span :class="['inline-block rounded-full px-2.5 py-0.5 text-xs font-bold', verdict.class]">
          {{ $t(`aiAgent.widgets.verdict.${verdict.key}`) }}
        </span>
        <h4 class="mt-2 text-lg font-bold text-white leading-snug">
          {{ roleTitle }}<span v-if="company" class="font-normal text-slate-400"> · {{ company }}</span>
        </h4>
        <p class="mt-1 text-sm text-slate-300">{{ summary }}</p>
      </div>
    </div>

    <div class="mt-5 grid gap-4 md:grid-cols-5">
      <div class="md:col-span-3">
        <h5 class="section-title"><i class="fas fa-circle-check text-emerald-400" aria-hidden="true" />{{ $t('aiAgent.widgets.strengths') }}</h5>
        <ul class="space-y-2">
          <li v-for="item in strengths" :key="item.requirement" class="rounded-xl bg-emerald-400/[0.06] border border-emerald-400/15 px-3 py-2">
            <p class="text-sm font-semibold text-emerald-200">{{ item.requirement }}</p>
            <p class="text-sm text-slate-300">{{ item.evidence }}</p>
          </li>
        </ul>
      </div>
      <div class="md:col-span-2">
        <h5 class="section-title"><i class="fas fa-triangle-exclamation text-amber-400" aria-hidden="true" />{{ $t('aiAgent.widgets.gaps') }}</h5>
        <ul v-if="gaps.length" class="space-y-2">
          <li v-for="gap in gaps" :key="gap" class="rounded-xl bg-amber-400/[0.06] border border-amber-400/15 px-3 py-2 text-sm text-amber-100">
            {{ gap }}
          </li>
        </ul>
        <p v-else class="text-sm text-slate-400">{{ $t('aiAgent.widgets.noGaps') }}</p>
      </div>
    </div>

    <div v-if="projects.length" class="mt-5">
      <h5 class="section-title"><i class="fas fa-folder-open text-indigo-300" aria-hidden="true" />{{ $t('aiAgent.widgets.provenIn') }}</h5>
      <div class="flex flex-wrap gap-2">
        <button
          v-for="project in projects"
          :key="project.id"
          type="button"
          class="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 py-1.5 pl-1.5 pr-3 text-sm text-slate-200 transition hover:border-indigo-400/50 hover:text-white"
          @click="selected = project"
        >
          <img :src="project.image" :alt="''" class="h-7 w-7 rounded-lg object-cover" loading="lazy" />
          {{ project.title }}
        </button>
      </div>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </WidgetFrame>
</template>

<script setup>
import { computed, ref } from 'vue'
import ProjectModal from '@/components/classic/ProjectModal.vue'
import WidgetFrame from './WidgetFrame.vue'
import ScoreGauge from './ScoreGauge.vue'

const props = defineProps({
  roleTitle: { type: String, required: true },
  company: { type: String, default: '' },
  matchScore: { type: Number, required: true },
  summary: { type: String, required: true },
  strengths: { type: Array, default: () => [] },
  gaps: { type: Array, default: () => [] },
  projects: { type: Array, default: () => [] }
})

const selected = ref(null)

const verdict = computed(() => {
  if (props.matchScore >= 80) return { key: 'strong', class: 'bg-emerald-400/15 text-emerald-300' }
  if (props.matchScore >= 60) return { key: 'good', class: 'bg-indigo-400/15 text-indigo-200' }
  return { key: 'partial', class: 'bg-amber-400/15 text-amber-300' }
})
</script>

<style scoped>
.section-title {
  @apply mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400;
}
</style>
