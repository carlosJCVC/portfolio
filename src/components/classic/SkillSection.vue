<template>
  <section
    id="skills"
    class="py-24 transition-colors duration-300 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white relative overflow-hidden"
    @mousemove="handleMouseMove"
  >
    <!-- Subtle background elements -->
    <div
      class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"
    ></div>
    <!-- Grid Pattern -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl">
      <div class="text-center mb-20">
        <h2
          class="text-5xl md:text-6xl font-extrabold mb-6 gradient-text inline-block tracking-tight"
          data-aos="fade-down"
        >
          {{ $t('skills.title') }}
        </h2>
        <p
          class="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          My technical arsenal. A curated mix of robust backend systems, dynamic frontend
          interfaces, and modern devops tools.
        </p>
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mx-auto">
        <!-- 1. Vue.js Ecosystem (Hero - 2x2) -->
        <SkillBentoItem
          title="Vue.js Ecosystem"
          description="My primary weapon. Expert in Vue 3, Pinia, Nuxt.js, and component architecture."
          icon="fab fa-vuejs"
          size="2x2"
          color="green"
          :level="98"
          data-aos="fade-up"
          data-aos-delay="0"
        />

        <!-- 2. React & Native (Wide - 2x1) -->
        <SkillBentoItem
          title="React & React Native"
          description="Building cross-platform mobile apps and dynamic web interfaces with the React ecosystem."
          icon="fab fa-react"
          size="2x1"
          color="blue"
          :level="90"
          data-aos="fade-up"
          data-aos-delay="100"
        />

        <!-- 3. Laravel & PHP (Wide - 2x1) -->
        <SkillBentoItem
          title="Laravel & PHP"
          description="Architecting robust, secure backends with modern PHP and the Laravel framework."
          icon="fab fa-laravel"
          size="2x1"
          color="orange"
          :level="92"
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <!-- 4. Node.js & Backend (Wide - 2x1) -->
        <SkillBentoItem
          title="Node.js & Microservices"
          description="Scalable API development using Express, NestJS, and event-driven architectures."
          icon="fab fa-node-js"
          size="2x1"
          color="green"
          :level="88"
          data-aos="fade-up"
          data-aos-delay="300"
        />

        <!-- 5. n8n Automation (Standard - 1x1) -->
        <SkillBentoItem
          title="n8n Automation"
          description="Workflow orchestration and service integration."
          icon="fas fa-project-diagram"
          size="1x1"
          color="pink"
          :level="85"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        <!-- 6. Tailwind CSS (Standard - 1x1) -->
        <SkillBentoItem
          title="Tailwind CSS"
          description="Rapid, utility-first UI development."
          icon="fas fa-wind"
          size="1x1"
          color="teal"
          :level="95"
          data-aos="fade-up"
          data-aos-delay="500"
        />

        <!-- 7. DevOps & Cloud (Standard - 1x1) -->
        <SkillBentoItem
          title="DevOps & Cloud"
          description="Docker, AWS, and CI/CD pipelines."
          icon="fab fa-docker"
          size="1x1"
          color="blue"
          :level="75"
          data-aos="fade-up"
          data-aos-delay="600"
        />

        <!-- 8. Database (Standard - 1x1) -->
        <SkillBentoItem
          title="Database Design"
          description="SQL (PostgreSQL) & NoSQL (MongoDB)."
          icon="fas fa-database"
          size="1x1"
          color="purple"
          :level="85"
          data-aos="fade-up"
          data-aos-delay="700"
        />
      </div>

      <!-- Tech River -->
      <div class="mt-24" data-aos="fade-up">
        <h3
          class="text-2xl font-bold text-center mb-8 text-gray-400 dark:text-gray-500 uppercase tracking-widest text-sm"
        >
          {{ $t('skills.technologies') }}
        </h3>
        <TechRiver />
      </div>
    </div>
  </section>
</template>

<script setup>
import SkillBentoItem from './SkillBentoItem.vue'
import TechRiver from './TechRiver.vue'

const handleMouseMove = (e) => {
  const cards = document.querySelectorAll('.group')
  for (const card of cards) {
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    card.style.setProperty('--mouse-x', `${x}px`)
    card.style.setProperty('--mouse-y', `${y}px`)
  }
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
