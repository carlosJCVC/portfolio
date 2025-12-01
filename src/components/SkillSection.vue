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

    <div class="container mx-auto px-4 relative z-10">
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
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <!-- Core Stack (Large Item) -->
        <SkillBentoItem
          title="Vue.js Ecosystem"
          description="My primary weapon of choice. Expert in Vue 3, Pinia, Vue Router, and Nuxt for server-side rendering."
          icon="fab fa-vuejs"
          size="2x2"
          color="green"
          :level="95"
          data-aos="fade-up"
          data-aos-delay="0"
        />

        <!-- Secondary Core (Wide Item) -->
        <SkillBentoItem
          title="Node.js & Backend"
          description="Building scalable RESTful APIs and microservices with Express and NestJS."
          icon="fab fa-node-js"
          size="2x1"
          color="green"
          :level="90"
          data-aos="fade-up"
          data-aos-delay="100"
        />

        <!-- Frontend Tool -->
        <SkillBentoItem
          title="React & Native"
          description="Building cross-platform mobile apps and dynamic web interfaces."
          icon="fab fa-react"
          size="1x1"
          color="blue"
          :level="85"
          data-aos="fade-up"
          data-aos-delay="200"
        />

        <!-- Frontend Tool -->
        <SkillBentoItem
          title="Tailwind CSS"
          description="Rapid UI development with utility-first CSS."
          icon="fas fa-wind"
          size="1x1"
          color="teal"
          :level="95"
          data-aos="fade-up"
          data-aos-delay="300"
        />

        <!-- Automation (Featured) -->
        <SkillBentoItem
          title="n8n Automation"
          description="Orchestrating complex workflows and integrating disparate services."
          icon="fas fa-project-diagram"
          size="2x1"
          color="pink"
          :level="80"
          data-aos="fade-up"
          data-aos-delay="400"
        />

        <!-- Database -->
        <SkillBentoItem
          title="Database Design"
          description="SQL (PostgreSQL, MySQL) and NoSQL (MongoDB) architecture."
          icon="fas fa-database"
          size="1x1"
          color="orange"
          :level="85"
          data-aos="fade-up"
          data-aos-delay="500"
        />

        <!-- DevOps -->
        <SkillBentoItem
          title="DevOps & Cloud"
          description="Docker containerization and AWS cloud infrastructure."
          icon="fab fa-docker"
          size="1x1"
          color="blue"
          :level="75"
          data-aos="fade-up"
          data-aos-delay="600"
        />

        <!-- Other Tools -->
        <SkillBentoItem
          title="Git & Workflow"
          description="Version control and CI/CD pipelines."
          icon="fab fa-git-alt"
          size="1x1"
          color="orange"
          :level="90"
          data-aos="fade-up"
          data-aos-delay="700"
        />

        <!-- Learning/Future -->
        <SkillBentoItem
          title="Exploring AI"
          description="Currently diving deep into LLMs and Generative AI integration."
          icon="fas fa-brain"
          size="2x1"
          color="purple"
          data-aos="fade-up"
          data-aos-delay="800"
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
