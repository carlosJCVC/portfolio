<template>
  <section id="about-me" class="py-24 bg-white dark:bg-dark-bg relative overflow-hidden">
    <!-- Decorative elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      <div
        class="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse"
      ></div>
      <div
        class="absolute top-1/2 -left-24 w-72 h-72 bg-secondary/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 1s"
      ></div>
      <div
        class="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s"
      ></div>

      <!-- Grid Pattern -->
      <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
    </div>

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
      <div class="text-center mb-20">
        <h2
          class="text-5xl md:text-6xl font-extrabold mb-6 gradient-text inline-block tracking-tight"
          data-aos="fade-down"
        >
          {{ $t('info.about') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-24">
        <!-- Left: Avatar (Keep existing) -->
        <div class="lg:col-span-4 flex justify-center" data-aos="fade-right">
          <AboutMeAvatar></AboutMeAvatar>
        </div>

        <!-- Right: IDE Window (Replaces Description) -->
        <div class="lg:col-span-8" data-aos="fade-left">
          <div class="prose prose-lg dark:prose-invert max-w-none">
            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300 mb-6">
              {{ $t('info.description_1') }}
            </p>
            <p class="text-xl leading-relaxed text-gray-600 dark:text-gray-300">
              {{ $t('info.description_2') }}
            </p>
          </div>
        </div>
      </div>

      <div data-aos="fade-up">
        <AboutMePhilosophy></AboutMePhilosophy>
      </div>
    </div>
  </section>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import AboutMeAvatar from './AboutMeAvatar.vue'

import AboutMePhilosophy from './AboutMePhilosophy.vue'

AOS.init({
  duration: 1000,
  once: true
})
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
