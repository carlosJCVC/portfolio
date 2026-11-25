<template>
  <WidgetFrame :title="$t('aiAgent.widgets.projects', { count: total }, total)" icon="fa-layer-group">
    <p v-if="!projects.length" class="text-sm text-slate-400">{{ $t('aiAgent.widgets.noProjects') }}</p>

    <div v-else class="projects-rail" role="list">
      <button
        v-for="project in projects"
        :key="project.id"
        type="button"
        role="listitem"
        class="project-card group"
        @click="selected = project"
      >
        <div class="relative h-32 overflow-hidden rounded-xl bg-slate-800">
          <img
            :src="project.image"
            :alt="project.title"
            loading="lazy"
            class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />
          <span class="absolute left-2 top-2 rounded-full bg-black/60 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur">
            {{ project.category }}
          </span>
          <span
            v-if="project.featured"
            class="absolute right-2 top-2 rounded-full bg-amber-400/90 px-1.5 py-0.5 text-[11px] text-slate-900"
            aria-label="Featured"
          >
            <i class="fas fa-star" aria-hidden="true" />
          </span>
        </div>
        <div class="mt-3 text-left">
          <h4 class="font-semibold text-white leading-tight">{{ project.title }}</h4>
          <p class="mt-1 text-xs text-slate-400 line-clamp-2">{{ project.description }}</p>
          <div class="mt-2 flex flex-wrap gap-1">
            <TechChip
              v-for="tech in project.technologies.slice(0, 3)"
              :key="tech"
              :label="tech"
              :highlight="isHighlighted(tech)"
            />
          </div>
          <span class="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-indigo-300 group-hover:text-indigo-200">
            {{ $t('aiAgent.widgets.viewDetails') }} <i class="fas fa-arrow-right text-[10px]" aria-hidden="true" />
          </span>
        </div>
      </button>
    </div>

    <ProjectModal :project="selected" @close="selected = null" />
  </WidgetFrame>
</template>

<script setup>
import { ref } from 'vue'
import ProjectModal from '@/components/classic/ProjectModal.vue'
import { normalizeTerm } from '../../domain/knowledgeBase'
import WidgetFrame from './WidgetFrame.vue'
import TechChip from './TechChip.vue'

const props = defineProps({
  projects: { type: Array, required: true },
  total: { type: Number, default: 0 },
  filters: { type: Object, default: () => ({}) }
})

const selected = ref(null)

const isHighlighted = (tech) =>
  Boolean(props.filters.technology) && normalizeTerm(tech).includes(normalizeTerm(props.filters.technology))
</script>

<style scoped>
.projects-rail {
  @apply -mx-1 flex gap-3 overflow-x-auto px-1 pb-2 snap-x snap-mandatory;
  scrollbar-width: thin;
  scrollbar-color: rgb(99 102 241 / 0.4) transparent;
}
.project-card {
  @apply w-60 shrink-0 snap-start rounded-2xl border border-white/10 bg-white/[0.03] p-2.5 pb-3 transition hover:-translate-y-0.5 hover:border-indigo-400/40 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
</style>
