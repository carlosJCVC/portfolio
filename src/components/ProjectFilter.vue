<template>
  <div class="mb-12 flex justify-center">
    <div
      class="relative flex flex-wrap justify-center bg-gray-100 dark:bg-gray-800 p-1.5 rounded-xl"
      data-aos="fade-up"
    >
      <div
        class="absolute h-[calc(100%-0.75rem)] top-1.5 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] bg-white dark:bg-dark-card rounded-lg shadow-sm border border-gray-200/50 dark:border-gray-700/50"
        :style="activePillStyle"
      ></div>

      <button
        v-for="(category, index) in categories"
        :key="category"
        :ref="
          (el) => {
            if (el) buttonRefs[index] = el
          }
        "
        @click="setActiveCategory(category, index)"
        class="relative z-10 px-6 py-2.5 rounded-lg text-sm font-medium transition-colors duration-300"
        :class="[
          activeCategory === category
            ? 'text-gray-900 dark:text-white'
            : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
        ]"
      >
        {{ category }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  categories: {
    type: Array,
    required: true
  },
  activeCategory: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['filter'])

const buttonRefs = ref([])
const activePillStyle = ref({
  left: '0px',
  width: '0px'
})

const setActiveCategory = (category, index) => {
  emit('filter', category)
  updatePillPosition(index)
}

const updatePillPosition = (index) => {
  const button = buttonRefs.value[index]
  if (button) {
    activePillStyle.value = {
      left: `${button.offsetLeft}px`,
      width: `${button.offsetWidth}px`
    }
  }
}

// Watch for active category changes (in case it's changed externally)
watch(
  () => props.activeCategory,
  (newCategory) => {
    const index = props.categories.indexOf(newCategory)
    if (index !== -1) {
      nextTick(() => updatePillPosition(index))
    }
  }
)

onMounted(() => {
  // Initial position
  nextTick(() => {
    const index = props.categories.indexOf(props.activeCategory)
    if (index !== -1) {
      updatePillPosition(index)
    }
  })
})
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>
