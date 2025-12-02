<template>
  <div
    class="relative group perspective-container"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    ref="container"
  >
    <div
      class="w-64 h-64 mx-auto rounded-full overflow-hidden shadow-2xl ring-4 ring-offset-4 ring-offset-white dark:ring-offset-dark-bg ring-primary/50 dark:ring-primary/50 transition-all duration-100 ease-out group-hover:ring-primary transform-style-3d"
      :style="cardStyle"
    >
      <img
        :src="profileImage"
        alt="Carlos Developer"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
      />
    </div>
    <div
      class="absolute -bottom-2 -right-2 bg-white dark:bg-dark-card rounded-full p-4 shadow-xl border border-gray-100 dark:border-gray-700 animate-bounce-slow z-10"
      :style="floatingIconStyle"
    >
      <span class="text-4xl">👨‍💻</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import profileImage from '@/assets/images/avatar.jpg'

const container = ref(null)
const rotateX = ref(0)
const rotateY = ref(0)

const handleMouseMove = (e) => {
  if (!container.value) return

  const rect = container.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  rotateY.value = ((x - centerX) / centerX) * 15 // Max 15deg rotation
  rotateX.value = -((y - centerY) / centerY) * 15
}

const handleMouseLeave = () => {
  rotateX.value = 0
  rotateY.value = 0
}

const cardStyle = computed(() => {
  return {
    transform: `perspective(1000px) rotateX(${rotateX.value}deg) rotateY(${rotateY.value}deg)`
  }
})

const floatingIconStyle = computed(() => {
  return {
    transform: `translateZ(30px) translateX(${rotateY.value * 0.5}px) translateY(${rotateX.value * 0.5}px)`
  }
})
</script>

<style scoped>
.perspective-container {
  perspective: 1000px;
}
.transform-style-3d {
  transform-style: preserve-3d;
}
</style>
