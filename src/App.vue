<template>
  <DesktopEnvironment />
</template>

<script setup>
import DesktopEnvironment from './components/os/DesktopEnvironment.vue'
</script>

<style>
/* Global Reset for OS Mode */
body {
  margin: 0;
  overflow: hidden; /* Prevent body scroll, OS handles it */
  background-color: #000;
}
</style>
