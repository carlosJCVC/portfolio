<template>
  <span :class="['agent-avatar', { 'agent-avatar--active': active }]" :style="{ width: `${size}px`, height: `${size}px` }">
    <span class="agent-avatar__ring" aria-hidden="true" />
    <img :src="profile.avatar" :alt="alt" class="agent-avatar__img" />
    <span class="agent-avatar__badge" aria-hidden="true"><i class="fas fa-wand-magic-sparkles" /></span>
  </span>
</template>

<script setup>
import { profile } from '@/data/profile'

defineProps({
  size: { type: Number, default: 36 },
  active: { type: Boolean, default: false },
  alt: { type: String, default: '' }
})
</script>

<style scoped>
.agent-avatar {
  @apply relative inline-flex shrink-0;
}
.agent-avatar__img {
  @apply relative h-full w-full rounded-full object-cover ring-2 ring-slate-900;
}
.agent-avatar__ring {
  @apply absolute -inset-[3px] rounded-full opacity-70;
  background: conic-gradient(from 0deg, #6366f1, #2dd4bf, #a855f7, #6366f1);
}
.agent-avatar--active .agent-avatar__ring {
  @apply opacity-100;
  animation: spin 1.6s linear infinite;
}
.agent-avatar__badge {
  @apply absolute -bottom-0.5 -right-0.5 flex h-[40%] w-[40%] min-h-3.5 min-w-3.5 items-center justify-center rounded-full bg-indigo-500 text-[8px] text-white ring-2 ring-slate-950;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: reduce) {
  .agent-avatar--active .agent-avatar__ring {
    animation: none;
  }
}
</style>
