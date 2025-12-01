<template>
  <div
    class="flex flex-col items-center gap-2 p-2 rounded hover:bg-blue-500/20 cursor-pointer group transition-colors border border-transparent hover:border-blue-500/30"
  >
    <i
      :class="[icon, color, 'text-5xl drop-shadow-lg group-hover:scale-105 transition-transform']"
    ></i>
    <span
      class="text-xs text-center text-gray-300 px-1 rounded group-hover:text-white truncate w-full"
      >{{ label }}</span
    >
  </div>
</template>

<script setup>
defineProps({
  label: String,
  icon: String,
  color: {
    type: String,
    default: 'text-gray-400'
  }
})
</script>
