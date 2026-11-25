<template>
  <button type="button" class="group flex flex-col items-center gap-2 focus:outline-none" :aria-label="label" @click="$emit('click')">
    <span :class="['action', `action--${tone}`, { 'action--bounce': bounce, 'action--small': small, 'action--active': active }]">
      <i :class="['fas', icon]" aria-hidden="true" />
    </span>
    <span v-if="label" class="text-xs text-slate-300">{{ label }}</span>
  </button>
</template>

<script setup>
defineProps({
  icon: { type: String, required: true },
  label: { type: String, default: '' },
  tone: { type: String, default: 'neutral' },
  bounce: { type: Boolean, default: false },
  small: { type: Boolean, default: false },
  active: { type: Boolean, default: false }
})
defineEmits(['click'])
</script>

<style scoped>
.action {
  @apply flex h-[72px] w-[72px] items-center justify-center rounded-full text-2xl text-white shadow-xl transition group-active:scale-95 group-focus-visible:ring-4 group-focus-visible:ring-white/40;
}
.action--small {
  @apply h-14 w-14 text-lg;
}
.action--success {
  @apply bg-emerald-500 shadow-emerald-500/40 group-hover:bg-emerald-400;
}
.action--danger {
  @apply bg-rose-500 shadow-rose-500/40 group-hover:bg-rose-400;
}
.action--neutral {
  @apply bg-white/10 shadow-black/30 backdrop-blur group-hover:bg-white/20;
}
.action--active {
  @apply bg-white text-slate-900 group-hover:bg-white/90;
}
.action--bounce {
  animation: nudge 1.4s ease-in-out infinite;
}
@keyframes nudge {
  0%,
  60%,
  100% {
    transform: translateY(0) rotate(0);
  }
  70% {
    transform: translateY(-6px) rotate(-12deg);
  }
  80% {
    transform: translateY(0) rotate(10deg);
  }
  90% {
    transform: translateY(-3px) rotate(-6deg);
  }
}
@media (prefers-reduced-motion: reduce) {
  .action--bounce {
    animation: none;
  }
}
</style>
