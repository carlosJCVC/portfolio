<template>
  <WidgetFrame :title="$t('aiAgent.widgets.education')" icon="fa-graduation-cap">
    <ul class="space-y-3">
      <li v-for="item in education" :key="item.id" class="flex gap-3">
        <span class="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300">
          <i class="fas fa-building-columns text-sm" aria-hidden="true" />
        </span>
        <div>
          <p class="font-semibold text-white leading-tight">{{ item.degree }}</p>
          <p class="text-sm text-slate-400">{{ item.school }} · {{ item.period }}</p>
        </div>
      </li>
    </ul>

    <h4 class="mt-5 mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
      {{ $t('aiAgent.widgets.certifications') }}
    </h4>
    <div class="grid gap-2 sm:grid-cols-2">
      <div
        v-for="cert in certifications"
        :key="cert.id"
        class="flex items-center gap-2 rounded-lg border border-white/5 bg-white/[0.03] px-3 py-2"
      >
        <i class="fas fa-certificate text-amber-300/80 text-sm" aria-hidden="true" />
        <span class="text-sm text-slate-200 truncate" :title="cert.name">{{ cert.name }}</span>
        <span class="ml-auto text-xs text-slate-500">{{ cert.year }}</span>
      </div>
    </div>
  </WidgetFrame>
</template>

<script setup>
import WidgetFrame from './WidgetFrame.vue'

defineProps({
  education: { type: Array, required: true },
  certifications: { type: Array, required: true }
})
</script>
