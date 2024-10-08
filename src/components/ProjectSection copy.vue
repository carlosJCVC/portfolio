<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
    <canvas ref="particlesCanvas" class="absolute inset-0"></canvas>

    <div class="container mx-auto px-4 relative z-10">
      <h2
        class="text-6xl font-extrabold text-center mb-16 gradient-text tracking-tight"
        data-aos="fade-down"
      >
        Project Showcase
      </h2>

      <div class="mb-12">
        <div class="flex justify-center space-x-4" data-aos="fade-up">
          <button
            v-for="category in categories"
            :key="category"
            @click="filterProjects(category)"
            :class="[
              'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300',
              activeCategory === category
                ? 'bg-indigo-600 text-white shadow-lg scale-105'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900'
            ]"
          >
            {{ category }}
          </button>
        </div>
      </div>

      <TransitionGroup
        tag="div"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        :css="false"
        @before-enter="onBeforeEnter"
        @enter="onEnter"
        @leave="onLeave"
      >
        <div
          v-for="(project, index) in filteredProjects"
          :key="project.id"
          class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
          :data-aos-delay="index * 100"
        >
          <div class="relative overflow-hidden group aspect-w-16 aspect-h-9">
            <img
              :src="project.image"
              :alt="project.title"
              class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div
              class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <button
                @click="openModal(project)"
                class="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105"
              >
                Explore Project
              </button>
            </div>
          </div>
          <div class="p-6">
            <h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">
              {{ project.title }}
            </h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tech in project.technologies"
                :key="tech"
                class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full"
              >
                {{ tech }}
              </span>
            </div>
            <div class="flex justify-between items-center">
              <a
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-300 flex items-center"
              >
                <span>Live Demo</span>
                <svg
                  class="w-4 h-4 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  ></path>
                </svg>
              </a>
              <a
                :href="project.githubUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 flex items-center"
              >
                <svg
                  class="w-5 h-5 mr-2"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
                  ></path>
                </svg>
                <span>View Code</span>
              </a>
            </div>
          </div>
          <div
            v-if="project.featured"
            class="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-md"
          >
            Featured
          </div>
        </div>
      </TransitionGroup>

      <div class="text-center mt-16">
        <button
          @click="showAllProjects"
          class="bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transform hover:scale-105 shadow-lg"
        >
          {{ showAll ? 'Show Less' : 'Discover More Projects' }}
        </button>
      </div>
    </div>

    <Teleport to="body">
      <TransitionRoot as="template" :show="!!selectedProject">
        <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="closeModal">
          <div
            class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0"
          >
            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0"
              enter-to="opacity-100"
              leave="ease-in duration-200"
              leave-from="opacity-100"
              leave-to="opacity-0"
            >
              <DialogOverlay class="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
              >&#8203;</span
            >

            <TransitionChild
              as="template"
              enter="ease-out duration-300"
              enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enter-to="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leave-from="opacity-100 translate-y-0 sm:scale-100"
              leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div
                class="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6"
              >
                <div class="absolute top-0 right-0 pt-4 pr-4">
                  <button
                    @click="closeModal"
                    class="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <span class="sr-only">Close</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                <div v-if="selectedProject">
                  <div class="mt-3 text-center sm:mt-0 sm:text-left">
                    <DialogTitle
                      as="h3"
                      class="text-3xl leading-6 font-bold text-gray-900 dark:text-gray-100 mb-4"
                    >
                      {{ selectedProject.title }}
                    </DialogTitle>
                    <div class="mt-4">
                      <img
                        :src="selectedProject.image"
                        :alt="selectedProject.title"
                        class="w-full h-64 object-cover rounded-lg mb-6"
                      />
                      <p class="text-gray-700 dark:text-gray-300 mb-4">
                        {{ selectedProject.fullDescription }}
                      </p>
                      <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                        Key Features:
                      </h4>
                      <ul class="list-disc list-inside mb-4 text-gray-600 dark:text-gray-400">
                        <li v-for="feature in selectedProject.features" :key="feature">
                          {{ feature }}
                        </li>
                      </ul>
                      <h4 class="text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200">
                        Technologies Used:
                      </h4>
                      <div class="flex flex-wrap gap-2 mb-4">
                        <span
                          v-for="tech in selectedProject.technologies"
                          :key="tech"
                          class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-sm rounded-full"
                        >
                          {{ tech }}
                        </span>
                      </div>
                      <div class="mt-8 flex justify-center space-x-4">
                        <a
                          :href="selectedProject.liveUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View Live Demo
                        </a>
                        <a
                          :href="selectedProject.githubUrl"
                          target="_blank"
                          rel="noopener noreferrer"
                          class="inline-flex items-center px-6 py-3 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          View on GitHub
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TransitionChild>
          </div>
        </Dialog>
      </TransitionRoot>
    </Teleport>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue'
import { gsap } from 'gsap'
import * as THREE from 'three'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({
  duration: 1000,
  once: true
})

const particlesCanvas = ref(null)
let particlesAnimation

