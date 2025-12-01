<template>
  <div class="relative group">
    <div
      class="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-offset-4 ring-offset-white dark:ring-offset-dark-bg ring-primary/50 dark:ring-primary/50 transition-all duration-500 group-hover:ring-primary"
    >
      <img
        :src="profileImage"
        alt="Carlos Developer"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div
      class="absolute -bottom-2 -right-2 bg-white dark:bg-dark-card rounded-full p-4 shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce-slow"
    >
      <span class="text-4xl">👨‍💻</span>
    </div>
  </div>
</template>

<script setup>
// const profileImage = ref('https://picsum.photos/500/500');
import profileImage from '@/assets/images/avatar.jpg'
</script>

<style scoped></style>
