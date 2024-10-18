<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
    <ParticlesBackground />

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-6xl font-extrabold text-center mb-16 gradient-text tracking-tight" data-aos="fade-down">
        {{ $t('projects.title') }}
      </h2>

      <ProjectFilter :categories="categories" :activeCategory="activeCategory" @filter="filterProjects" />

      <TransitionGroup tag="div" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" :css="false"
        @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
        <ProjectCard v-for="(project, index) in filteredProjects" :key="project.id" :project="project" :index="index"
          @open-modal="openModal" />
      </TransitionGroup>

      <div class="text-center mt-16">
        <button @click="showAllProjects"
          class="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transform hover:scale-105 shadow-lg">
          {{ showAll ? $t('projects.show_less') : $t('projects.more_projects') }}
        </button>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { gsap } from 'gsap'
import AOS from 'aos'
import 'aos/dist/aos.css'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import ProjectFilter from './ProjectFilter.vue'
import ParticlesBackground from './ParticlesBackground.vue'
import ElfecImage from '@/assets/images/projects/elfec.png'
import Educertify from '@/assets/images/projects/educertify.webp'
import AnimeHeroChallenge from '@/assets/images/projects/Anime_Hero_Challenge_600x400.png'

const { t } = useI18n()

AOS.init({
  duration: 1000,
  once: true
})

const allProjects = computed(() => [
  {
    id: 1,
    title: 'ELFEC',
    description: computed(() => t('projects.list.elfec.short_description')),
    fullDescription: computed(() => t('projects.list.elfec.full_description')),
    image: ElfecImage,
    technologies: ['PHP', 'CSS', 'Drupal', 'MySQL', 'JavaScript', 'JQuery', 'Bootstrap'],
    category: 'Web App',
    liveUrl: 'https://www.elfec.bo',
    githubUrl: '',
    displayLiveUrl: true,
    displayGithubUrl: false,
    featured: false,
    features: computed(() => [
      t('projects.list.elfec.features.user_management'),
      t('projects.list.elfec.features.billing'),
      t('projects.list.elfec.features.reporting'),
      t('projects.list.elfec.features.notifications'),
      t('projects.list.elfec.features.analytics'),
      t('projects.list.elfec.features.support'),
      t('projects.list.elfec.features.mobile_access')
    ])
  },
  {
    id: 2,
    title: 'EduCertify',
    description: computed(() => t('projects.list.educertify.short_description')),
    fullDescription: computed(() => t('projects.list.educertify.full_description')),
    image: Educertify,
    technologies: ['PHP', 'CSS', 'Laravel', 'MySQL', 'JavaScript', 'JQuery', 'Bootstrap', 'Vite'],
    category: 'Web App',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/carlosJCVC/EduCertify',
    displayLiveUrl: false,
    displayGithubUrl: true,
    featured: true,
    features: computed(() => [
      t('projects.list.educertify.features.template'),
      t('projects.list.educertify.features.signature'),
      t('projects.list.educertify.features.customization'),
      t('projects.list.educertify.features.management'),
      t('projects.list.educertify.features.delivery'),
      t('projects.list.educertify.features.authentication'),
      t('projects.list.educertify.features.dashboard')
    ])
  },
  {
    id: 3,
    title: 'Anime Hero Challengue',
    description: computed(() => t('projects.list.animehero.short_description')),
    fullDescription: computed(() => t('projects.list.animehero.full_description')),
    image: AnimeHeroChallenge,
    technologies: ['JavaScript', 'Vue', 'Vite', 'Tailwind CSS', 'Api Integration', 'Vite'],
    category: 'Web App',
    liveUrl: 'https://calm-beijinho-4007d3.netlify.app',
    githubUrl: 'https://github.com/carlosJCVC/pokemon-game',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: computed(() => [
      t('projects.list.animehero.features.selection'),
      t('projects.list.animehero.features.silhouette'),
      t('projects.list.animehero.features.multiple'),
      t('projects.list.animehero.features.scoring'),
      t('projects.list.animehero.features.reset'),
      t('projects.list.animehero.features.series'),
      t('projects.list.animehero.features.api'),
      t('projects.list.animehero.features.progress'),
      t('projects.list.animehero.features.responsive'),
      t('projects.list.animehero.features.expansion')
    ])
  }
])

const projects = ref(allProjects.value.slice(0, 3))
const showAll = ref(false)
const selectedProject = ref(null)
const categories = ['All', ...new Set(allProjects.value.map((p) => p.category))]
const activeCategory = ref('All')

const filteredProjects = computed(() => {
  if (activeCategory.value === 'All') {
    return projects.value
  }
  return projects.value.filter((p) => p.category === activeCategory.value)
})

const filterProjects = (category) => {
  activeCategory.value = category
}

const showAllProjects = () => {
  if (showAll.value) {
    projects.value = allProjects.value.slice(0, 3)
    showAll.value = false
  } else {
    projects.value = allProjects
    showAll.value = true
  }
}

const openModal = (project) => {
  selectedProject.value = project
}

const closeModal = () => {
  selectedProject.value = null
}

const onBeforeEnter = (el) => {
  el.style.opacity = 0
  el.style.transform = 'translateY(50px)'
}

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    onComplete: done
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    onComplete: done
  })
}
</script>

<style scoped>
/* ... (mantén los estilos aquí) */
</style>
