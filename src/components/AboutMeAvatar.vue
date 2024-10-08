<template>
    <div class="relative">
        <div
            class="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-indigo-500 dark:ring-indigo-400">
            <img :src="profileImage" alt="Carlos Developer"
                class="w-full h-full object-cover transition-transform duration-500 hover:scale-110">
        </div>
        <div class="absolute -bottom-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-3 shadow-lg">
            <span class="text-3xl">👨‍💻</span>
        </div>
    </div>
</template>

<script setup>
// const profileImage = ref('https://picsum.photos/500/500');
import profileImage from "@/assets/images/avatar.png"
</script>

<style scoped></style>