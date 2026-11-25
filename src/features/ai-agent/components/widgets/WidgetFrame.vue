<template>
  <section class="widget-frame">
    <header v-if="title" class="flex items-center justify-between gap-3 mb-4">
      <h3 class="flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-slate-400">
        <i v-if="icon" :class="['fas', icon, 'text-indigo-400']" aria-hidden="true" />
        {{ title }}
      </h3>
      <slot name="actions" />
    </header>
    <slot />
  </section>
</template>

<script setup>
defineProps({
  title: { type: String, default: '' },
  icon: { type: String, default: '' }
})
</script>

<style scoped>
.widget-frame {
  @apply relative rounded-2xl border border-white/10 bg-slate-900/60 p-4 sm:p-5 backdrop-blur-xl shadow-xl shadow-black/20;
  animation: widget-in 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

@keyframes widget-in {
  from {
    opacity: 0;
    transform: translateY(8px) scale(0.98);
  }
  to {
    opacity: 1;
    transform: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .widget-frame {
    animation: none;
  }
}
</style>
