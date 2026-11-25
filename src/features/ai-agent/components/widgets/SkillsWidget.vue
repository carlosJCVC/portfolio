<template>
  <WidgetFrame :title="$t('aiAgent.widgets.skills')" icon="fa-microchip">
    <div class="grid gap-3 sm:grid-cols-2">
      <div v-for="group in groups" :key="group.area" class="rounded-xl border border-white/5 bg-white/[0.03] p-3">
        <h4 class="mb-2 flex items-center gap-2 text-sm font-semibold text-white">
          <i :class="['fas', AREA_ICONS[group.area] ?? 'fa-code', 'text-teal-300']" aria-hidden="true" />
          {{ group.title }}
        </h4>
        <div class="flex flex-wrap gap-1.5">
          <TechChip v-for="item in group.items" :key="item" :label="item" />
        </div>
      </div>
    </div>
  </WidgetFrame>
</template>

<script setup>
import WidgetFrame from './WidgetFrame.vue'
import TechChip from './TechChip.vue'

defineProps({
  groups: { type: Array, required: true }
})

const AREA_ICONS = {
  backend: 'fa-server',
  frontend: 'fa-display',
  mobile: 'fa-mobile-screen',
  tools: 'fa-screwdriver-wrench'
}
</script>
