<template>
  <div
    class="bg-black text-white min-h-screen font-sans selection:bg-blue-500 selection:text-white"
  >
    <NavBar />
    <MyHeader />
    <AboutMe />
    <SkillSection />
    <ExperienceSection />
    <ProjectSection />
    <TechRiver />
    <ContactSection />
    <MyFooter />
  </div>
</template>

<script setup>
import NavBar from '@/components/common/NavBar.vue'
import MyHeader from '@/components/classic/MyHeader.vue'
import AboutMe from '@/components/classic/AboutMe.vue'
import SkillSection from '@/components/classic/SkillSection.vue'
import ExperienceSection from '@/components/classic/ExperienceSection.vue'
import ProjectSection from '@/components/classic/ProjectSection.vue'
import TechRiver from '@/components/classic/TechRiver.vue'
import ContactSection from '@/components/classic/ContactSection.vue'
import MyFooter from '@/components/common/MyFooter.vue'
</script>

<style>
/* Ensure classic scroll behavior */
html,
body {
  overflow-y: auto !important;
  scroll-behavior: smooth;
}
</style>
