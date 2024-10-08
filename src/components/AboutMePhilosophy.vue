<template>
    <div>
        <h3 class="text-2xl font-semibold mb-6 dark:text-gray-200">My Development Philosophy</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div v-for="(principle, index) in principles" :key="index"
                class="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <i :class="principle.icon + ' text-4xl text-indigo-500 mb-4'"></i>
                <h4 class="text-xl font-semibold mb-2 dark:text-gray-200">{{ principle.title }}</h4>
                <p class="text-gray-600 dark:text-gray-400">{{ principle.description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
const principles = [
    {
        icon: 'fas fa-lightbulb',
        title: 'Innovative Solutions',
        description: 'I believe in thinking outside the box to solve complex problems with elegant solutions.'
    },
    {
        icon: 'fas fa-users',
        title: 'User-Centric Approach',
        description: 'Every line of code I write is with the end-user in mind, ensuring intuitive and enjoyable experiences.'
    },
    {
        icon: 'fas fa-rocket',
        title: 'Continuous Learning',
        description: 'In this ever-evolving field, I\'m committed to staying at the forefront of new technologies and best practices.'
    }
];
</script>

<style lang="scss" scoped></style>