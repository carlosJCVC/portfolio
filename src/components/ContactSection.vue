<template>
  <section
    id="contact"
    class="py-24 bg-gray-50 dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div
      class="absolute inset-0 bg-grid-pattern opacity-[0.02] dark:opacity-[0.03] pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
      <!-- Section Header -->
      <div class="text-center mb-16" data-aos="fade-down">
        <h2 class="text-4xl md:text-5xl font-extrabold gradient-text mb-6">Start a Conversation</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Interested in my work? Let's discuss how I can add value to your team.
        </p>
      </div>

      <!-- Recruiter Command Center Grid -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mx-auto">
        <!-- 1. Contact Form (Left - 2x2) -->
        <ContactForm data-aos="fade-right" data-aos-delay="0" />

        <!-- 2. Resume Download (Right - 2x2) -->
        <ResumeTile data-aos="fade-left" data-aos-delay="100" />

        <!-- 3. Email (1x1) -->
        <ContactBentoItem
          title="Email"
          subtitle="carlos.veizaga.c@gmail.com"
          icon="fas fa-envelope"
          size="1x1"
          color="blue"
          is-copy
          copy-value="carlos.veizaga.c@gmail.com"
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <!-- 4. LinkedIn (1x1) -->
        <ContactBentoItem
          title="LinkedIn"
          subtitle="Connect professionally"
          icon="fab fa-linkedin-in"
          size="1x1"
          color="blue"
          link="https://www.linkedin.com/in/carlos-veizaga-c-62325310/"
          data-aos="fade-up"
          data-aos-delay="300"
        />

        <!-- 5. GitHub (1x1) -->
        <ContactBentoItem
          title="GitHub"
          subtitle="Review my code"
          icon="fab fa-github"
          size="1x1"
          color="purple"
          link="https://github.com/carlosJCVC"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        <!-- 6. Location (1x1) -->
        <ContactBentoItem
          title="Location"
          subtitle="Cochabamba, Bolivia"
          icon="fas fa-map-marker-alt"
          size="1x1"
          color="orange"
          data-aos="fade-up"
          data-aos-delay="500"
        />
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
import ContactBentoItem from './ContactBentoItem.vue'
import ResumeTile from './ResumeTile.vue'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
