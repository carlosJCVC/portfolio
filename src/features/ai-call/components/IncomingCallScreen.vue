<template>
  <div class="relative flex h-full flex-col items-center justify-between px-6 pb-10 pt-16">
    <button
      type="button"
      class="absolute right-5 top-5 rounded-full border border-white/15 px-3 py-1 text-xs font-bold tracking-wider text-slate-300 hover:bg-white/10"
      @click="$emit('toggle-locale')"
    >
      {{ locale === 'es' ? 'ES' : 'EN' }}
    </button>
    <div class="flex flex-col items-center">
      <p class="mb-10 text-sm uppercase tracking-[0.25em] text-slate-400">{{ $t('aiCall.incoming.label') }}</p>
      <CallerIdentity ringing :subtitle="$t('aiCall.incoming.subtitle')" />
      <p class="mt-8 max-w-xs text-center text-sm text-slate-400">{{ $t('aiCall.incoming.hint') }}</p>
    </div>

    <div class="w-full">
      <div class="flex items-start justify-around">
        <CallActionButton icon="fa-phone-slash" tone="danger" :label="$t('aiCall.incoming.decline')" @click="$emit('decline')" />
        <CallActionButton icon="fa-phone" tone="success" bounce :label="$t('aiCall.incoming.answer')" @click="$emit('answer')" />
      </div>
      <RouterLink :to="{ name: 'classic' }" class="mt-8 block text-center text-xs text-slate-500 underline-offset-4 hover:text-slate-300 hover:underline">
        {{ $t('aiCall.incoming.skip') }}
      </RouterLink>
    </div>
  </div>
</template>

<script setup>
import CallerIdentity from './CallerIdentity.vue'
import CallActionButton from './CallActionButton.vue'

defineProps({
  locale: { type: String, required: true }
})
defineEmits(['answer', 'decline', 'toggle-locale'])
</script>
