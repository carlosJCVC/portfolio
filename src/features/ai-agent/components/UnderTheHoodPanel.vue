<template>
  <Teleport to="body">
    <Transition name="backdrop">
      <div v-if="open" class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm" @click="$emit('close')" />
    </Transition>
    <Transition name="slide">
      <aside
        v-if="open"
        class="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/10 bg-slate-950/95 text-slate-200 shadow-2xl backdrop-blur-xl"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('aiAgent.underTheHood.title')"
        @keydown.esc="$emit('close')"
      >
        <header class="flex items-center justify-between border-b border-white/5 px-5 py-4">
          <h2 class="flex items-center gap-2 font-semibold text-white">
            <i class="fas fa-diagram-project text-indigo-400" aria-hidden="true" />{{ $t('aiAgent.underTheHood.title') }}
          </h2>
          <button ref="closeButton" type="button" class="rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white" aria-label="Close" @click="$emit('close')">
            <i class="fas fa-xmark" aria-hidden="true" />
          </button>
        </header>

        <div class="flex-1 space-y-6 overflow-y-auto px-5 py-5">
          <p class="text-sm leading-relaxed text-slate-300">{{ $t('aiAgent.underTheHood.intro') }}</p>

          <ol class="relative space-y-4 border-l border-dashed border-indigo-400/30 pl-6">
            <li v-for="step in STEPS" :key="step.key" class="relative">
              <span class="absolute -left-[37px] flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-slate-900 text-xs text-indigo-300">
                <i :class="['fas', step.icon]" aria-hidden="true" />
              </span>
              <p class="font-semibold text-white">{{ $t(`aiAgent.underTheHood.steps.${step.key}.title`) }}</p>
              <p class="text-sm text-slate-400">{{ $t(`aiAgent.underTheHood.steps.${step.key}.text`) }}</p>
            </li>
          </ol>

          <p class="rounded-xl border border-amber-400/20 bg-amber-400/5 px-3 py-2.5 text-sm text-amber-100">
            <i class="fas fa-shield-halved mr-1.5 text-amber-300" aria-hidden="true" />{{ $t('aiAgent.underTheHood.resilience') }}
          </p>

          <section>
            <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{{ $t('aiAgent.underTheHood.session') }}</h3>
            <dl class="grid grid-cols-3 gap-2 text-center">
              <div v-for="stat in sessionStats" :key="stat.label" class="rounded-xl border border-white/5 bg-white/[0.03] p-3">
                <dd class="text-lg font-bold text-white">{{ stat.value }}</dd>
                <dt class="text-[11px] text-slate-500">{{ stat.label }}</dt>
              </div>
            </dl>
          </section>

          <section>
            <h3 class="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-500">{{ $t('aiAgent.underTheHood.stack') }}</h3>
            <div class="flex flex-wrap gap-1.5">
              <TechChip v-for="tech in STACK" :key="tech" :label="tech" />
            </div>
          </section>

          <a :href="sourceUrl" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-sm font-semibold text-indigo-300 hover:text-indigo-200">
            <i class="fab fa-github" aria-hidden="true" />{{ $t('aiAgent.underTheHood.source') }}
          </a>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<script setup>
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { profile } from '@/data/profile'
import TechChip from './widgets/TechChip.vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  engine: { type: String, required: true },
  modelLabel: { type: String, default: '' },
  stats: { type: Object, required: true }
})
defineEmits(['close'])

const { t } = useI18n()
const closeButton = ref(null)
const sourceUrl = `${profile.social.github}/portfolio`

const STEPS = [
  { key: 'visitor', icon: 'fa-user' },
  { key: 'gateway', icon: 'fa-server' },
  { key: 'model', icon: 'fa-brain' },
  { key: 'tools', icon: 'fa-screwdriver-wrench' },
  { key: 'ui', icon: 'fa-wand-magic-sparkles' }
]

const STACK = ['LLM tool calling', 'Groq · Claude', 'SSE streaming', 'Vue 3', 'Composition API', 'Vercel Functions', 'Tailwind CSS']

const sessionStats = computed(() => [
  { label: t('aiAgent.underTheHood.steps_count'), value: props.stats.steps },
  { label: t('aiAgent.underTheHood.tool_calls'), value: props.stats.toolCalls },
  { label: t('aiAgent.underTheHood.engine'), value: props.engine === 'remote' ? props.modelLabel.split(' · ')[0] || 'AI' : 'Local' }
])

watch(
  () => props.open,
  (isOpen) => isOpen && nextTick(() => closeButton.value?.focus())
)
</script>

<style scoped>
.backdrop-enter-active,
.backdrop-leave-active {
  transition: opacity 0.25s;
}
.backdrop-enter-from,
.backdrop-leave-to {
  opacity: 0;
}
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
