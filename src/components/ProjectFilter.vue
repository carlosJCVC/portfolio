<template>
  <div class="mb-12">
    <div class="flex flex-wrap justify-center gap-4" data-aos="fade-up">
      <button
        v-for="category in categories"
        :key="category"
        @click="$emit('filter', category)"
        :class="[
          'px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 border',
          activeCategory === category
            ? 'bg-primary text-white border-primary shadow-lg shadow-primary/30'
            : 'bg-white dark:bg-dark-card text-gray-600 dark:text-gray-300 border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary'
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  }
})

defineEmits(['filter'])
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>
