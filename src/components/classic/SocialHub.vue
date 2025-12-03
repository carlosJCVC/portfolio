<template>
  <div
    class="bg-white dark:bg-dark-card rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 h-full flex flex-col gap-6"
  >
    <!-- Header -->
    <div>
      <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-1">Connect</h3>
      <p class="text-gray-500 dark:text-gray-400 text-sm">
        Find me on social media or download my resume.
      </p>
    </div>

    <!-- Resume Button (Full Width) -->
    <a
      :href="resumeUrl"
      download="Carlos_Veizaga_Resume.pdf"
      class="group relative overflow-hidden rounded-2xl p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-gradient-to-r from-primary to-secondary flex items-center justify-between"
    >
      <div class="flex items-center gap-4 relative z-10">
        <div
          class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white"
        >
          <i class="fas fa-file-alt"></i>
        </div>
        <div>
          <h3 class="font-bold text-white text-lg leading-tight">Download Resume</h3>
          <p class="text-white/80 text-xs">PDF Format</p>
        </div>
      </div>
      <div
        class="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-300"
      >
        <i class="fas fa-arrow-down"></i>
      </div>
    </a>

    <!-- Social Links (Grid) -->
    <div class="grid grid-cols-2 gap-3 flex-grow">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.link"
        target="_blank"
        @click="social.action && social.action()"
        class="group flex flex-col items-center justify-center gap-2 p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg/50 border border-gray-100 dark:border-gray-700/50 hover:border-primary/30 hover:bg-white dark:hover:bg-dark-bg transition-all duration-300 cursor-pointer"
      >
        <div
          class="w-8 h-8 rounded-full flex items-center justify-center text-lg transition-colors duration-300"
          :class="social.colorClass"
        >
          <i :class="social.icon"></i>
        </div>
        <span class="text-xs font-bold text-gray-600 dark:text-gray-300 group-hover:text-primary">
          {{ social.name }}
        </span>
      </a>
    </div>

    <!-- Location (Simple Row) -->
    <div
      class="flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-dark-bg/50 border border-gray-100 dark:border-gray-700/50"
    >
      <div
        class="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center text-red-500"
      >
        <i class="fas fa-map-marker-alt animate-bounce"></i>
      </div>
      <div>
        <h4 class="font-bold text-gray-900 dark:text-white text-sm">Cochabamba, Bolivia</h4>
        <p class="text-gray-500 dark:text-gray-400 text-xs">Open to remote work worldwide</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from 'vue-toastification'
import resumeUrl from '@/assets/Carlos_Veizaga_Resume.pdf'

const toast = useToast()

const copyEmail = () => {
  navigator.clipboard.writeText('carlos.veizaga.c@gmail.com')
  toast.success('Email copied to clipboard!')
}

const socials = [
  {
    name: 'Email',
    subtitle: 'carlos.veizaga.c@gmail.com',
    icon: 'fas fa-envelope',
    colorClass: 'bg-blue-50 text-blue-500 group-hover:bg-blue-500 group-hover:text-white',
    action: copyEmail
  },
  {
    name: 'LinkedIn',
    subtitle: 'Connect professionally',
    icon: 'fab fa-linkedin-in',
    link: 'https://www.linkedin.com/in/carlos-veizaga-c-62325310/',
    colorClass: 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
  },
  {
    name: 'GitHub',
    subtitle: 'Review my code',
    icon: 'fab fa-github',
    link: 'https://github.com/carlosJCVC',
    colorClass: 'bg-purple-50 text-purple-500 group-hover:bg-purple-500 group-hover:text-white'
  },
  {
    name: 'Location',
    subtitle: 'Cochabamba, Bolivia',
    icon: 'fas fa-map-marker-alt',
    colorClass: 'bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
  }
]
</script>
