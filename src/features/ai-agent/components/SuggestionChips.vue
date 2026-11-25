<template>
  <div class="flex flex-wrap gap-2">
    <button
      v-for="id in ids"
      :key="id"
      type="button"
      :disabled="disabled"
      :class="['chip', { 'chip--accent': id === PROMPT_IDS.JOB_FIT }]"
      @click="$emit('select', id)"
    >
      <i v-if="id === PROMPT_IDS.JOB_FIT" class="fas fa-bullseye text-[11px]" aria-hidden="true" />
      {{ $t(`aiAgent.prompts.${id}.label`) }}
    </button>
  </div>
</template>

<script setup>
import { PROMPT_IDS } from '../domain/suggestions'

defineProps({
  ids: { type: Array, required: true },
  disabled: { type: Boolean, default: false }
})

defineEmits(['select'])
</script>

<style scoped>
.chip {
  @apply inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-sm text-slate-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
.chip--accent {
  @apply border-teal-400/30 text-teal-200 hover:border-teal-300/60 hover:bg-teal-400/10;
}
</style>
