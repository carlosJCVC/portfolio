<template>
  <div
    class="h-full bg-black text-green-400 font-mono p-4 text-sm overflow-auto"
    @click="focusInput"
  >
    <div v-for="(line, i) in history" :key="i" class="mb-1">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white"
        >~</span
      >$ {{ line.cmd }}
      <div v-if="line.output" class="text-gray-300 whitespace-pre-wrap mt-1">{{ line.output }}</div>
    </div>

    <div class="flex items-center">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white"
        >~</span
      >$&nbsp;
      <input
        ref="inputRef"
        v-model="currentCmd"
        @keydown.enter="execute"
        type="text"
        class="bg-transparent border-none outline-none text-green-400 flex-grow"
        autofocus
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const history = ref([
  {
    cmd: 'welcome',
    output: 'Welcome to Carlos DevOS v1.0.0\nType "help" to see available commands.'
  }
])
const currentCmd = ref('')
const inputRef = ref(null)

const commands = {
  help: 'Available commands:\n  about     - Who am I?\n  skills    - My technical arsenal\n  projects  - View my work\n  contact   - Get in touch\n  clear     - Clear terminal',
  about:
    'I am Carlos Veizaga, a Full Stack Developer passionate about building scalable solutions.',
  skills: 'Vue.js, Node.js, Tailwind CSS, DevOps, and more...',
  contact: 'Email: carlos.veizaga.c@gmail.com',
  clear: null
}

const execute = () => {
  const cmd = currentCmd.value.trim().toLowerCase()

  if (cmd === 'clear') {
    history.value = []
  } else if (commands[cmd]) {
    history.value.push({ cmd, output: commands[cmd] })
  } else if (cmd) {
    history.value.push({ cmd, output: `Command not found: ${cmd}` })
  }

  currentCmd.value = ''

  // Scroll to bottom
  setTimeout(() => {
    if (inputRef.value) inputRef.value.scrollIntoView()
  }, 10)
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  focusInput()
})
</script>
