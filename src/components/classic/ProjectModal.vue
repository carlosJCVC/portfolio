<template>
  <Teleport to="body">
    <TransitionRoot as="template" :show="!!project">
      <Dialog as="div" class="fixed inset-0 z-50 overflow-y-auto" @close="CloseModal">
        <div
          class="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0"
            enter-to="opacity-100"
            leave="ease-in duration-200"
            leave-from="opacity-100"
            leave-to="opacity-0"
          >
            <DialogOverlay class="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity" />
          </TransitionChild>

          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true"
            >&#8203;</span
          >

          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div
              class="inline-block align-bottom bg-white dark:bg-dark-card rounded-2xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-5xl sm:w-full border border-gray-100 dark:border-gray-700"
            >
              <div v-if="project" class="relative">
                <!-- Close Button -->
                <button
                  @click="$emit('close')"
                  class="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/20 hover:bg-black/40 text-white backdrop-blur-sm transition-colors"
                >
                  <span class="sr-only">Close</span>
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>

                <!-- Hero Image -->
                <div class="relative h-64 sm:h-80 lg:h-96 w-full">
                  <img
                    :src="project.image"
                    :alt="project.title"
                    class="w-full h-full object-cover"
                  />
                  <div
                    class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
                  ></div>
                  <div class="absolute bottom-0 left-0 p-8 w-full">
                    <span
                      class="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wider text-white uppercase bg-primary/80 backdrop-blur-md rounded-full"
                    >
                      {{ project.category }}
                    </span>
                    <DialogTitle as="h3" class="text-4xl font-bold text-white mb-2">
                      {{ project.title }}
                    </DialogTitle>
                  </div>
                </div>

                <!-- Content Grid -->
                <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 p-8">
                  <!-- Left Column: Story & Features -->
                  <div class="lg:col-span-2 space-y-8">
                    <div>
                      <h4
                        class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                      >
                        <i class="fas fa-align-left text-primary"></i>
                        About the Project
                      </h4>
                      <p class="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
                        {{ project.fullDescription }}
                      </p>
                    </div>

                    <div>
                      <h4
                        class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2"
                      >
                        <i class="fas fa-star text-primary"></i>
                        {{ $t('modal.key_features') }}
                      </h4>
                      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div
                          v-for="feature in project.features"
                          :key="feature"
                          class="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-700 flex items-start gap-3"
                        >
                          <div class="mt-1 w-2 h-2 rounded-full bg-primary flex-shrink-0"></div>
                          <span class="text-gray-700 dark:text-gray-300 text-sm font-medium">{{
                            feature
                          }}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <!-- Right Column: Specs & Actions -->
                  <div class="space-y-8">
                    <!-- Actions -->
                    <div class="flex flex-col gap-3">
                      <a
                        v-if="project.displayLiveUrl"
                        :href="project.liveUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-full inline-flex justify-center items-center px-6 py-3.5 border border-transparent text-base font-bold rounded-xl text-white bg-primary hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25"
                      >
                        <i class="fas fa-external-link-alt mr-2"></i>
                        {{ $t('modal.view_demo') }}
                      </a>
                      <a
                        v-if="project.displayGithubUrl"
                        :href="project.githubUrl"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="w-full inline-flex justify-center items-center px-6 py-3.5 border border-gray-200 dark:border-gray-700 text-base font-bold rounded-xl text-gray-700 dark:text-white bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all"
                      >
                        <i class="fab fa-github mr-2"></i>
                        {{ $t('modal.view_code') }}
                      </a>
                    </div>

                    <!-- Tech Stack -->
                    <div>
                      <h4 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                        Technologies
                      </h4>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="tech in project.technologies"
                          :key="tech"
                          class="px-3 py-1.5 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2"
                        >
                          <i :class="getTechIcon(tech)" class="text-primary"></i>
                          {{ tech }}
                        </span>
                      </div>
                    </div>

                    <!-- Project Metadata (Optional) -->
                    <div
                      class="p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-800"
                    >
                      <div class="flex items-center gap-3 mb-2">
                        <div
                          class="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-800 flex items-center justify-center text-blue-600 dark:text-blue-300"
                        >
                          <i class="fas fa-info"></i>
                        </div>
                        <span class="text-sm font-bold text-blue-900 dark:text-blue-200"
                          >Project Status</span
                        >
                      </div>
                      <p class="text-xs text-blue-700 dark:text-blue-300 ml-11">
                        Completed & Deployed
                      </p>
                    </div>
                  </div>
                </div>

                <!-- Gallery Section -->
                <div v-if="project.gallery && project.gallery.length > 0" class="px-8 pb-8">
                  <h4
                    class="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center gap-2"
                  >
                    <i class="fas fa-images text-primary"></i>
                    Project Gallery
                  </h4>
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      v-for="(image, index) in project.gallery"
                      :key="index"
                      class="group relative rounded-xl overflow-hidden shadow-md border border-gray-100 dark:border-gray-700 aspect-video"
                    >
                      <img
                        :src="image.src || image"
                        :alt="image.caption || `Gallery Image ${index + 1}`"
                        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        v-if="image.caption"
                        class="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {{ image.caption }}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Dialog>
    </TransitionRoot>
  </Teleport>
</template>

<script setup>
import {
  TransitionRoot,
  TransitionChild,
  Dialog,
  DialogOverlay,
  DialogTitle
} from '@headlessui/vue'

defineProps({
  project: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close'])

function CloseModal() {
  emit('close')
}

const getTechIcon = (tech) => {
  const map = {
    PHP: 'fab fa-php',
    Laravel: 'fab fa-laravel',
    Vue: 'fab fa-vuejs',
    'Vue.js': 'fab fa-vuejs',
    JavaScript: 'fab fa-js',
    React: 'fab fa-react',
    Angular: 'fab fa-angular',
    'Node.js': 'fab fa-node-js',
    Python: 'fab fa-python',
    Java: 'fab fa-java',
    Docker: 'fab fa-docker',
    AWS: 'fab fa-aws',
    CSS: 'fab fa-css3-alt',
    HTML: 'fab fa-html5',
    Sass: 'fab fa-sass',
    Bootstrap: 'fab fa-bootstrap',
    'Tailwind CSS': 'fas fa-wind',
    MySQL: 'fas fa-database',
    PostgreSQL: 'fas fa-database',
    MongoDB: 'fas fa-leaf',
    Git: 'fab fa-git-alt',
    Drupal: 'fab fa-drupal',
    JQuery: 'fas fa-code',
    Vite: 'fas fa-bolt',
    'Api Integration': 'fas fa-network-wired',
    'React Native': 'fab fa-react',
    Webpack: 'fas fa-box-open',
    'Payment APIs': 'fas fa-credit-card',
    'E-Invoicing': 'fas fa-file-invoice-dollar',
    'Shopify API': 'fab fa-shopify',
    Ajax: 'fas fa-sync',
    Materialize: 'fab fa-css3-alt',
    'Materialize CSS': 'fab fa-css3-alt',
    PWA: 'fas fa-mobile-alt',
    RapidAPI: 'fas fa-network-wired',
    'Chart.js': 'fas fa-chart-bar',
    CodeIgniter: 'fas fa-fire',
    WordPress: 'fab fa-wordpress',
    Scrapy: 'fas fa-spider',
    Magento: 'fab fa-magento',
    Security: 'fas fa-shield-alt',
    'SEO Recovery': 'fas fa-search-dollar',
    jQuery: 'fas fa-code'
  }
  return map[tech] || 'fas fa-code'
}
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>
