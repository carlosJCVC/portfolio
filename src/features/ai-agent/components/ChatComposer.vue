<template>
  <form class="composer" :class="{ 'composer--job': jobMode }" @submit.prevent="submit">
    <div v-if="jobMode" class="flex items-center justify-between px-4 pt-3">
      <span class="flex items-center gap-2 text-sm font-semibold text-teal-200">
        <i class="fas fa-bullseye" aria-hidden="true" />{{ $t('aiAgent.composer.jobModeTitle') }}
      </span>
      <button type="button" class="text-xs text-slate-400 hover:text-white" @click="setJobMode(false)">
        {{ $t('aiAgent.composer.cancel') }}
      </button>
    </div>

    <textarea
      ref="input"
      v-model="draft"
      :placeholder="jobMode ? $t('aiAgent.composer.jobPlaceholder') : $t('aiAgent.composer.placeholder')"
      :rows="jobMode ? 6 : 1"
      :maxlength="MAX_LENGTH"
      class="composer__input"
      :aria-label="$t('aiAgent.composer.placeholder')"
      @keydown.enter.exact="onEnter"
      @input="autoResize"
    />

    <div class="flex items-center gap-2 px-3 pb-3">
      <button
        v-if="!jobMode"
        type="button"
        class="mode-toggle"
        :disabled="busy"
        @click="setJobMode(true)"
      >
        <i class="fas fa-bullseye" aria-hidden="true" />
        <span class="hidden sm:inline">{{ $t('aiAgent.composer.jobMode') }}</span>
      </button>
      <span class="ml-auto hidden text-[11px] text-slate-500 md:block">
        <template v-if="draft.length > MAX_LENGTH * 0.8">{{ draft.length }}/{{ MAX_LENGTH }} · </template>
        {{ jobMode ? '' : $t('aiAgent.composer.hint') }}
      </span>

      <button v-if="busy" type="button" class="send-btn send-btn--stop md:ml-0 ml-auto" @click="$emit('stop')">
        <i class="fas fa-stop" aria-hidden="true" />
        <span class="sr-only">{{ $t('aiAgent.composer.stop') }}</span>
      </button>
      <button v-else type="submit" class="send-btn md:ml-0 ml-auto" :disabled="!canSend">
        <template v-if="jobMode">
          <span class="px-1 text-sm font-semibold">{{ $t('aiAgent.composer.analyze') }}</span>
        </template>
        <template v-else>
          <i class="fas fa-arrow-up" aria-hidden="true" />
          <span class="sr-only">{{ $t('aiAgent.composer.send') }}</span>
        </template>
      </button>
    </div>
  </form>
</template>

<script setup>
import { computed, nextTick, ref } from 'vue'

const MAX_LENGTH = 5000

const props = defineProps({
  busy: { type: Boolean, default: false }
})
const emit = defineEmits(['send', 'stop'])

const draft = ref('')
const jobMode = ref(false)
const input = ref(null)

const canSend = computed(() => !props.busy && draft.value.trim().length > (jobMode.value ? 40 : 0))

const autoResize = () => {
  const el = input.value
  if (!el || jobMode.value) return
  el.style.height = 'auto'
  el.style.height = `${Math.min(el.scrollHeight, 180)}px`
}

const focus = () => nextTick(() => input.value?.focus())

const setJobMode = (enabled) => {
  jobMode.value = enabled
  if (input.value) input.value.style.height = ''
  focus()
}

const onEnter = (event) => {
  if (jobMode.value) return
  event.preventDefault()
  submit()
}

const submit = () => {
  if (!canSend.value) return
  emit('send', { text: draft.value.trim(), kind: jobMode.value ? 'job' : 'text' })
  draft.value = ''
  jobMode.value = false
  nextTick(autoResize)
}

defineExpose({ focus, openJobMode: () => setJobMode(true) })
</script>

<style scoped>
.composer {
  @apply rounded-3xl border border-white/10 bg-slate-900/80 shadow-2xl shadow-black/40 backdrop-blur-xl transition focus-within:border-indigo-400/50;
}
.composer--job {
  @apply border-teal-400/40;
}
.composer__input {
  @apply block w-full resize-none bg-transparent px-4 pt-3.5 pb-2 text-[15px] text-white placeholder:text-slate-500 focus:outline-none;
}
.mode-toggle {
  @apply inline-flex items-center gap-1.5 rounded-full border border-teal-400/30 px-3 py-1.5 text-xs font-medium text-teal-200 transition hover:bg-teal-400/10 disabled:opacity-40;
}
.send-btn {
  @apply inline-flex h-9 min-w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 px-2.5 text-white shadow-lg shadow-indigo-500/30 transition hover:brightness-110 disabled:cursor-not-allowed disabled:from-slate-700 disabled:to-slate-700 disabled:shadow-none disabled:text-slate-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.send-btn--stop {
  @apply from-rose-500 to-rose-600 shadow-rose-500/30;
}
</style>
