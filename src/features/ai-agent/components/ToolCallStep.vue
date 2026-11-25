<template>
  <div :class="['tool-step', `tool-step--${part.status}`]">
    <span class="tool-step__icon">
      <i v-if="part.status === 'running'" class="fas fa-circle-notch fa-spin" aria-hidden="true" />
      <i v-else-if="part.status === 'error'" class="fas fa-xmark" aria-hidden="true" />
      <i v-else :class="['fas', icon]" aria-hidden="true" />
    </span>
    <span class="font-medium text-slate-200">{{ $t(`aiAgent.tools.${part.name}`, part.name) }}</span>
    <code v-if="argsSummary" class="tool-step__args" :title="argsSummary">{{ argsSummary }}</code>
    <span class="ml-auto shrink-0 tabular-nums text-slate-500">
      <template v-if="part.status === 'error'">{{ $t('aiAgent.tools.failed') }}</template>
      <template v-else-if="part.durationMs !== null">{{ part.durationMs }} ms</template>
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { widgetFor } from './widgets/widgetRegistry'

const props = defineProps({
  part: { type: Object, required: true }
})

const icon = computed(() => widgetFor(props.part.name).icon)

const argsSummary = computed(() => {
  const input = props.part.input ?? {}
  return Object.entries(input)
    .filter(([, value]) => ['string', 'number', 'boolean'].includes(typeof value))
    .map(([key, value]) => `${key}: ${typeof value === 'string' && value.length > 28 ? `${value.slice(0, 28)}…` : value}`)
    .join(', ')
})
</script>

<style scoped>
.tool-step {
  @apply flex items-center gap-2 rounded-xl border border-white/5 bg-white/[0.03] px-3 py-2 text-xs font-mono transition-colors;
}
.tool-step__icon {
  @apply flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-indigo-500/15 text-indigo-300;
}
.tool-step--done .tool-step__icon {
  @apply bg-teal-400/10 text-teal-300;
}
.tool-step--error .tool-step__icon {
  @apply bg-rose-500/15 text-rose-300;
}
.tool-step__args {
  @apply truncate text-slate-400;
}
</style>
