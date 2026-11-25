<template>
  <header class="border-b border-white/5 bg-slate-950/60 backdrop-blur-xl">
    <div class="mx-auto flex h-16 max-w-5xl items-center gap-3 px-3 sm:px-6">
      <RouterLink :to="{ name: 'landing' }" class="icon-btn" :aria-label="$t('aiAgent.header.back')" :title="$t('aiAgent.header.back')">
        <i class="fas fa-arrow-left" aria-hidden="true" />
      </RouterLink>

      <AgentAvatar :size="38" :active="busy" />
      <div class="min-w-0">
        <h1 class="truncate text-[15px] font-semibold text-white">{{ $t('aiAgent.title') }}</h1>
        <p class="flex items-center gap-1.5 text-xs text-slate-400">
          <span :class="['h-1.5 w-1.5 rounded-full', engine === 'remote' ? 'bg-emerald-400' : 'bg-amber-400']" aria-hidden="true" />
          <span class="truncate">{{ busy ? $t('aiAgent.status.working') : statusLabel }}</span>
        </p>
      </div>

      <div class="ml-auto flex items-center gap-1.5">
        <button type="button" class="lang-btn" :aria-label="`Language: ${locale}`" @click="toggleLocale">
          {{ locale === 'es' ? 'ES' : 'EN' }}
        </button>
        <button type="button" class="icon-btn" :title="$t('aiAgent.header.underTheHood')" @click="$emit('open-insights')">
          <i class="fas fa-diagram-project" aria-hidden="true" />
          <span class="sr-only">{{ $t('aiAgent.header.underTheHood') }}</span>
        </button>
        <button
          type="button"
          class="icon-btn"
          :disabled="!canReset"
          :title="$t('aiAgent.header.newChat')"
          @click="$emit('reset')"
        >
          <i class="fas fa-pen-to-square" aria-hidden="true" />
          <span class="sr-only">{{ $t('aiAgent.header.newChat') }}</span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AgentAvatar from './AgentAvatar.vue'

const props = defineProps({
  engine: { type: String, required: true },
  busy: { type: Boolean, default: false },
  canReset: { type: Boolean, default: false },
  modelLabel: { type: String, default: '' }
})
defineEmits(['reset', 'open-insights'])

const { t, locale } = useI18n()

const statusLabel = computed(() =>
  props.engine === 'remote'
    ? t('aiAgent.status.online', { model: props.modelLabel || t('aiAgent.status.defaultModel') })
    : t('aiAgent.status.offline')
)

const toggleLocale = () => {
  locale.value = locale.value === 'es' ? 'en' : 'es'
}
</script>

<style scoped>
.icon-btn {
  @apply inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
.lang-btn {
  @apply h-9 rounded-xl border border-white/10 px-2.5 text-xs font-bold tracking-wider text-slate-300 transition hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
</style>
