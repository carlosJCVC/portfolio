<template>
  <router-view />
</template>

<script setup>
import { useOSStore } from '@/store/useOSStore'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import LanguageDebug from '@/components/common/LanguageDebug.vue'

const store = useOSStore()
const { locale } = useI18n()

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
