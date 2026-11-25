<template>
  <WidgetFrame :title="$t('aiAgent.widgets.experience')" icon="fa-briefcase">
    <ol class="relative ml-2 border-l border-white/10">
      <li v-for="(job, index) in jobs" :key="job.id" class="relative pl-6 pb-5 last:pb-0">
        <span
          :class="[
            'absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full ring-4 ring-slate-900',
            index === 0 ? 'bg-teal-400 shadow-[0_0_12px] shadow-teal-400/60' : 'bg-indigo-500'
          ]"
          aria-hidden="true"
        />
        <button
          type="button"
          class="w-full text-left group"
          :aria-expanded="expanded.has(job.id)"
          @click="toggle(job.id)"
        >
          <p class="text-xs font-medium text-slate-400">{{ job.period }}</p>
          <h4 class="font-semibold text-white group-hover:text-indigo-200 transition">
            {{ job.role }}
            <span class="font-normal text-slate-400">· {{ job.company }}</span>
          </h4>
          <p :class="['mt-1 text-sm text-slate-300', expanded.has(job.id) ? '' : 'line-clamp-2']">
            {{ job.description }}
          </p>
        </button>
        <div class="mt-2 flex flex-wrap gap-1">
          <TechChip v-for="skill in job.skills" :key="skill" :label="skill" />
        </div>
      </li>
    </ol>
  </WidgetFrame>
</template>

<script setup>
import { reactive } from 'vue'
import WidgetFrame from './WidgetFrame.vue'
import TechChip from './TechChip.vue'

defineProps({
  jobs: { type: Array, required: true }
})

const expanded = reactive(new Set())
const toggle = (id) => (expanded.has(id) ? expanded.delete(id) : expanded.add(id))
</script>
