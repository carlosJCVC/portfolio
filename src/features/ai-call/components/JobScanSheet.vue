<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm" @click="close" />
    </Transition>
    <Transition name="sheet">
      <section
        v-if="open"
        class="fixed inset-x-0 bottom-0 z-50 mx-auto max-h-[90dvh] max-w-[440px] overflow-y-auto rounded-t-[2rem] border-t border-white/10 bg-slate-900 px-5 pb-8 pt-3 text-white shadow-2xl"
        role="dialog"
        aria-modal="true"
        :aria-label="$t('aiCall.scan.title')"
      >
        <div class="mx-auto mb-4 h-1.5 w-12 rounded-full bg-white/20" aria-hidden="true" />
        <h2 class="text-lg font-bold">{{ $t('aiCall.scan.title') }}</h2>
        <p class="mt-1 text-sm text-slate-400">{{ $t('aiCall.scan.subtitle') }}</p>

        <div v-if="step === 'pick'" class="mt-5 grid grid-cols-2 gap-3">
          <label class="pick">
            <i class="fas fa-camera text-2xl text-teal-300" aria-hidden="true" />
            <span>{{ $t('aiCall.scan.camera') }}</span>
            <input type="file" accept="image/*" capture="environment" class="sr-only" @change="onImage" />
          </label>
          <label class="pick">
            <i class="fas fa-image text-2xl text-indigo-300" aria-hidden="true" />
            <span>{{ $t('aiCall.scan.gallery') }}</span>
            <input type="file" accept="image/*" class="sr-only" @change="onImage" />
          </label>
          <button type="button" class="pick col-span-2 !flex-row !py-3" @click="step = 'review'">
            <i class="fas fa-paste text-indigo-300" aria-hidden="true" />
            <span>{{ $t('aiCall.scan.paste') }}</span>
          </button>
        </div>

        <div v-else-if="step === 'reading'" class="mt-6 flex flex-col items-center gap-4 py-6">
          <div class="relative h-40 w-32 overflow-hidden rounded-xl border border-white/10">
            <img v-if="preview" :src="preview" alt="" class="h-full w-full object-cover opacity-60" />
            <span class="scan-line" aria-hidden="true" />
          </div>
          <p class="text-sm text-slate-300">{{ $t('aiCall.scan.reading') }} {{ Math.round(progress * 100) }}%</p>
        </div>

        <div v-else class="mt-4">
          <p v-if="error" class="mb-3 rounded-xl bg-amber-400/10 px-3 py-2 text-sm text-amber-200">{{ error }}</p>
          <textarea
            v-model="text"
            rows="8"
            maxlength="5000"
            :placeholder="$t('aiAgent.composer.jobPlaceholder')"
            class="w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-slate-500 focus:border-teal-300/50 focus:outline-none"
          />
          <div class="mt-3 flex gap-2">
            <button type="button" class="flex-1 rounded-full border border-white/10 py-3 text-sm text-slate-300" @click="reset">
              {{ $t('aiCall.scan.retake') }}
            </button>
            <button
              type="button"
              class="flex-[2] rounded-full bg-gradient-to-r from-indigo-500 to-teal-500 py-3 text-sm font-semibold disabled:opacity-40"
              :disabled="text.trim().length < 40"
              @click="analyze"
            >
              {{ $t('aiAgent.composer.analyze') }}
            </button>
          </div>
        </div>
      </section>
    </Transition>
  </Teleport>
</template>

<script setup>
import { onBeforeUnmount, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { recognizeText } from '../services/textRecognition'

const props = defineProps({
  open: { type: Boolean, default: false }
})
const emit = defineEmits(['close', 'analyze'])

const { t, locale } = useI18n()
const step = ref('pick')
const text = ref('')
const progress = ref(0)
const preview = ref('')
const error = ref('')

const releasePreview = () => {
  if (preview.value) URL.revokeObjectURL(preview.value)
  preview.value = ''
}

const reset = () => {
  releasePreview()
  step.value = 'pick'
  text.value = ''
  error.value = ''
  progress.value = 0
}

const close = () => emit('close')

const onImage = async (event) => {
  const [file] = event.target.files ?? []
  event.target.value = ''
  if (!file) return
  releasePreview()
  preview.value = URL.createObjectURL(file)
  step.value = 'reading'
  progress.value = 0
  try {
    text.value = await recognizeText(file, { locale: locale.value, onProgress: (value) => (progress.value = value) })
    error.value = text.value.length < 40 ? t('aiCall.scan.lowConfidence') : ''
  } catch {
    error.value = t('aiCall.scan.failed')
  }
  step.value = 'review'
}

const analyze = () => {
  emit('analyze', text.value.trim())
  reset()
}

watch(
  () => props.open,
  (isOpen) => !isOpen && step.value !== 'reading' && reset()
)
onBeforeUnmount(releasePreview)
</script>

<style scoped>
.pick {
  @apply flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 py-6 text-sm font-medium transition hover:bg-white/10 focus-within:ring-2 focus-within:ring-teal-300;
}
.scan-line {
  @apply absolute inset-x-0 h-1 bg-teal-300 shadow-[0_0_16px_4px] shadow-teal-300/60;
  animation: scan 1.6s ease-in-out infinite alternate;
}
@keyframes scan {
  from {
    top: 0;
  }
  to {
    top: calc(100% - 4px);
  }
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.sheet-enter-active,
.sheet-leave-active {
  transition: transform 0.35s cubic-bezier(0.2, 0.8, 0.2, 1);
}
.sheet-enter-from,
.sheet-leave-to {
  transform: translateY(100%);
}
</style>
