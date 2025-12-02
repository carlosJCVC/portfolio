<template>
  <div>
    <h3 class="text-3xl font-bold mb-10 text-center gradient-text">{{ $t('info.philosophy') }}</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="(principle, index) in principles"
        :key="index"
        class="relative p-6 rounded-2xl transition-all duration-300 group hover:-translate-y-2"
        data-aos="fade-up"
        :data-aos-delay="index * 100"
      >
        <!-- Glassmorphism Background -->
        <div
          class="absolute inset-0 bg-white/50 dark:bg-dark-card/50 backdrop-blur-md rounded-2xl border border-white/20 dark:border-gray-700 shadow-lg group-hover:shadow-2xl group-hover:border-primary/30 dark:group-hover:border-primary/30 transition-all duration-300"
        ></div>

        <!-- Content -->
        <div class="relative z-10 h-full flex flex-col">
          <div
            class="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform"
          >
            <i :class="principle.icon + ' text-2xl text-primary'"></i>
          </div>
          <h4
            class="text-lg font-bold mb-3 text-gray-900 dark:text-white group-hover:text-primary transition-colors"
          >
            {{ principle.title }}
          </h4>
          <p class="text-sm text-gray-600 dark:text-gray-400 leading-relaxed flex-grow">
            {{ principle.description }}
          </p>
        </div>
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
    icon: 'fas fa-code',
    title: t('info.principles.clean_code.title'),
    description: t('info.principles.clean_code.description')
  },
  {
    icon: 'fas fa-user-check',
    title: t('info.principles.user_centric.title'),
    description: t('info.principles.user_centric.description')
  },
  {
    icon: 'fas fa-tachometer-alt',
    title: t('info.principles.scalable_performance.title'),
    description: t('info.principles.scalable_performance.description')
  },
  {
    icon: 'fas fa-rocket',
    title: t('info.principles.continuous_evolution.title'),
    description: t('info.principles.continuous_evolution.description')
  }
])
</script>

<style lang="scss" scoped></style>
