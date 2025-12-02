<template>
  <div class="flex flex-col gap-6 h-full">
    <!-- Resume Download Card (Top) -->
    <a
      :href="resumeUrl"
      download="Carlos_Veizaga_Resume.pdf"
      class="group relative overflow-hidden rounded-3xl p-8 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-white/10 dark:border-gray-700/50 bg-gradient-to-br from-primary to-secondary flex flex-col justify-between min-h-[200px]"
    >
      <!-- Animated Background Pattern -->
      <div class="absolute inset-0 opacity-20">
        <div class="absolute inset-0 bg-grid-white/[0.2] bg-[length:20px_20px]"></div>
      </div>

      <!-- Content -->
      <div class="relative z-10 flex flex-col h-full justify-between">
        <div class="flex items-center justify-between">
          <div
            class="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-500"
          >
            <i class="fas fa-file-alt"></i>
          </div>
          <div
            class="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white group-hover:rotate-45 transition-transform duration-500"
          >
            <i class="fas fa-arrow-down"></i>
          </div>
        </div>

        <div>
          <h3 class="text-2xl font-bold text-white mb-1">Download Resume</h3>
          <p class="text-white/80 text-sm">Get my full CV & work history.</p>
        </div>
      </div>

      <!-- Pulsing "Hire Me" Badge -->
      <div
        class="absolute top-6 right-6 px-3 py-1 bg-white/20 backdrop-blur-md rounded-full border border-white/30 text-white text-xs font-bold flex items-center gap-1.5 animate-pulse"
      >
        <span class="w-1.5 h-1.5 bg-green-400 rounded-full"></span>
        HIRE ME
      </div>

      <!-- Decorative Icon -->
      <i
        class="fas fa-file-contract absolute -bottom-6 -right-6 text-8xl text-white opacity-10 rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none"
      ></i>
    </a>

    <!-- Social Links Grid (Middle) -->
    <div class="grid grid-cols-2 gap-4">
      <a
        v-for="social in socials"
        :key="social.name"
        :href="social.link"
        target="_blank"
        @click="social.action && social.action()"
        class="group flex items-center gap-3 p-4 rounded-2xl bg-white dark:bg-dark-card border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-pointer"
      >
        <div
          class="w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors duration-300"
          :class="social.colorClass"
        >
          <i :class="social.icon"></i>
        </div>
        <div class="flex-grow">
          <h4
            class="font-bold text-gray-900 dark:text-white text-sm group-hover:text-primary transition-colors"
          >
            {{ social.name }}
          </h4>
          <p class="text-xs text-gray-500 dark:text-gray-400">{{ social.subtitle }}</p>
        </div>
        <i
          v-if="!social.action"
          class="fas fa-external-link-alt text-xs text-gray-400 group-hover:text-primary transition-colors"
        ></i>
        <i
          v-else
          class="fas fa-copy text-xs text-gray-400 group-hover:text-primary transition-colors"
        ></i>
      </a>
    </div>

    <!-- Location Map (Bottom) -->
    <div
      class="flex-grow rounded-3xl overflow-hidden border border-gray-100 dark:border-gray-800 shadow-sm min-h-[200px] relative group"
    >
      <img
        src="https://placehold.co/600x400/1e293b/ffffff?text=Cochabamba,+Bolivia"
        alt="Location Map"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6"
      >
        <div class="text-white">
          <div class="flex items-center gap-2 mb-1">
            <i class="fas fa-map-marker-alt text-red-500 animate-bounce"></i>
            <h4 class="font-bold text-lg">Cochabamba, Bolivia</h4>
          </div>
          <p class="text-white/80 text-sm">Open to remote opportunities worldwide.</p>
        </div>
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
