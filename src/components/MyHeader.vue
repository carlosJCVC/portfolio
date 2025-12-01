<template>
  <section id="home" class="relative h-screen flex items-center justify-center overflow-hidden">
    <div ref="vantaRef" class="absolute inset-0 z-0"></div>

    <!-- Parallax Container -->
    <div
      class="relative z-10 text-center px-4 w-full max-w-5xl mx-auto"
      :style="{ transform: `translateY(${scrollY * 0.5}px)` }"
    >
      <!-- Terminal Window (Replaces Static Text) -->
      <div class="mb-12" data-aos="fade-up">
        <TerminalWindow />
      </div>

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

    <!-- Scroll Down Indicator -->
    <div
      class="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-20 animate-bounce"
      @click="scrollToAbout"
    >
      <div class="w-8 h-12 border-2 border-white/50 rounded-full flex justify-center p-2">
        <div class="w-1 h-3 bg-white/80 rounded-full animate-scroll-down"></div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
import TerminalWindow from './TerminalWindow.vue'

const vantaRef = ref(null)
let vantaEffect = null

// Parallax Logic
const scrollY = ref(0)
const handleScroll = () => {
  scrollY.value = window.scrollY
}

const scrollToAbout = () => {
  document.getElementById('about-me').scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  vantaEffect = NET({
    el: vantaRef.value,
    THREE: THREE,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    scale: 1.0,
    scaleMobile: 1.0,
    color: 0x6366f1,
    backgroundColor: 0x111827,
    points: 12.0,
    maxDistance: 22.0,
    spacing: 18.0
  })

  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  if (vantaEffect) vantaEffect.destroy()
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes scroll-down {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(8px);
    opacity: 0;
  }
}

.animate-scroll-down {
  animation: scroll-down 1.5s infinite;
}
</style>
