<template>
  <div class="flex h-full flex-col overflow-y-auto px-6 pb-8 pt-14">
    <div class="flex flex-col items-center text-center">
      <span :class="['flex h-12 w-12 items-center justify-center rounded-full', missed ? 'bg-rose-500/15 text-rose-300' : 'bg-white/10 text-slate-300']">
        <i :class="['fas', missed ? 'fa-phone-slash' : 'fa-phone']" aria-hidden="true" />
      </span>
      <p class="mt-3 text-sm uppercase tracking-[0.2em] text-slate-400">
        {{ missed ? $t('aiCall.summary.missed') : $t('aiCall.summary.ended', { duration }) }}
      </p>
      <CallerIdentity class="mt-6" :size="96" :subtitle="missed ? $t('aiCall.summary.voicemail') : $t('aiCall.summary.thanks')" />
    </div>

    <button type="button" class="callback" @click="$emit('call-back')">
      <i class="fas fa-phone" aria-hidden="true" />{{ missed ? $t('aiCall.summary.listen') : $t('aiCall.summary.callBack') }}
    </button>
    <button type="button" class="mt-3 flex items-center justify-center gap-2 rounded-2xl border border-teal-300/30 py-3.5 text-sm font-semibold text-teal-200 hover:bg-teal-300/10" @click="$emit('scan-job')">
      <i class="fas fa-camera" aria-hidden="true" />{{ $t('aiCall.cta.scanTitle') }}
    </button>

    <ContactActions class="mt-6" />

    <nav class="mt-8 flex justify-center gap-6 text-sm text-slate-400">
      <RouterLink :to="{ name: 'ai-agent' }" class="hover:text-white">{{ $t('aiCall.summary.chat') }}</RouterLink>
      <RouterLink :to="{ name: 'classic' }" class="hover:text-white">{{ $t('aiCall.summary.classic') }}</RouterLink>
    </nav>
  </div>
</template>

<script setup>
import CallerIdentity from './CallerIdentity.vue'
import ContactActions from './ContactActions.vue'

defineProps({
  missed: { type: Boolean, default: false },
  duration: { type: String, default: '' }
})
defineEmits(['call-back', 'scan-job'])
</script>

<style scoped>
.callback {
  @apply mt-8 flex items-center justify-center gap-2 rounded-2xl bg-emerald-500 py-4 font-semibold shadow-lg shadow-emerald-500/30 transition active:scale-[0.98] hover:bg-emerald-400;
}
</style>
