<template>
  <div :class="{ dark: theme === 'dark' }">
    <div class="bg-white dark:bg-gray-900 text-gray-900 dark:text-white min-h-screen">
      <NavBar></NavBar>
      <MyHeader></MyHeader>
      <AboutMe></AboutMe>
      <ProjectSection></ProjectSection>
      <SkillSection></SkillSection>
      <ContactSection></ContactSection>

      <button
        @click="toggleTheme"
        class="fixed bottom-4 right-4 p-2 rounded-full bg-gray-700 dark:bg-white"
      >
        {{ theme === 'light' ? '🌙' : '☀️' }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { storeToRefs } from 'pinia'
import NavBar from './components/NavBar.vue'
import MyHeader from './components/MyHeader.vue'
import AboutMe from './components/AboutMe.vue'
import ProjectSection from './components/ProjectSection.vue'
import SkillSection from './components/SkillSection.vue'
import ContactSection from './components/ContactSection.vue'
import { useThemeStore } from './store/useThemeStore'

const store = useThemeStore()
const { theme } = storeToRefs(store)
const { toggleTheme } = store
</script>

<style>
@keyframes gradient-shift {
  0% {
    background-position: 0% 50%;
  }

  50% {
    background-position: 100% 50%;
  }

  100% {
    background-position: 0% 50%;
  }
}

.skill-bar {
  height: 10px;
  border-radius: 5px;
  background: linear-gradient(90deg, #6366f1, #3b82f6, #2dd4bf);
  background-size: 300% 300%;
  animation: gradient-shift 5s ease infinite;
}
</style>
