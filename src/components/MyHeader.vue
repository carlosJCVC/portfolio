<template>
  <header id="home" class="relative min-h-screen flex items-center justify-center">
    <div ref="vantaContainer" id="vanta-background" class="absolute inset-0"></div>
    <div class="container mx-auto px-4 z-10 text-center">
      <h1 class="text-5xl md:text-7xl font-bold mb-4 text-white" data-aos="fade-up">
        {{ $t('header.title', { name: 'Carlos' }) }}
      </h1>
      <p class="text-xl md:text-2xl mb-8 text-indigo-200" data-aos="fade-up" data-aos-delay="200">
        Full Stack Developer
      </p>
      <a
        href="#contact"
        class="bg-white text-indigo-600 py-3 px-8 rounded-full text-lg font-semibold hover:bg-indigo-100 transition duration-300 inline-block"
        data-aos="fade-up"
        data-aos-delay="400"
        >{{ $t('header.contact') }}</a
      >
    </div>
    <div class="custom-shape-divider-bottom-1679213778">
      <svg
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          class="shape-fill"
        ></path>
      </svg>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import * as THREE from 'three'
import NET from 'vanta/dist/vanta.net.min'
// import BIRDS from 'vanta/dist/vanta.birds.min';

const vantaContainer = ref(null)
let vantaEffect = null

onMounted(() => {
  if (typeof window !== 'undefined') {
    // const THREE = await import('three');

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
      color: 0x3b82f6,
      backgroundColor: 0x111827,
      points: 10.0,
      maxDistance: 25.0,
      spacing: 18.0
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
.custom-shape-divider-bottom-1679213778 {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  overflow: hidden;
  line-height: 0;
}

.custom-shape-divider-bottom-1679213778 svg {
  position: relative;
  display: block;
  width: calc(100% + 1.3px);
  height: 150px;
}

.custom-shape-divider-bottom-1679213778 .shape-fill {
  fill: #ffffff;
}
</style>
