<template>
  <div
    class="px-2 py-1 rounded cursor-pointer flex items-center gap-2 transition-colors"
    :class="
      active ? 'bg-blue-600 text-white' : 'text-gray-400 hover:bg-[#2a2d2e] hover:text-gray-200'
    "
  >
    <i :class="[icon, 'w-4 text-center']"></i>
    <span>{{ label }}</span>
  </div>
</template>

<script setup>
defineProps({
  icon: String,
  label: String,
  active: Boolean
})
</script>
