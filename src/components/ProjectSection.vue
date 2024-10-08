<template>
  <section id="projects" class="py-20 relative overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-600 opacity-10"></div>
    <ParticlesBackground />

    <div class="container mx-auto px-4 relative z-10">
      <h2 class="text-6xl font-extrabold text-center mb-16 gradient-text tracking-tight" data-aos="fade-down">
        Project Showcase
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
          {{ showAll ? 'Show Less' : 'Discover More Projects' }}
        </button>
      </div>
    </div>

    <ProjectModal :project="selectedProject" @close="closeModal" />
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
import { gsap } from 'gsap';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ProjectCard from './ProjectCard.vue';
import ProjectModal from './ProjectModal.vue';
import ProjectFilter from './ProjectFilter.vue';
import ParticlesBackground from './ParticlesBackground.vue';
import Educertify from "@/assets/images/projects/educertify.webp";

AOS.init({
  duration: 1000,
  once: true,
});

const allProjects = [
  {
    id: 1,
    title: "EduCertify",
    description: "Educertify is a platform for creating, customizing, and sending digital certificates with ease.",
    fullDescription: "Educertify is a certificate generation and distribution platform designed for easy customization. Users can personalize certificates by changing fonts, colors, and adding signatures. The platform also supports uploading pre-signed certificates or digitally signing them directly. Once created, certificates can be sent to recipients via email, making the distribution process efficient. Educertify enables users to generate professional certificates with ease and flexibility, offering both customization and automated delivery.",
    image: Educertify,
    technologies: ["PHP", 'CSS', "Laravel", "MySQL", "JavaScript", "JQuery", 'Bootstrap', 'Vite'],
    category: "Web App",
    liveUrl: "https://example-ecommerce.com",
    githubUrl: "https://github.com/carlosJCVC/EduCertify",
    featured: true,
    features: [
      "Customizable certificate templates",
      "Digital and manual signature options",
      "Font and color customization",
      "Certificate upload and management",
      "Automated email certificate delivery",
      "User authentication and profile management",
      "Admin dashboard for certificate tracking and analytics"
    ]
  },
  {
    id: 2,
    title: "DBZ And Pokemon Game",
    description: "Educertify is a platform for creating, customizing, and sending digital certificates with ease.",
    fullDescription: "Educertify is a certificate generation and distribution platform designed for easy customization. Users can personalize certificates by changing fonts, colors, and adding signatures. The platform also supports uploading pre-signed certificates or digitally signing them directly. Once created, certificates can be sent to recipients via email, making the distribution process efficient. Educertify enables users to generate professional certificates with ease and flexibility, offering both customization and automated delivery.",
    image: Educertify,
    technologies: ["PHP", 'CSS', "Laravel", "MySQL", "JavaScript", "JQuery", 'Bootstrap', 'Vite'],
    category: "Web App",
    liveUrl: "https://calm-beijinho-4007d3.netlify.app",
    githubUrl: "https://github.com/carlosJCVC/pokemon-game",
    featured: false,
    features: [
      "Customizable certificate templates",
      "Digital and manual signature options",
      "Font and color customization",
      "Certificate upload and management",
      "Automated email certificate delivery",
      "User authentication and profile management",
      "Admin dashboard for certificate tracking and analytics"
    ]
  },
];

const projects = ref(allProjects.slice(0, 3));
const showAll = ref(false);
const selectedProject = ref(null);
const categories = ["All", ...new Set(allProjects.map(p => p.category))];
const activeCategory = ref("All");

const filteredProjects = computed(() => {
  if (activeCategory.value === "All") {
    return projects.value;
  }
  return projects.value.filter(p => p.category === activeCategory.value);
});

const filterProjects = (category) => {
  activeCategory.value = category;
};

const showAllProjects = () => {
  if (showAll.value) {
    projects.value = allProjects.slice(0, 3);
    showAll.value = false;
  } else {
    projects.value = allProjects;
    showAll.value = true;
  }
};

const openModal = (project) => {
  selectedProject.value = project;
};

const closeModal = () => {
  selectedProject.value = null;
};

const onBeforeEnter = (el) => {
  el.style.opacity = 0;
  el.style.transform = 'translateY(50px)';
};

const onEnter = (el, done) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    onComplete: done
  });
};

const onLeave = (el, done) => {
  gsap.to(el, {
    opacity: 0,
    y: 50,
    duration: 0.6,
    onComplete: done
  });
};
</script>

<style scoped>
/* ... (mantén los estilos aquí) */
</style>