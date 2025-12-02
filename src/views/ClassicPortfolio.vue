<template>
  <div class="bg-black text-white min-h-screen font-sans selection:bg-blue-500 selection:text-white">
    <MyHeader />
    <AboutMe />
    <ProjectSection />
    <ContactSection />
  </div>
</template>

<script setup>
import MyHeader from '@/components/MyHeader.vue'
import AboutMe from '@/components/AboutMe.vue'
import ProjectSection from '@/components/ProjectSection.vue'
import ContactSection from '@/components/ContactSection.vue'
</script>

<style>
/* Ensure classic scroll behavior */
html, body {
  overflow-y: auto !important;
  scroll-behavior: smooth;
}
</style>
