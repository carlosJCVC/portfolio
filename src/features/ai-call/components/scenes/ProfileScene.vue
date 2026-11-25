<template>
  <div class="flex flex-col items-center text-center">
    <div class="relative">
      <img :src="profile.avatar" :alt="profile.name" class="h-36 w-36 rounded-[2rem] object-cover shadow-2xl shadow-indigo-900/50" />
      <span v-if="profile.openToWork" class="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-emerald-400 px-3 py-1 text-xs font-bold text-emerald-950">
        {{ $t('aiAgent.widgets.openToWork') }}
      </span>
    </div>
    <p class="mt-8 text-2xl font-bold">{{ profile.role }}</p>
    <p class="mt-1 text-slate-400"><i class="fas fa-location-dot mr-1.5" aria-hidden="true" />{{ profile.location }}</p>
  </div>
</template>

<script setup>
defineProps({
  profile: { type: Object, required: true }
})
</script>
