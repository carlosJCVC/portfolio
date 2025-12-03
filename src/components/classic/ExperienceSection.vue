<template>
  <section id="experience" class="py-24 bg-white dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl">
      <!-- Section Header -->
      <div class="text-center mb-20" data-aos="fade-down">
        <h2 class="text-4xl md:text-5xl font-extrabold gradient-text mb-6">Experience & Education</h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My professional journey and academic background.
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative max-w-4xl mx-auto">
        <!-- Vertical Line -->
        <div class="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-primary via-secondary to-transparent opacity-30"></div>

        <!-- Timeline Items -->
        <div
          v-for="(item, index) in experience"
          :key="item.id"
          class="relative mb-12 md:mb-24 last:mb-0 group"
        >
          <!-- Dot -->
          <div
            class="absolute left-[-5px] md:left-1/2 transform md:-translate-x-1/2 w-3.5 h-3.5 rounded-full bg-white dark:bg-dark-bg border-4 border-primary z-20 group-hover:scale-150 transition-transform duration-300"
          ></div>

          <!-- Content Card -->
          <div
            class="relative ml-8 md:ml-0 md:w-[calc(50%-2rem)]"
            :class="index % 2 === 0 ? 'md:mr-auto md:text-right' : 'md:ml-auto md:text-left'"
            data-aos="fade-up"
            :data-aos-delay="index * 100"
          >
            <div
              class="bg-gray-50 dark:bg-dark-card p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all duration-300 group-hover:-translate-y-1"
            >
              <!-- Period Badge -->
              <div
                class="inline-block px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold mb-4"
                :class="index % 2 === 0 ? 'md:ml-auto' : ''"
              >
                {{ item.period }}
              </div>

              <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                {{ item.role }}
              </h3>
              <h4 class="text-lg text-gray-500 dark:text-gray-400 font-medium mb-4">
                {{ item.company }}
              </h4>
              <p class="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {{ item.description }}
              </p>

              <!-- Skills Tags -->
              <div
                class="flex flex-wrap gap-2"
                :class="index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'"
              >
                <span
                  v-for="skill in item.skills"
                  :key="skill"
                  class="px-3 py-1 text-xs rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300"
                >
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience } from '@/data/experience.js'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
