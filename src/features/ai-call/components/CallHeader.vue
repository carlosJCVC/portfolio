<template>
  <header class="flex items-center gap-3 px-5 pb-3 pt-6">
    <img :src="profile.avatar" :alt="profile.name" class="h-11 w-11 rounded-full object-cover ring-2 ring-teal-300/40" />
    <div class="min-w-0 flex-1">
      <p class="truncate font-semibold">{{ profile.name }}</p>
      <p class="flex items-center gap-2 text-xs text-slate-400">
        <span class="tabular-nums text-emerald-300">{{ duration }}</span>
        <span>·</span>
        <span class="truncate">{{ status }}</span>
      </p>
    </div>
    <SoundWave :active="speaking" />
  </header>
</template>

<script setup>
import { profile } from '@/data/profile'
import SoundWave from './SoundWave.vue'

defineProps({
  duration: { type: String, required: true },
  status: { type: String, required: true },
  speaking: { type: Boolean, default: false }
})
</script>
