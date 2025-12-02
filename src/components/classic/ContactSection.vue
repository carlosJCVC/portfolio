<template>
  <section
    id="contact"
    class="py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div
      class="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-5xl font-extrabold gradient-text mb-6">Start a Conversation</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interested in my work? Let's discuss how I can add value to your team.
        </p>
      </div>

      <!-- Main Contact Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 2xl:gap-20 max-w-6xl mx-auto">
        <!-- Left Column: Contact Form -->
        <div data-aos="fade-right">
          <ContactForm />
        </div>

        <!-- Right Column: Social Hub -->
        <div data-aos="fade-left" data-aos-delay="100">
          <SocialHub />
        </div>
      </div>

      <!-- Footer Tech Stack -->
      <div class="mt-20 pt-8 border-t border-gray-200 dark:border-gray-800 text-center">
        <p class="text-gray-500 dark:text-gray-400 text-sm mb-4">
          Designed & Built with <span class="text-red-500">❤️</span> using
        </p>
        <div class="flex justify-center gap-6 text-2xl text-gray-400 dark:text-gray-600">
          <i class="fab fa-vuejs hover:text-green-500 transition-colors" title="Vue.js"></i>
          <i class="fas fa-wind hover:text-teal-400 transition-colors" title="Tailwind CSS"></i>
          <i class="fab fa-js hover:text-yellow-400 transition-colors" title="JavaScript"></i>
          <i class="fas fa-bolt hover:text-purple-500 transition-colors" title="Vite"></i>
        </div>
        <p class="text-gray-400 dark:text-gray-600 text-xs mt-6">
          © {{ new Date().getFullYear() }} Carlos Veizaga. All rights reserved.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import ContactForm from './ContactForm.vue'
import SocialHub from './SocialHub.vue'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
