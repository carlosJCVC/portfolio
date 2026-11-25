<template>
  <div class="relative h-64 w-full">
    <button
      v-for="(project, index) in projects"
      :key="project.id"
      type="button"
      class="project-card"
      :style="cardStyle(index)"
      @click="selected = project"
    >
      <img :src="project.image" :alt="project.title" class="h-36 w-full rounded-xl object-cover" loading="lazy" />
      <p class="mt-2 truncate text-left font-semibold">{{ project.title }}</p>
      <p class="truncate text-left text-xs text-slate-400">{{ project.technologies.slice(0, 3).join(' · ') }}</p>
    </button>
    <ProjectModal :project="selected" @close="selected = null" />
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProjectModal from '@/components/classic/ProjectModal.vue'

const props = defineProps({
  projects: { type: Array, required: true }
})

const selected = ref(null)

const cardStyle = (index) => {
  const offset = index - (props.projects.length - 1) / 2
  return {
    transform: `translateX(calc(-50% + ${offset * 64}px)) rotate(${offset * 7}deg)`,
    zIndex: 10 - Math.abs(Math.round(offset * 2)),
    animationDelay: `${index * 140}ms`
  }
}
</script>

<style scoped>
.project-card {
  @apply absolute left-1/2 top-2 w-52 rounded-2xl border border-white/10 bg-slate-900 p-2.5 shadow-2xl shadow-black/50 transition hover:z-20 hover:-translate-y-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
  animation: deal 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes deal {
  from {
    opacity: 0;
    top: 60px;
  }
}
</style>
