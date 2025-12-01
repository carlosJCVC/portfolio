<template>
  <section
    id="contact"
    class="py-24 bg-white dark:bg-dark-card transition-colors duration-300 relative"
  >
    <div class="absolute inset-0 bg-grid-pattern opacity-5 pointer-events-none"></div>
    <div class="max-w-7xl mx-auto px-4 flex flex-wrap lg:flex-nowrap gap-12">
      <!-- Contact Form -->
      <div class="w-full lg:w-1/2" data-aos="fade-right">
        <GetInTouch></GetInTouch>
      </div>

      <!-- Social Links and About Me -->
      <div class="w-full lg:w-1/2" data-aos="fade-left">
        <ConnectWithMe></ConnectWithMe>
      </div>
    </div>
  </section>
</template>

<script setup>
import ConnectWithMe from './ConnectWithMe.vue'
import GetInTouch from './GetInTouch.vue'
</script>
