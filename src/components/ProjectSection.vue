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

    <div class="container mx-auto px-4 relative z-10 max-w-7xl">
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
        @filter="filterProjects"
        class="mb-12"
      />

      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
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
  },
  {
    id: 4,
    title: 'TaskMaster AI',
    description:
      'A smart productivity app that uses AI to prioritize tasks and schedule meetings automatically.',
    fullDescription:
      "TaskMaster AI revolutionizes personal productivity by integrating OpenAI's GPT-4 to analyze your workload. It automatically categorizes tasks, suggests optimal scheduling based on your energy levels, and even drafts email responses. Built with React and Node.js, it features real-time synchronization across devices.",
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=TaskMaster+AI',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    category: 'AI App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: true,
    features: [
      'AI Task Prioritization',
      'Smart Scheduling',
      'Email Drafting',
      'Real-time Sync',
      'Voice Commands'
    ]
  },
  {
    id: 5,
    title: 'CryptoDash',
    description:
      'Real-time cryptocurrency dashboard featuring advanced charting and portfolio tracking.',
    fullDescription:
      'CryptoDash provides investors with a comprehensive view of the crypto market. It aggregates data from multiple exchanges via WebSockets to offer millisecond-latency price updates. Users can track their portfolio performance with interactive D3.js charts and set custom alerts for price movements.',
    image: 'https://placehold.co/600x400/10B981/FFFFFF?text=CryptoDash',
    technologies: ['Vue.js', 'D3.js', 'Firebase', 'WebSockets', 'Netlify Functions'],
    category: 'Finance',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: [
      'Real-time Data',
      'Interactive Charts',
      'Portfolio Tracking',
      'Price Alerts',
      'News Feed'
    ]
  },
  {
    id: 6,
    title: 'TravelLog',
    description:
      'A social platform for travelers to share journals, photos, and interactive maps of their journeys.',
    fullDescription:
      'TravelLog connects wanderlusts around the globe. It allows users to create rich-text travel journals embedded with photos and interactive maps. The platform uses geolocation to suggest nearby hidden gems and connects travelers visiting the same destination.',
    image: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=TravelLog',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Dart', 'Cloud Functions'],
    category: 'Mobile App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Interactive Maps', 'Photo Galleries', 'Social Feed', 'Geolocation', 'Offline Mode']
  },
  {
    id: 7,
    title: 'EcoTrack IoT',
    description:
      'IoT dashboard for monitoring energy consumption in smart homes with predictive analytics.',
    fullDescription:
      'EcoTrack IoT helps homeowners reduce their carbon footprint. By connecting to smart meters and IoT devices, it visualizes energy consumption patterns in real-time. The system uses machine learning to predict future usage and suggests actionable tips to save energy and money.',
    image: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=EcoTrack',
    technologies: ['Angular', 'AWS IoT', 'Lambda', 'DynamoDB', 'Chart.js'],
    category: 'IoT',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: [
      'Real-time Monitoring',
      'Predictive Analytics',
      'Device Control',
      'Cost Estimation',
      'Sustainability Reports'
    ]
  },
  {
    id: 8,
    title: 'Project Alpha',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    fullDescription:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'https://placehold.co/600x400/6366F1/FFFFFF?text=Project+Alpha',
    technologies: ['React', 'Redux', 'Sass', 'Webpack'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Feature One', 'Feature Two', 'Feature Three', 'Feature Four']
  },
  {
    id: 9,
    title: 'Beta Dashboard',
    description:
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    fullDescription:
      'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    image: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Beta+Dashboard',
    technologies: ['Vue.js', 'Vuex', 'Chart.js', 'Firebase'],
    category: 'Finance',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Analytics', 'Real-time Updates', 'User Management', 'Reporting']
  },
  {
    id: 10,
    title: 'Gamma Mobile',
    description:
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    fullDescription:
      'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    image: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Gamma+Mobile',
    technologies: ['React Native', 'Expo', 'Redux', 'Node.js'],
    category: 'Mobile App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Push Notifications', 'Offline Support', 'Camera Integration', 'Maps']
  }
])

const showAll = ref(false)
const selectedProject = ref(null)
const categories = ['All', ...new Set(allProjects.value.map((p) => p.category))]
const activeCategory = ref('All')

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
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
