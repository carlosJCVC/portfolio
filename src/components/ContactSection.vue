<template>
  <section id="contact" class="py-16 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <div class="max-w-6xl mx-auto px-4 flex flex-wrap">
      <!-- Contact Form -->
      <div class="w-full lg:w-1/2 mb-12 lg:mb-0 lg:pr-8">
        <GetInTouch></GetInTouch>
      </div>

      <!-- Social Links and About Me -->
      <div class="w-full lg:w-1/2 lg:pl-8">
        <ConnectWithMe></ConnectWithMe>
      </div>
    </div>
  </section>
</template>

<script setup>
import ConnectWithMe from './ConnectWithMe.vue';
import GetInTouch from './GetInTouch.vue';

</script>
