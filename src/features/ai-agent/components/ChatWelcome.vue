<template>
  <div class="mx-auto flex min-h-full w-full max-w-3xl flex-col justify-center px-4 py-10 sm:px-6">
    <div class="welcome-in flex flex-col items-center text-center">
      <AgentAvatar :size="76" active class="mb-6" />
      <p class="mb-3 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-500/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-indigo-200">
        <i class="fas fa-wand-magic-sparkles" aria-hidden="true" />{{ $t('aiAgent.welcome.eyebrow') }}
      </p>
      <h2 class="welcome-title">{{ $t('aiAgent.welcome.title') }}</h2>
      <p class="mx-auto mt-4 max-w-xl text-base text-slate-400 sm:text-lg">{{ $t('aiAgent.welcome.subtitle') }}</p>
    </div>

    <div class="mt-10 grid gap-3 sm:grid-cols-2">
      <button
        v-for="(card, index) in CAPABILITIES"
        :key="card.key"
        type="button"
        class="capability-card group"
        :style="{ animationDelay: `${120 + index * 70}ms` }"
        @click="$emit('select', card.prompt)"
      >
        <span :class="['capability-card__icon', card.tint]">
          <i :class="['fas', card.icon]" aria-hidden="true" />
        </span>
        <span class="text-left">
          <span class="block font-semibold text-white">{{ $t(`aiAgent.welcome.capabilities.${card.key}.title`) }}</span>
          <span class="block text-sm text-slate-400">{{ $t(`aiAgent.welcome.capabilities.${card.key}.text`) }}</span>
        </span>
        <i class="fas fa-arrow-right ml-auto text-slate-600 transition group-hover:translate-x-0.5 group-hover:text-slate-300" aria-hidden="true" />
      </button>
    </div>

    <SuggestionChips :ids="STARTER_PROMPTS" class="mt-6 justify-center" @select="$emit('select', $event)" />
  </div>
</template>

<script setup>
import AgentAvatar from './AgentAvatar.vue'
import SuggestionChips from './SuggestionChips.vue'
import { PROMPT_IDS, STARTER_PROMPTS } from '../domain/suggestions'

defineEmits(['select'])

const CAPABILITIES = [
  { key: 'projects', icon: 'fa-layer-group', tint: 'from-indigo-500/30 to-indigo-500/5 text-indigo-200', prompt: PROMPT_IDS.FEATURED },
  { key: 'experience', icon: 'fa-timeline', tint: 'from-violet-500/30 to-violet-500/5 text-violet-200', prompt: PROMPT_IDS.EXPERIENCE },
  { key: 'jobFit', icon: 'fa-bullseye', tint: 'from-teal-400/30 to-teal-400/5 text-teal-200', prompt: PROMPT_IDS.JOB_FIT },
  { key: 'contact', icon: 'fa-envelope-open-text', tint: 'from-sky-500/30 to-sky-500/5 text-sky-200', prompt: PROMPT_IDS.CONTACT }
]
</script>

<style scoped>
.welcome-title {
  @apply text-4xl font-extrabold tracking-tight sm:text-5xl;
  background: linear-gradient(120deg, #fff 10%, #a5b4fc 50%, #5eead4 90%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
}
.welcome-in {
  animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.capability-card {
  @apply flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur transition hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
  animation: rise 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
.capability-card__icon {
  @apply flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br text-lg;
}
@keyframes rise {
  from {
    opacity: 0;
    transform: translateY(12px);
  }
  to {
    opacity: 1;
    transform: none;
  }
}
@media (prefers-reduced-motion: reduce) {
  .welcome-in,
  .capability-card {
    animation: none;
  }
}
</style>
