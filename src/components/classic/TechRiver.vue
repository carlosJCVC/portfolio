<template>
  <div class="w-full py-10 overflow-hidden relative bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
    <!-- Gradient Masks -->
    <div
      class="absolute top-0 bottom-0 left-0 w-32 z-10 bg-gradient-to-r from-gray-50 dark:from-dark-bg to-transparent pointer-events-none"
    ></div>
    <div
      class="absolute top-0 bottom-0 right-0 w-32 z-10 bg-gradient-to-l from-gray-50 dark:from-dark-bg to-transparent pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl mb-10">
      <div class="text-center" data-aos="fade-down">
        <h2 class="text-3xl md:text-4xl font-extrabold gradient-text mb-4">
          {{ $t('skills.technologies') || 'Technologies & Tools' }}
        </h2>
        <p class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My preferred stack for building scalable applications.
        </p>
      </div>
    </div>

    <!-- Row 1: Left to Right -->
    <div class="flex mb-8 relative">
      <div class="animate-marquee-left flex items-center gap-8 whitespace-nowrap">
        <div v-for="(tool, index) in row1" :key="index" class="tech-item group">
          <div class="tech-icon-wrapper">
            <img :src="tool.icon" :alt="tool.name" class="tech-icon" />
          </div>
          <span class="tech-name">{{ tool.name }}</span>
        </div>
        <!-- Duplicate for seamless loop -->
        <div v-for="(tool, index) in row1" :key="'clone-' + index" class="tech-item group">
          <div class="tech-icon-wrapper">
            <img :src="tool.icon" :alt="tool.name" class="tech-icon" />
          </div>
          <span class="tech-name">{{ tool.name }}</span>
        </div>
      </div>
    </div>

    <!-- Row 2: Right to Left -->
    <div class="flex relative">
      <div class="animate-marquee-right flex items-center gap-8 whitespace-nowrap">
        <div v-for="(tool, index) in row2" :key="index" class="tech-item group">
          <div class="tech-icon-wrapper">
            <img :src="tool.icon" :alt="tool.name" class="tech-icon" />
          </div>
          <span class="tech-name">{{ tool.name }}</span>
        </div>
        <!-- Duplicate for seamless loop -->
        <div v-for="(tool, index) in row2" :key="'clone-' + index" class="tech-item group">
          <div class="tech-icon-wrapper">
            <img :src="tool.icon" :alt="tool.name" class="tech-icon" />
          </div>
          <span class="tech-name">{{ tool.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DockerIcon from '@/assets/icons/docker-mark-blue.svg'
import GitIcon from '@/assets/icons/git-icon.svg'
import WebpackIcon from '@/assets/icons/icon.svg'
import PostmanIcon from '@/assets/icons/postman-logo-orange-stacked.svg'
import HTMLIcon from '@/assets/icons/html-5.svg'
import CSSIcon from '@/assets/icons/css-3.svg'
import AngularIcon from '@/assets/icons/angular-icon.svg'
import ReactIcon from '@/assets/icons/react.svg'
import VueIcon from '@/assets/icons/vue.svg'
import FlutterIcon from '@/assets/icons/flutter.svg'
import PHPIcon from '@/assets/icons/php.svg'
import LaravelIcon from '@/assets/icons/laravel.svg'
import WordpressIcon from '@/assets/icons/wordpress-icon.svg'
import DrupalIcon from '@/assets/icons/drupal-icon.svg'
import NodeIcon from '@/assets/icons/nodejs-icon.svg'
import NestIcon from '@/assets/icons/nestjs.svg'

const row1 = [
  { name: 'Vue.js', icon: VueIcon },
  { name: 'React', icon: ReactIcon },
  { name: 'Angular', icon: AngularIcon },
  { name: 'Node.js', icon: NodeIcon },
  { name: 'NestJS', icon: NestIcon },
  { name: 'Laravel', icon: LaravelIcon },
  { name: 'PHP', icon: PHPIcon },
  { name: 'Python', icon: WebpackIcon }, // Placeholder
  { name: 'Java', icon: WebpackIcon } // Placeholder
]

const row2 = [
  { name: 'Docker', icon: DockerIcon },
  { name: 'Git', icon: GitIcon },
  { name: 'AWS', icon: WebpackIcon }, // Placeholder
  { name: 'Flutter', icon: FlutterIcon },
  { name: 'React Native', icon: ReactIcon },
  { name: 'Postman', icon: PostmanIcon },
  { name: 'WordPress', icon: WordpressIcon },
  { name: 'Drupal', icon: DrupalIcon },
  { name: 'HTML5', icon: HTMLIcon },
  { name: 'CSS3', icon: CSSIcon }
]
</script>

<style scoped>
.animate-marquee-left {
  animation: marqueeLeft 40s linear infinite;
  will-change: transform;
}

.animate-marquee-right {
  animation: marqueeRight 40s linear infinite;
  will-change: transform;
}

@keyframes marqueeLeft {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

@keyframes marqueeRight {
  0% {
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}

.tech-item {
  @apply flex items-center gap-3 px-6 py-3 rounded-full bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm transition-all duration-200 hover:scale-110 hover:shadow-md hover:border-primary/30 cursor-default;
}

.tech-icon-wrapper {
  @apply w-8 h-8 flex items-center justify-center;
}

.tech-icon {
  @apply w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300;
}

.tech-name {
  @apply text-sm font-medium text-gray-500 dark:text-gray-400 group-hover:text-primary transition-colors;
}

/* Pause on hover */
.w-full:hover .animate-marquee-left,
.w-full:hover .animate-marquee-right {
  animation-play-state: paused;
}
</style>
