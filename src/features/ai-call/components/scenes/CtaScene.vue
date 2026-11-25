<template>
  <div class="flex w-full flex-col gap-3">
    <button type="button" class="cta cta--primary" @click="$emit('scan-job')">
      <i class="fas fa-camera text-xl" aria-hidden="true" />
      <span class="text-left">
        <span class="block font-semibold">{{ $t('aiCall.cta.scanTitle') }}</span>
        <span class="block text-xs text-white/80">{{ $t('aiCall.cta.scanText') }}</span>
      </span>
    </button>
    <button type="button" class="cta" @click="$emit('ask')">
      <i class="fas fa-microphone text-xl text-teal-300" aria-hidden="true" />
      <span class="text-left">
        <span class="block font-semibold">{{ $t('aiCall.cta.askTitle') }}</span>
        <span class="block text-xs text-slate-400">{{ $t('aiCall.cta.askText') }}</span>
      </span>
    </button>
  </div>
</template>

<script setup>
defineEmits(['scan-job', 'ask'])
</script>

<style scoped>
.cta {
  @apply flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-5 py-4 transition active:scale-[0.98] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.cta--primary {
  @apply border-transparent bg-gradient-to-r from-indigo-500 to-teal-500 shadow-lg shadow-indigo-500/30 hover:brightness-110;
}
</style>
