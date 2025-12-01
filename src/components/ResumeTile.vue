<template>
  <a
    :href="resumeUrl"
    download="Carlos_Veizaga_Resume.pdf"
    class="col-span-1 md:col-span-2 row-span-2 group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-white/10 dark:border-gray-700/50 bg-gradient-to-br from-primary to-secondary flex flex-col justify-between"
  >
    <!-- Animated Background Pattern -->
    <div class="absolute inset-0 opacity-20">
      <div class="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10">
      <div class="flex items-center justify-between mb-6">
        <div
          class="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500"
        >
          <i class="fas fa-file-alt"></i>
        </div>
        <div
          class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500"
        >
          <i class="fas fa-arrow-down"></i>
        </div>
      </div>

      <h3 class="text-3xl font-bold text-white mb-2">Download Resume</h3>
      <p class="text-white/80 text-lg max-w-xs">
        Grab a copy of my CV to see my full work history and qualifications.
      </p>
    </div>

    <!-- Pulsing "Hire Me" Badge -->
    <div
      class="absolute top-6 right-6 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-sm font-bold flex items-center gap-2 animate-pulse"
    >
      <span class="w-2 h-2 bg-green-400 rounded-full"></span>
      HIRE ME
    </div>

    <!-- Decorative Icon -->
    <i
      class="fas fa-file-contract absolute -bottom-8 -right-8 text-9xl text-white opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
    ></i>
  </a>
</template>

<script setup>
import resumeUrl from '@/assets/Carlos_Veizaga_Resume.pdf'
</script>
