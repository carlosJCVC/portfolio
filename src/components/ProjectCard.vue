<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
    :data-aos="index % 2 === 0 ? 'fade-right' : 'fade-left'"
    :data-aos-delay="index * 100"
  >
    <div class="relative overflow-hidden group aspect-w-16 aspect-h-9">
      <img
        :src="project.image"
        :alt="project.title"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div
        class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
      >
        <button
          @click="$emit('open-modal', project)"
          class="bg-white text-gray-800 px-6 py-3 rounded-full hover:bg-indigo-100 transition-colors duration-300 transform hover:scale-105"
        >
          {{ $t('projects.explore') }}
        </button>
      </div>
    </div>

    <div class="p-6">
      <h3 class="text-2xl font-bold mb-2 text-gray-800 dark:text-gray-200">{{ project.title }}</h3>
      <p class="text-gray-600 dark:text-gray-400 mb-4 text-justify">{{ project.description }}</p>
      <div class="flex flex-wrap gap-2 mb-4">
        <span
          v-for="tech in project.technologies"
          :key="tech"
          class="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 text-xs font-medium rounded-full"
        >
          {{ tech }}
        </span>
      </div>
      <div class="flex justify-between items-center">
        <a
          :href="project.liveUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-200 transition-colors duration-300 flex items-center"
        >
          <span>{{ $t('projects.live') }}</span>
          <svg
            class="w-4 h-4 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            ></path>
          </svg>
        </a>
        <a
          :href="project.githubUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-300 flex items-center"
        >
          <svg
            class="w-5 h-5 mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.747-1.026 2.747-1.026.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z"
            ></path>
          </svg>
          <span>{{ $t('projects.view') }}</span>
        </a>
      </div>
    </div>
    <div
      v-if="project.featured"
      class="absolute top-4 right-4 bg-yellow-400 text-gray-800 px-3 py-1 rounded-full text-xs font-bold shadow-md"
    >
      {{ $t('projects.featured') }}
    </div>
  </div>
</template>

<script setup>
defineProps({
  project: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
</script>
