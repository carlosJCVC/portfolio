<template>
  <component
    :is="link ? 'a' : 'div'"
    :href="link"
    :target="link ? '_blank' : null"
    class="group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl border border-white/10 dark:border-gray-700/50 bg-white/10 dark:bg-dark-card/40 backdrop-blur-md flex flex-col justify-between"
    :class="[sizeClasses, colorClasses, { 'cursor-pointer': link || isCopy }]"
    @click="handleClick"
  >
    <!-- Background Gradient/Glow -->
    <div
      class="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br"
      :class="gradientClasses"
    ></div>

    <!-- Icon/Header -->
    <div class="relative z-10 flex items-start justify-between">
      <div
        class="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3 shadow-lg"
        :class="iconBgClasses"
      >
        <i :class="icon"></i>
      </div>

      <!-- External Link Arrow -->
      <div v-if="link" class="text-gray-400 group-hover:text-white transition-colors">
        <i class="fas fa-arrow-up-right-from-square"></i>
      </div>

      <!-- Copy Icon -->
      <div v-if="isCopy" class="text-gray-400 group-hover:text-white transition-colors">
        <i class="fas" :class="copied ? 'fa-check text-green-400' : 'fa-copy'"></i>
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 mt-4">
      <h3
        class="text-lg font-bold text-gray-900 dark:text-white mb-1 group-hover:text-white transition-colors"
      >
        {{ title }}
      </h3>
      <p
        class="text-sm text-gray-600 dark:text-gray-400 group-hover:text-gray-200 transition-colors"
      >
        {{ subtitle }}
      </p>
    </div>

    <!-- Decorative Background Icon (Faded) -->
    <i
      :class="[
        icon,
        'absolute -bottom-4 -right-4 text-8xl opacity-[0.03] dark:opacity-[0.05] group-hover:scale-110 transition-transform duration-700 rotate-12 pointer-events-none'
      ]"
    ></i>
  </component>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useToast } from 'vue-toastification'

const props = defineProps({
  title: String,
  subtitle: String,
  icon: String,
  size: {
    type: String,
    default: '1x1' // 1x1, 2x1, 2x2
  },
  color: {
    type: String,
    default: 'blue' // blue, green, purple, orange, pink
  },
  link: String,
  isCopy: Boolean,
  copyValue: String
})

const toast = useToast()
const copied = ref(false)

const handleClick = () => {
  if (props.isCopy && props.copyValue) {
    navigator.clipboard.writeText(props.copyValue)
    copied.value = true
    toast.success('Copied to clipboard!')
    setTimeout(() => {
      copied.value = false
    }, 2000)
  }
}

const sizeClasses = computed(() => {
  switch (props.size) {
    case '2x2':
      return 'col-span-1 md:col-span-2 row-span-2 aspect-square md:aspect-auto'
    case '2x1':
      return 'col-span-1 md:col-span-2 row-span-1'
    default:
      return 'col-span-1 row-span-1 aspect-square'
  }
})

const colorClasses = computed(() => {
  // Base background colors for light/dark modes are handled in the template class
  return ''
})

const gradientClasses = computed(() => {
  switch (props.color) {
    case 'blue':
      return 'from-blue-400 to-blue-600'
    case 'green':
      return 'from-emerald-400 to-emerald-600'
    case 'purple':
      return 'from-purple-400 to-purple-600'
    case 'orange':
      return 'from-orange-400 to-orange-600'
    case 'pink':
      return 'from-pink-400 to-pink-600'
    case 'teal':
      return 'from-teal-400 to-teal-600'
    default:
      return 'from-gray-400 to-gray-600'
  }
})

const iconBgClasses = computed(() => {
  switch (props.color) {
    case 'blue':
      return 'bg-blue-500/10 text-blue-500 group-hover:bg-blue-500 group-hover:text-white'
    case 'green':
      return 'bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-white'
    case 'purple':
      return 'bg-purple-500/10 text-purple-500 group-hover:bg-purple-500 group-hover:text-white'
    case 'orange':
      return 'bg-orange-500/10 text-orange-500 group-hover:bg-orange-500 group-hover:text-white'
    case 'pink':
      return 'bg-pink-500/10 text-pink-500 group-hover:bg-pink-500 group-hover:text-white'
    case 'teal':
      return 'bg-teal-500/10 text-teal-500 group-hover:bg-teal-500 group-hover:text-white'
    default:
      return 'bg-gray-500/10 text-gray-500 group-hover:bg-gray-500 group-hover:text-white'
  }
})
</script>
