<template>
  <div
    ref="cardRef"
    class="group relative rounded-2xl bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-gray-800 overflow-hidden transition-all duration-300 hover:-translate-y-1 flex flex-col"
    :class="{ 'md:col-span-2': project.featured }"
    :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
    :data-aos-delay="index * 100"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
  >
    <!-- Spotlight Effect -->
    <div
      class="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover:opacity-100 z-0"
      :style="spotlightStyle"
    ></div>

    <!-- Content -->
    <div class="relative h-full flex flex-col z-10">
      <!-- Image Area -->
      <div class="relative overflow-hidden" :class="project.featured ? 'aspect-[21/9]' : 'aspect-video'">
        <img
          :src="project.image"
          :alt="project.title"
          class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <!-- Overlay with Action -->
        <div
          class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px]"
        >
          <button
            @click="$emit('open-modal', project)"
            class="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 bg-white text-gray-900 px-6 py-2 rounded-full font-bold text-sm shadow-lg hover:scale-105"
          >
            {{ $t('projects.explore') }}
          </button>
        </div>
      </div>

      <!-- Details Area -->
      <div class="p-6 flex flex-col flex-grow">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h3
              class="text-xl font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors"
            >
              {{ project.title }}
            </h3>
            <span class="text-xs font-medium text-primary bg-primary/10 px-2 py-1 rounded-md">
              {{ project.category }}
            </span>
          </div>
          <!-- Tech Stack Icons -->
          <div class="flex -space-x-2 overflow-hidden">
            <div
              v-for="tech in project.technologies.slice(0, 4)"
              :key="tech"
              class="group/icon inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-dark-card bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-500 dark:text-gray-400 text-xs shadow-sm relative z-0 hover:z-10 transition-all hover:scale-110 cursor-help"
            >
              <i :class="getTechIcon(tech)"></i>
              
              <!-- Custom Tooltip -->
              <div class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-[10px] rounded opacity-0 group-hover/icon:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                {{ tech }}
                <div class="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
            <div
              v-if="project.technologies.length > 4"
              class="inline-block h-8 w-8 rounded-full ring-2 ring-white dark:ring-dark-card bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-xs font-bold text-gray-500 dark:text-gray-400"
            >
              +{{ project.technologies.length - 4 }}
            </div>
          </div>
        </div>

        <p
          class="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 line-clamp-2 flex-grow"
        >
          {{ project.description }}
        </p>

        <!-- Footer Actions -->
        <div
          class="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-800 mt-auto"
        >
          <div class="flex gap-4">
            <a
              v-if="project.displayLiveUrl"
              :href="project.liveUrl"
              target="_blank"
              class="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-1"
            >
              <i class="fas fa-external-link-alt"></i> {{ $t('projects.live') }}
            </a>
            <a
              v-if="project.displayGithubUrl"
              :href="project.githubUrl"
              target="_blank"
              class="text-gray-500 hover:text-primary transition-colors text-sm flex items-center gap-1"
            >
              <i class="fab fa-github"></i> Code
            </a>
          </div>
          <span v-if="project.featured" class="flex h-2 w-2">
            <span
              class="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-yellow-400 opacity-75"
            ></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-yellow-500"></span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})

const cardRef = ref(null)
const mouseX = ref(0)
const mouseY = ref(0)

const handleMouseMove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}

const handleMouseLeave = () => {
  mouseX.value = 0
  mouseY.value = 0
}

const spotlightStyle = computed(() => {
  return {
    background: `radial-gradient(600px circle at ${mouseX.value}px ${mouseY.value}px, rgba(var(--color-primary-rgb), 0.15), transparent 40%)`
  }
})

const getTechIcon = (tech) => {
  const map = {
    PHP: 'fab fa-php',
    Laravel: 'fab fa-laravel',
    Vue: 'fab fa-vuejs',
    'Vue.js': 'fab fa-vuejs',
    JavaScript: 'fab fa-js',
    React: 'fab fa-react',
    Angular: 'fab fa-angular',
    'Node.js': 'fab fa-node-js',
    Python: 'fab fa-python',
    Java: 'fab fa-java',
    Docker: 'fab fa-docker',
    AWS: 'fab fa-aws',
    CSS: 'fab fa-css3-alt',
    HTML: 'fab fa-html5',
    Sass: 'fab fa-sass',
    Bootstrap: 'fab fa-bootstrap',
    'Tailwind CSS': 'fas fa-wind',
    MySQL: 'fas fa-database',
    PostgreSQL: 'fas fa-database',
    MongoDB: 'fas fa-leaf',
    Git: 'fab fa-git-alt',
    Drupal: 'fab fa-drupal',
    JQuery: 'fas fa-code',
    Vite: 'fas fa-bolt',
    'Api Integration': 'fas fa-network-wired'
  }
  return map[tech] || 'fas fa-code'
}
</script>

<style scoped>
/* Custom RGB variable for spotlight color (primary color) */
.group {
  --color-primary-rgb:
    14, 165, 233; /* Example: Sky-500. Adjust to match your theme's primary color */
}
</style>
