<template>
  <div
    class="h-full font-mono p-4 text-sm overflow-auto relative transition-colors duration-300"
    :class="themeClasses"
    @click="focusInput"
  >
    <!-- Matrix Overlay -->
    <canvas
      v-if="showMatrix"
      ref="matrixCanvas"
      class="absolute inset-0 pointer-events-none opacity-50"
    ></canvas>

    <div class="relative z-10">
      <div v-for="(line, i) in history" :key="i" class="mb-1">
        <span class="font-bold" :class="theme === 'retro' ? 'text-amber-600' : 'text-blue-400'">visitor@carlos-dev</span>:<span :class="theme === 'retro' ? 'text-amber-200' : 'text-white'">{{
          line.path || '~'
        }}</span
        >$ {{ line.cmd }}
        <div
          v-if="line.output"
          class="whitespace-pre-wrap mt-1"
          :class="theme === 'retro' ? 'text-amber-300' : 'text-gray-300'"
          v-html="line.output"
        ></div>
      </div>

      <div class="flex items-center">
        <span class="font-bold" :class="theme === 'retro' ? 'text-amber-600' : 'text-blue-400'">visitor@carlos-dev</span>:<span :class="theme === 'retro' ? 'text-amber-200' : 'text-white'">{{
          currentPathString
        }}</span
        >$&nbsp;
        <input
          ref="inputRef"
          v-model="currentCmd"
          @keydown.enter="execute"
          type="text"
          class="bg-transparent border-none outline-none flex-grow"
          :class="theme === 'retro' ? 'text-amber-500' : 'text-inherit'"
          autofocus
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick, computed, watch, onUnmounted } from 'vue'
import { useTerminal } from '@/composables/useTerminal'

const props = defineProps({
  initialCommand: String
})

const inputRef = ref(null)
const matrixCanvas = ref(null)
let matrixInterval

const {
  history,
  currentCmd,
  currentPathString,
  execute: executeCommand,
  theme,
  showMatrix
} = useTerminal()

const themeClasses = computed(() => {
  switch (theme.value) {
    case 'retro':
      return 'bg-[#1a1a1a] text-amber-500'
    case 'cyber':
      return 'bg-[#050510] text-cyan-400'
    case 'matrix':
      return 'bg-black text-green-500'
    default:
      return 'bg-black text-green-400'
  }
})

const execute = async () => {
  await executeCommand()
  await nextTick()
  if (inputRef.value) inputRef.value.scrollIntoView()
}

const focusInput = () => {
  inputRef.value?.focus()
}

// Matrix Effect
const startMatrix = () => {
  const canvas = matrixCanvas.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  
  // Set canvas size to match container
  const container = canvas.parentElement
  canvas.width = container.clientWidth
  canvas.height = container.clientHeight

  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%'
  const fontSize = 14
  const columns = canvas.width / fontSize
  const drops = Array(Math.floor(columns)).fill(1)

  const draw = () => {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = '#0F0' // Green text
    ctx.font = fontSize + 'px monospace'

    for (let i = 0; i < drops.length; i++) {
      const text = letters[Math.floor(Math.random() * letters.length)]
      ctx.fillText(text, i * fontSize, drops[i] * fontSize)
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0
      }
      drops[i]++
    }
  }
  matrixInterval = setInterval(draw, 33)
}

const stopMatrix = () => {
  clearInterval(matrixInterval)
  const canvas = matrixCanvas.value
  if (canvas) {
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
  }
}

watch(showMatrix, (val) => {
  if (val) {
    nextTick(() => startMatrix())
  } else {
    stopMatrix()
  }
})

onMounted(() => {
  focusInput()
  if (props.initialCommand) {
    currentCmd.value = props.initialCommand
    execute()
  }
})

onUnmounted(() => {
  stopMatrix()
})
</script>
