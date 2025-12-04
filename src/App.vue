<template>
  <router-view />
</template>

<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  // Set initial locale if needed, or let browser detect
  // locale.value = 'es'
})
</script>

<style>
/* Global Reset */
body {
  margin: 0;
  background-color: #000;
}
</style>
