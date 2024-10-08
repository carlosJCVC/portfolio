<template>
    <div class="mb-12">
        <div class="flex justify-center space-x-4" data-aos="fade-up">
            <button v-for="category in categories" :key="category" @click="$emit('filter', category)" :class="[
                'px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300',
                activeCategory === category
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-indigo-100 dark:hover:bg-indigo-900'
            ]">
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
});

defineEmits(['filter']);
</script>

<style scoped>
/* You can add any scoped styles here if needed */
</style>