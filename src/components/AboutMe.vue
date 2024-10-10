<template>
  <section
    id="about-me"
    class="py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold text-center mb-16 gradient-text" data-aos="fade-down">
        {{ $t('info.about') }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
        <div class="lg:col-span-1" data-aos="fade-right">
          <AboutMeAvatar></AboutMeAvatar>
        </div>
        <div class="lg:col-span-2 space-y-6" data-aos="fade-left">
          <AboutMeDescription></AboutMeDescription>
        </div>
      </div>
      <div class="mt-16 text-center" data-aos="fade-up">
        <AboutMePhilosophy></AboutMePhilosophy>
      </div>
    </div>
  </section>
</template>

<script setup>
import AOS from 'aos'
import 'aos/dist/aos.css'
import AboutMeAvatar from './AboutMeAvatar.vue'
import AboutMeDescription from './AboutMeDescription.vue'
import AboutMePhilosophy from './AboutMePhilosophy.vue'

AOS.init({
  duration: 1000,
  once: true
})
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
