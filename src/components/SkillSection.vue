<template>
  <section
    id="skills"
    class="py-20 transition-colors duration-300 bg-gradient-to-br from-gray-100 to-indigo-100 dark:from-gray-900 dark:to-indigo-900 text-gray-800 dark:text-white"
  >
    <div class="container mx-auto px-4">
      <h2 class="text-5xl font-bold text-center mb-16 gradient-text">Skills & Expertise</h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <!-- 3D Skill Sphere -->
        <SkillSphere></SkillSphere>

        <!-- Radar Chart -->
        <SkillCategory></SkillCategory>
      </div>

      <!-- Tools & Technologies -->
      <div class="mt-20">
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
.gradient-text {
  @apply bg-gradient-to-r from-blue-400 to-indigo-500;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
</style>
