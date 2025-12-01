<template>
  <section
    id="skills"
    class="py-24 transition-colors duration-300 bg-gray-50 dark:bg-dark-bg text-gray-800 dark:text-white relative overflow-hidden"
  >
    <!-- Subtle background elements -->
    <div
      class="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent pointer-events-none"
    ></div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="text-center mb-20">
        <h2
          class="text-5xl md:text-6xl font-extrabold mb-6 gradient-text inline-block tracking-tight"
        >
          {{ $t('skills.title') }}
        </h2>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <!-- 3D Skill Sphere -->
        <div data-aos="fade-right">
          <SkillSphere></SkillSphere>
        </div>

        <!-- Radar Chart -->
        <div data-aos="fade-left">
          <SkillCategory></SkillCategory>
        </div>
      </div>

      <!-- Tools & Technologies -->
      <div class="mt-24" data-aos="fade-up">
        <ToolsTechnologies></ToolsTechnologies>
      </div>
    </div>
  </section>
</template>

<script setup>
import SkillSphere from './3DSkillSphere.vue'
import SkillCategory from './SkillCategory.vue'
import ToolsTechnologies from './ToolsTechnologies.vue'
</script>

<style scoped>
/* Scoped styles removed to use global gradient-text */
</style>
