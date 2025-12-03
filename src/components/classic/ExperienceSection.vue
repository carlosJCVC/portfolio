<template>
  <section
    id="experience"
    class="py-24 bg-white dark:bg-dark-bg transition-colors duration-300 relative overflow-hidden"
  >
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-grid-pattern opacity-[0.03] dark:opacity-[0.05]"></div>

    <div class="container mx-auto px-4 relative z-10 max-w-screen-2xl">
      <!-- Section Header -->
      <div class="text-center mb-20" data-aos="fade-down">
        <h2 class="text-4xl md:text-5xl font-extrabold gradient-text mb-6">
          Experience & Education
        </h2>
        <p class="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          My professional journey and academic background.
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        <!-- Left Column: Work Experience -->
        <div>
          <h3
            class="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
            data-aos="fade-right"
          >
            <div
              class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
            >
              <i class="fas fa-briefcase"></i>
            </div>
            Work History
          </h3>

          <div class="relative border-l-2 border-gray-200 dark:border-gray-800 ml-5 space-y-12">
            <div
              v-for="(item, index) in experience"
              :key="item.id"
              class="relative pl-8 group"
              data-aos="fade-up"
              :data-aos-delay="index * 100"
            >
              <!-- Dot -->
              <div
                class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white dark:bg-dark-bg border-4 border-primary transition-transform duration-300 group-hover:scale-125"
              ></div>

              <!-- Content -->
              <div
                class="bg-gray-50 dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-lg transition-all duration-300 group-hover:-translate-y-1"
              >
                <div class="flex flex-wrap justify-between items-start mb-2 gap-2">
                  <h4 class="text-xl font-bold text-gray-900 dark:text-white">{{ item.role }}</h4>
                  <span
                    class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold whitespace-nowrap"
                  >
                    {{ item.period }}
                  </span>
                </div>
                <h5 class="text-md text-gray-500 dark:text-gray-400 font-medium mb-4">
                  {{ item.company }}
                </h5>
                <p class="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {{ item.description }}
                </p>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="skill in item.skills"
                    :key="skill"
                    class="px-2 py-1 text-[10px] uppercase tracking-wider rounded-md bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400"
                  >
                    {{ skill }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Column: Education & Certifications -->
        <div class="space-y-12">
          <!-- Education -->
          <div>
            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
              data-aos="fade-left"
            >
              <div
                class="w-10 h-10 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary"
              >
                <i class="fas fa-graduation-cap"></i>
              </div>
              Education
            </h3>

            <div class="space-y-6">
              <div
                v-for="(item, index) in education"
                :key="item.id"
                class="bg-white dark:bg-dark-card p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all duration-300 flex gap-4"
                data-aos="fade-left"
                :data-aos-delay="index * 100"
              >
                <div
                  class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex-shrink-0 flex items-center justify-center text-gray-500"
                >
                  <i class="fas fa-university"></i>
                </div>
                <div>
                  <h4 class="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
                    {{ item.degree }}
                  </h4>
                  <p class="text-primary text-sm font-medium mb-1">{{ item.school }}</p>
                  <p class="text-gray-500 dark:text-gray-400 text-xs">{{ item.period }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Certifications -->
          <div>
            <h3
              class="text-2xl font-bold text-gray-900 dark:text-white mb-8 flex items-center gap-3"
              data-aos="fade-left"
              data-aos-delay="200"
            >
              <div
                class="w-10 h-10 rounded-xl bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-500"
              >
                <i class="fas fa-certificate"></i>
              </div>
              Certifications
            </h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div
                v-for="(cert, index) in certifications"
                :key="cert.id"
                class="bg-gray-50 dark:bg-dark-card p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-green-500/30 transition-colors"
                data-aos="fade-up"
                :data-aos-delay="300 + index * 50"
              >
                <h4 class="font-bold text-gray-900 dark:text-white text-sm mb-1">
                  {{ cert.name }}
                </h4>
                <div class="flex justify-between items-center text-xs text-gray-500">
                  <span>{{ cert.issuer }}</span>
                  <span>{{ cert.year }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { experience, education, certifications } from '@/data/experience.js'
</script>

<style scoped>
.bg-grid-pattern {
  background-image:
    linear-gradient(to right, currentColor 1px, transparent 1px),
    linear-gradient(to bottom, currentColor 1px, transparent 1px);
  background-size: 40px 40px;
}
</style>
