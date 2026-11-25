<template>
  <div class="px-4 pb-4">
    <p v-if="listening" class="mb-3 min-h-[1.5rem] text-center text-sm text-teal-200" aria-live="polite">
      {{ transcript || $t('aiCall.voice.listening') }}
    </p>

    <form v-if="typing || !voiceSupported" class="flex items-center gap-2" @submit.prevent="submitText">
      <input
        ref="input"
        v-model="draft"
        type="text"
        maxlength="500"
        :placeholder="$t('aiCall.voice.placeholder')"
        class="min-w-0 flex-1 rounded-full border border-white/10 bg-white/10 px-4 py-3 text-[15px] text-white placeholder:text-slate-400 focus:border-teal-300/50 focus:outline-none"
      />
      <button type="submit" class="send" :disabled="busy || !draft.trim()" :aria-label="$t('aiAgent.composer.send')">
        <i class="fas fa-arrow-up" aria-hidden="true" />
      </button>
      <button v-if="voiceSupported" type="button" class="mode" :aria-label="$t('aiCall.voice.useVoice')" @click="typing = false">
        <i class="fas fa-microphone" aria-hidden="true" />
      </button>
    </form>

    <div v-else class="flex items-center justify-center gap-6">
      <button type="button" class="mode" :aria-label="$t('aiCall.voice.useKeyboard')" @click="openKeyboard">
        <i class="fas fa-keyboard" aria-hidden="true" />
      </button>
      <button
        type="button"
        :class="['mic', { 'mic--live': listening }]"
        :disabled="busy && !listening"
        :aria-label="listening ? $t('aiCall.voice.stop') : $t('aiCall.voice.talk')"
        @click="$emit(listening ? 'stop-listening' : 'start-listening')"
      >
        <i :class="['fas', listening ? 'fa-stop' : 'fa-microphone']" aria-hidden="true" />
      </button>
      <button type="button" class="mode" :aria-label="$t('aiCall.controls.scan')" @click="$emit('scan-job')">
        <i class="fas fa-camera" aria-hidden="true" />
      </button>
    </div>
    <p v-if="!typing && voiceSupported && !listening" class="mt-2 text-center text-xs text-slate-500">{{ $t('aiCall.voice.hint') }}</p>
  </div>
</template>

<script setup>
import { nextTick, ref } from 'vue'

defineProps({
  voiceSupported: { type: Boolean, default: false },
  listening: { type: Boolean, default: false },
  transcript: { type: String, default: '' },
  busy: { type: Boolean, default: false }
})
const emit = defineEmits(['send', 'start-listening', 'stop-listening', 'scan-job'])

const typing = ref(false)
const draft = ref('')
const input = ref(null)

const openKeyboard = () => {
  typing.value = true
  nextTick(() => input.value?.focus())
}

const submitText = () => {
  const text = draft.value.trim()
  if (!text) return
  emit('send', text)
  draft.value = ''
}
</script>

<style scoped>
.mic {
  @apply flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 text-2xl text-white shadow-xl shadow-indigo-500/40 transition active:scale-95 disabled:opacity-40 focus:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/50;
}
.mic--live {
  @apply from-rose-500 to-rose-600 shadow-rose-500/40;
  animation: breathe 1.2s ease-in-out infinite;
}
.mode {
  @apply flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/10 text-slate-200 transition hover:bg-white/20 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.send {
  @apply flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-teal-500 text-white disabled:from-slate-700 disabled:to-slate-700 disabled:text-slate-400;
}
@keyframes breathe {
  0%,
  100% {
    box-shadow: 0 0 0 0 rgb(244 63 94 / 0.5);
  }
  50% {
    box-shadow: 0 0 0 16px rgb(244 63 94 / 0);
  }
}
</style>
