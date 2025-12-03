<template>
  <div
    ref="cardRef"
    class="group relative overflow-hidden rounded-3xl bg-white/50 dark:bg-dark-card/50 backdrop-blur-xl border border-white/20 dark:border-gray-700/50 shadow-sm hover:shadow-2xl transition-all duration-200 ease-out perspective-container"
    :class="[spanClass, 'hover:border-primary/40 dark:hover:border-primary/40']"
    @mousemove="handleMouseMove"
    @mouseleave="handleMouseLeave"
    :style="cardStyle"
  >
    <!-- Noise Texture Overlay -->
    <div
      class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] pointer-events-none z-0 mix-blend-overlay"
      style="
        background-image: url(&quot;data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E&quot;);
      "
    ></div>

    <!-- Spotlight Gradient -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-0"
      style="
        background: radial-gradient(
          800px circle at var(--mouse-x, 50%) var(--mouse-y, 50%),
          rgba(var(--color-primary-rgb), 0.06),
          transparent 40%
        );
      "
    ></div>

    <!-- Content -->
    <div class="relative h-full p-6 flex flex-col justify-between z-10 transform-style-3d">
      <!-- Icon/Header -->
      <div class="flex items-start justify-between mb-4 transform-style-3d">
        <div
          class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3 shadow-inner group-hover:shadow-lg relative overflow-hidden"
          :class="iconBgClass"
        >
          <!-- Breathing Glow behind icon -->
          <div class="absolute inset-0 bg-current opacity-20 animate-pulse-slow"></div>
          <i :class="icon" class="relative z-10 transition-colors duration-300"></i>
        </div>
        <div
          v-if="level"
          class="px-2 py-1 rounded-full bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm text-xs font-semibold text-gray-500 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
        >
          {{ level }}%
        </div>
      </div>

      <!-- Text -->
      <div class="transform-style-3d group-hover:translate-z-4 transition-transform duration-300">
        <h3
          class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-primary transition-colors duration-300"
        >
          {{ title }}
        </h3>
        <p class="text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
          {{ description }}
        </p>
      </div>

      <!-- Decorative Background Icon (Faded) -->
      <i
        :class="[
          icon,
          'absolute -bottom-4 -right-4 text-9xl opacity-[0.03] dark:opacity-[0.05] transform rotate-12 group-hover:rotate-0 group-hover:scale-110 transition-transform duration-500 ease-out pointer-events-none z-0'
        ]"
      ></i>
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  icon: String,
  level: Number,
  size: {
    type: String,
    default: '1x1', // 1x1, 2x1, 2x2
    validator: (value) => ['1x1', '2x1', '2x2', 'md-2x1'].includes(value)
  },
  color: {
    type: String,
    default: 'blue' // blue, green, purple, orange, pink
  }
})

const cardRef = ref(null)
const rotateX = ref(0)
const rotateY = ref(0)

const handleMouseMove = (e) => {
  if (!cardRef.value) return

  const rect = cardRef.value.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  const centerX = rect.width / 2
  const centerY = rect.height / 2

  // Calculate rotation (max 5 degrees for subtle effect)
  rotateY.value = ((x - centerX) / centerX) * 5
  rotateX.value = -((y - centerY) / centerY) * 5

  // Update CSS variables for spotlight
  cardRef.value.style.setProperty('--mouse-x', `${x}px`)
  cardRef.value.style.setProperty('--mouse-y', `${y}px`)
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

const spanClass = computed(() => {
  switch (props.size) {
    case '2x1':
      return 'col-span-1 md:col-span-2'
    case '2x2':
      return 'col-span-1 md:col-span-2 row-span-2'
    case 'md-2x1':
      return 'col-span-1 md:col-span-2'
    default:
      return 'col-span-1'
  }
})

const iconBgClass = computed(() => {
  const colors = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
    purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
    orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    pink: 'bg-pink-50 dark:bg-pink-900/20 text-pink-600 dark:text-pink-400',
    teal: 'bg-teal-50 dark:bg-teal-900/20 text-teal-600 dark:text-teal-400',
    yellow: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400'
  }
  return colors[props.color] || colors.blue
})
</script>

<style scoped>
.group {
  --color-primary-rgb: 14, 165, 233;
}

.perspective-container {
  perspective: 1000px;
  transform-style: preserve-3d;
  will-change: transform;
}

.transform-style-3d {
  transform-style: preserve-3d;
}

.group-hover\:translate-z-4 {
  transform: translateZ(20px);
}

.animate-pulse-slow {
  animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.1;
  }
  50% {
    opacity: 0.3;
  }
}
</style>