const allProjects = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description:
      'A full-featured e-commerce platform with user authentication, product management, and payment integration.',
    fullDescription:
      'This e-commerce platform offers a comprehensive solution for online retail. It features user authentication, product catalog management, shopping cart functionality, and secure payment integration. The platform is built with scalability in mind, allowing for easy expansion and customization.',
    image: 'https://picsum.photos/id/20/600/400',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    category: 'Web App',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/yourusername/ecommerce-platform',
    featured: true,
    features: [
      'User authentication and profiles',
      'Product search and filtering',
      'Shopping cart and wishlist',
      'Secure payment processing',
      'Admin dashboard for inventory management'
    ]
  },
  {
    id: 2,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    fullDescription:
      'This task management application allows teams to collaborate efficiently. It offers real-time updates, task assignment, progress tracking, and team communication features. The app is designed to improve productivity and streamline project workflows.',
    image: 'https://picsum.photos/id/21/600/400',
    technologies: ['Vue.js', 'Firebase', 'Vuex'],
    category: 'Web App',
    liveUrl: 'https://example-taskmanager.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: false,
    features: [
      'Real-time task updates',
      'Team collaboration tools',
      'Project timeline visualization',
      'File attachment and sharing',
      'Customizable workflows'
    ]
  },
  {
    id: 3,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    fullDescription:
      'This task management application allows teams to collaborate efficiently. It offers real-time updates, task assignment, progress tracking, and team communication features. The app is designed to improve productivity and streamline project workflows.',
    image: 'https://picsum.photos/id/21/600/400',
    technologies: ['Vue.js', 'Firebase', 'Vuex'],
    category: 'Web App',
    liveUrl: 'https://example-taskmanager.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: false,
    features: [
      'Real-time task updates',
      'Team collaboration tools',
      'Project timeline visualization',
      'File attachment and sharing',
      'Customizable workflows'
    ]
  },
  {
    id: 4,
    title: 'Task Management App',
    description:
      'A collaborative task management application with real-time updates and team features.',
    fullDescription:
      'This task management application allows teams to collaborate efficiently. It offers real-time updates, task assignment, progress tracking, and team communication features. The app is designed to improve productivity and streamline project workflows.',
    image: 'https://picsum.photos/id/21/600/400',
    technologies: ['Vue.js', 'Firebase', 'Vuex'],
    category: 'Mobile App',
    liveUrl: 'https://example-taskmanager.com',
    githubUrl: 'https://github.com/yourusername/task-manager',
    featured: false,
    features: [
      'Real-time task updates',
      'Team collaboration tools',
      'Project timeline visualization',
      'File attachment and sharing',
      'Customizable workflows'
    ]
  }
]

const projects = ref(allProjects.slice(0, 3))
const showAll = ref(false)
const selectedProject = ref(null)
const categories = ['All', ...new Set(allProjects.map((p) => p.category))]
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
    projects.value = allProjects.slice(0, 3)
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

onMounted(() => {
  initParticles()
})

onUnmounted(() => {
  if (particlesAnimation) {
    particlesAnimation.kill()
  }
})

function initParticles() {
  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  const renderer = new THREE.WebGLRenderer({ canvas: particlesCanvas.value, alpha: true })

  renderer.setSize(window.innerWidth, window.innerHeight)

  const geometry = new THREE.BufferGeometry()
  const vertices = []

  for (let i = 0; i < 5000; i++) {
    const x = (Math.random() - 0.5) * 2000
    const y = (Math.random() - 0.5) * 2000
    const z = (Math.random() - 0.5) * 2000
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 })
  const particles = new THREE.Points(geometry, material)
  scene.add(particles)

  camera.position.z = 1000

  function animate() {
    requestAnimationFrame(animate)
    particles.rotation.x += 0.0001
    particles.rotation.y += 0.0001
    renderer.render(scene, camera)
  }

  animate()

  window.addEventListener('resize', onWindowResize, false)

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
  }
}
</script>

<style scoped>
.gradient-text {
  @apply bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

/* Particle canvas styling */
#particles-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

/* Project card styling */
.project-card {
  @apply bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2;
}

.project-image-container {
  @apply relative overflow-hidden;
}

.project-image {
  @apply w-full h-full object-cover transition-transform duration-300 group-hover:scale-110;
}

.project-overlay {
  @apply absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300;
}

.project-button {
  @apply bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105;
}

/* Technology tag styling */
.tech-tag {
  @apply px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full;
}

/* Project link styling */
.project-link {
  @apply text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-300 flex items-center;
}

/* "Show More" button styling */
.show-more-button {
  @apply bg-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-indigo-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900 transform hover:scale-105 shadow-lg;
}

/* Modal styling */
.modal-content {
  @apply inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full sm:p-6;
}

.modal-close-button {
  @apply text-gray-400 hover:text-gray-500 focus:outline-none;
}

.modal-title {
  @apply text-3xl leading-6 font-bold text-gray-900 dark:text-gray-100 mb-4;
}

.modal-image {
  @apply w-full h-64 object-cover rounded-lg mb-6;
}

.modal-description {
  @apply text-gray-700 dark:text-gray-300 mb-4;
}

.modal-subtitle {
  @apply text-xl font-semibold mb-2 text-gray-800 dark:text-gray-200;
}

.modal-feature-list {
  @apply list-disc list-inside mb-4 text-gray-600 dark:text-gray-400;
}

.modal-button {
  @apply inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500;
}

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.fade-in {
  animation: fadeIn 0.5s ease-out;
}

.slide-up {
  animation: slideUp 0.5s ease-out;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .project-grid {
    @apply grid-cols-1;
  }

  .modal-content {
    @apply px-4 py-5;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .project-grid {
    @apply grid-cols-2;
  }
}

@media (min-width: 1025px) {
  .project-grid {
    @apply grid-cols-3;
  }
}
</style>
