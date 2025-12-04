<template>
  <section
    id="projects"
    class="py-24 relative overflow-hidden bg-gray-50 dark:bg-dark-bg transition-colors duration-300"
  >
    <!-- Subtle gradient background -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-50"
    ></div>
    <!-- Grid Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>
    <ParticlesBackground />

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl">
      <div class="text-center mb-16">
        <h2
          class="text-5xl md:text-6xl font-extrabold text-center mb-6 gradient-text tracking-tight inline-block"
          data-aos="fade-down"
        >
          {{ $t('projects.title') }}
        </h2>
        <p
          class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          Explore a selection of my recent work, ranging from web applications to interactive
          experiences.
        </p>
      </div>

      <ProjectFilter
        :categories="categories"
        :activeCategory="activeCategory"
        :counts="categoryCounts"
        @filter="filterProjects"
        class="mb-12"
      />

      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-8 lg:gap-10 auto-rows-fr grid-flow-dense"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <ProjectCard
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          :project="project"
          :index="index"
          @open-modal="openModal"
        />
      </TransitionGroup>

      <div class="text-center mt-20">
        <button
          @click="showAllProjects"
          class="group relative px-8 py-4 bg-white dark:bg-dark-card text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full text-lg font-semibold hover:border-primary dark:hover:border-primary transition-all duration-300 shadow-lg hover:shadow-primary/20"
        >
          <span class="relative z-10 group-hover:text-primary transition-colors duration-300">
            {{ showAll ? $t('projects.show_less') : $t('projects.more_projects') }}
          </span>
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
import 'aos/dist/aos.css'
import ProjectCard from './ProjectCard.vue'
import ProjectModal from './ProjectModal.vue'
import ProjectFilter from './ProjectFilter.vue'
import ParticlesBackground from '@/components/common/ParticlesBackground.vue'
import { projects } from '@/data/projects'

const { t } = useI18n()

const allProjects = computed(() => {
  return projects.map((p) => ({
    ...p,
    description: p.descriptionKey ? computed(() => t(p.descriptionKey)) : p.description,
    fullDescription: p.fullDescriptionKey
      ? computed(() => t(p.fullDescriptionKey))
      : p.fullDescription,
    features: p.featuresKeys ? computed(() => p.featuresKeys.map((key) => t(key))) : p.features
  }))
})

const showAll = ref(false)
const selectedProject = ref(null)
const categories = ['All', ...new Set(allProjects.value.map((p) => p.category))]
const activeCategory = ref('All')

const categoryCounts = computed(() => {
  const counts = { All: allProjects.value.length }
  allProjects.value.forEach((p) => {
    counts[p.category] = (counts[p.category] || 0) + 1
  })
  return counts
})

const filteredProjects = computed(() => {
  // Always filter from allProjects to ensure category switching works correctly with "Show More" state
  let sourceProjects = showAll.value ? allProjects.value : allProjects.value.slice(0, 6)

  if (activeCategory.value === 'All') {
    return sourceProjects
  }
  return sourceProjects.filter((p) => p.category === activeCategory.value)
})

const filterProjects = (category) => {
  activeCategory.value = category
  // Reset to initial view when changing categories if we want, or keep current state.
  // Usually better to keep "showAll" state or reset?
  // Let's keep it simple: just filter.
}

const showAllProjects = () => {
  if (showAll.value) {
    showAll.value = false
  } else {
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
.bg-grid-pattern {
  background-image: linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
