<template>
  <div>
    <h3 class="text-3xl font-bold mb-10 text-center gradient-text">{{ $t('info.philosophy') }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
      <div
        v-for="(principle, index) in principles"
        :key="index"
        class="bg-white dark:bg-dark-card p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 dark:border-gray-800 hover:border-primary/30 dark:hover:border-primary/30 group"
      >
        <div
          class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300"
        >
          <i :class="principle.icon + ' text-3xl text-primary'"></i>
        </div>
        <h4 class="text-xl font-bold mb-4 text-gray-900 dark:text-white">{{ principle.title }}</h4>
        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">{{ principle.description }}</p>
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
