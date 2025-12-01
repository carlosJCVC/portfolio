<template>
  <header id="home" class="relative min-h-screen flex items-center justify-center overflow-hidden">
    <div ref="vantaContainer" id="vanta-background" class="absolute inset-0"></div>

    <!-- Overlay for better text readability -->
    <div
      class="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-bg/90 pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 z-10 text-center relative">
      <h1
        class="text-6xl md:text-8xl font-extrabold mb-6 text-white tracking-tight"
        data-aos="fade-up"
      >
        {{ $t('header.title', { name: 'Carlos' }) }}
      </h1>
      <p
        class="text-2xl md:text-3xl mb-10 text-gray-300 font-light"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <span class="gradient-text font-semibold">Full Stack Developer</span>
      </p>

      <div data-aos="fade-up" data-aos-delay="400" class="flex justify-center gap-6">
        <a
          href="#contact"
          class="group relative px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold overflow-hidden shadow-lg hover:shadow-primary/50 transition-all duration-300"
        >
          <span class="relative z-10">{{ $t('header.contact') }}</span>
          <div
            class="absolute inset-0 h-full w-full scale-0 rounded-full transition-all duration-300 group-hover:scale-100 group-hover:bg-secondary/20"
          ></div>
        </a>

        <a
          href="#projects"
          class="px-8 py-4 border border-white/20 text-white rounded-full text-lg font-semibold hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        >
          View Work
        </a>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'

const vantaContainer = ref(null)
let vantaEffect = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    vantaEffect = NET({
      el: vantaContainer.value,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      color: 0x6366f1, // Primary color
      backgroundColor: 0x111827, // Dark bg
      points: 12.0,
      maxDistance: 22.0,
      spacing: 16.0,
      showDots: true
    })
  }
})

onBeforeUnmount(() => {
  if (vantaEffect) {
    vantaEffect.destroy()
  }
})
</script>

<style scoped>
/* Removed the SVG shape divider for a cleaner look */
</style>
