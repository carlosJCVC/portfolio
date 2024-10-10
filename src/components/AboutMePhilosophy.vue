<template>
  <div>
    <h3 class="text-2xl font-semibold mb-6 dark:text-gray-200">{{ $t('info.philosophy') }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(principle, index) in principles"
        :key="index"
        class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
      >
        <i :class="principle.icon + ' text-4xl text-indigo-500 mb-4'"></i>
        <h4 class="text-xl font-semibold mb-2 dark:text-gray-200">{{ principle.title }}</h4>
        <p class="text-gray-600 dark:text-gray-400">{{ principle.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const principles = computed(() => [
  {
    icon: 'fas fa-lightbulb',
    title: t('info.principles.innovative_solutions.title'),
    description: t('info.principles.innovative_solutions.description')
  },
  {
    icon: 'fas fa-users',
    title: t('info.principles.user_centric_approach.title'),
    description: t('info.principles.user_centric_approach.description')
  },
  {
    icon: 'fas fa-rocket',
    title: t('info.principles.continuous_learning.title'),
    description: t('info.principles.continuous_learning.description')
  }
])
</script>

<style lang="scss" scoped></style>
