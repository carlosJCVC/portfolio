<template>
  <div class="relative flex h-dvh w-full items-center justify-center overflow-hidden bg-slate-950 sm:p-6">
    <div class="ambient" aria-hidden="true" />
    <div class="phone">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.ambient {
  @apply pointer-events-none absolute inset-0;
  background: radial-gradient(circle at 20% 10%, rgb(99 102 241 / 0.25), transparent 45%),
    radial-gradient(circle at 80% 90%, rgb(45 212 191 / 0.18), transparent 45%);
}
.phone {
  @apply relative flex h-full w-full flex-col overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white sm:h-[min(880px,94dvh)] sm:max-w-[410px] sm:rounded-[2.75rem] sm:border sm:border-white/10 sm:shadow-2xl sm:shadow-indigo-950/60;
}
</style>
