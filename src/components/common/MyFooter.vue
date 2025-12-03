<template>
  <footer class="py-12 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-dark-bg transition-colors duration-300">
    <div class="container mx-auto px-4 text-center">
      <p class="text-gray-500 dark:text-gray-400 text-sm mb-6">
        Designed & Built with <span class="text-red-500 animate-pulse">❤️</span> using
      </p>
      
      <!-- Tech Stack Icons -->
      <div class="flex justify-center gap-8 text-3xl text-gray-400 dark:text-gray-600 mb-8">
        <i class="fab fa-vuejs hover:text-green-500 transition-colors transform hover:scale-110 duration-300" title="Vue.js"></i>
        <i class="fas fa-wind hover:text-teal-400 transition-colors transform hover:scale-110 duration-300" title="Tailwind CSS"></i>
        <i class="fab fa-js hover:text-yellow-400 transition-colors transform hover:scale-110 duration-300" title="JavaScript"></i>
        <i class="fas fa-bolt hover:text-purple-500 transition-colors transform hover:scale-110 duration-300" title="Vite"></i>
      </div>

      <div class="flex flex-col md:flex-row justify-center items-center gap-4 md:gap-8 text-sm text-gray-400 dark:text-gray-600">
        <p>© {{ new Date().getFullYear() }} Carlos Veizaga. All rights reserved.</p>
        <span class="hidden md:block">•</span>
        <p>Crafted with passion in Bolivia 🇧🇴</p>
      </div>
    </div>
  </footer>
</template>
