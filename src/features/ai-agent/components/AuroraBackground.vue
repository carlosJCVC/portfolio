<template>
  <div class="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
    <div class="grid-overlay" />
    <div class="orb orb--indigo" />
    <div class="orb orb--teal" />
    <div class="orb orb--violet" />
  </div>
</template>

<style scoped>
.grid-overlay {
  @apply absolute inset-0 opacity-[0.07];
  background-image: linear-gradient(rgb(255 255 255 / 0.5) 1px, transparent 1px),
    linear-gradient(90deg, rgb(255 255 255 / 0.5) 1px, transparent 1px);
  background-size: 48px 48px;
  mask-image: radial-gradient(ellipse at 50% 30%, black 20%, transparent 70%);
}
.orb {
  @apply absolute rounded-full blur-3xl;
  animation: drift 22s ease-in-out infinite alternate;
}
.orb--indigo {
  @apply -top-40 left-[10%] h-[28rem] w-[28rem] bg-indigo-600/25;
}
.orb--teal {
  @apply top-1/3 -right-32 h-[24rem] w-[24rem] bg-teal-500/15;
  animation-delay: -7s;
}
.orb--violet {
  @apply -bottom-40 left-1/3 h-[26rem] w-[26rem] bg-violet-600/15;
  animation-delay: -14s;
}
@keyframes drift {
  to {
    transform: translate(40px, 30px) scale(1.08);
  }
}
@media (prefers-reduced-motion: reduce) {
  .orb {
    animation: none;
  }
}
</style>
