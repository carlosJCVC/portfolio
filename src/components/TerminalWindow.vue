<template>
  <div
    class="w-full max-w-3xl mx-auto bg-[#1e1e1e] rounded-xl overflow-hidden shadow-2xl border border-gray-700/50 font-mono text-left relative group"
  >
    <!-- Terminal Header -->
    <div class="bg-[#2d2d2d] px-4 py-2 flex items-center gap-2 border-b border-gray-700/50">
      <div class="flex gap-2">
        <div
          class="w-3 h-3 rounded-full bg-[#ff5f56] hover:bg-[#ff5f56]/80 transition-colors"
        ></div>
        <div
          class="w-3 h-3 rounded-full bg-[#ffbd2e] hover:bg-[#ffbd2e]/80 transition-colors"
        ></div>
        <div
          class="w-3 h-3 rounded-full bg-[#27c93f] hover:bg-[#27c93f]/80 transition-colors"
        ></div>
      </div>
      <div
        class="flex-grow text-center text-gray-400 text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity"
      >
        carlos_dev — -zsh — 80x24
      </div>
    </div>

    <!-- Terminal Body -->
    <div
      class="p-6 text-sm md:text-base text-gray-300 min-h-[300px] md:min-h-[360px] overflow-hidden"
    >
      <!-- Line 1: Command -->
      <div class="mb-2">
        <span class="text-green-400">➜</span>
        <span class="text-blue-400 font-bold ml-2">~</span>
        <span class="text-gray-300 ml-2">$</span>
        <span class="text-yellow-300 ml-2 typing-effect">node intro.js</span>
      </div>

      <!-- Output -->
      <div v-if="showOutput" class="space-y-2 animate-fade-in">
        <div class="text-gray-400">// Initializing Developer Profile...</div>
        <div class="text-green-400">✔ Loaded: Carlos Veizaga</div>

        <div class="mt-4">
          <span class="text-purple-400">const</span> <span class="text-blue-400">developer</span> =
          {
        </div>
        <div class="pl-4">
          <span class="text-red-400">name</span>:
          <span class="text-green-300">'Carlos Veizaga'</span>,
        </div>
        <div class="pl-4">
          <span class="text-red-400">role</span>:
          <span class="text-green-300">'Full Stack Developer'</span>,
        </div>
        <div class="pl-4">
          <span class="text-red-400">skills</span>: [ <span class="text-green-300">'Vue.js'</span>,
          <span class="text-green-300">'Node.js'</span>,
          <span class="text-green-300">'DevOps'</span>
          ],
        </div>
        <div class="pl-4">
          <span class="text-red-400">passion</span>:
          <span class="text-green-300">'Building scalable solutions'</span>
        </div>
        <div>};</div>

        <div class="mt-4 text-gray-400">// Ready to collaborate?</div>
        <div class="mt-2">
          <span class="text-green-400">➜</span>
          <span class="text-blue-400 font-bold ml-2">~</span>
          <span class="text-gray-300 ml-2">$</span>
          <span class="ml-2 animate-pulse">_</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const showOutput = ref(false)

onMounted(() => {
  setTimeout(() => {
    showOutput.value = true
  }, 1500) // Delay for "typing" the command
})
</script>

<style scoped>
.typing-effect {
  overflow: hidden;
  white-space: nowrap;
  border-right: 2px solid transparent;
  animation:
    typing 1s steps(15, end),
    blink-caret 0.75s step-end infinite;
  animation-fill-mode: forwards;
  width: 0;
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
  }
}

@keyframes blink-caret {
  from,
  to {
    border-color: transparent;
  }
  50% {
    border-color: #fbbf24;
  } /* yellow-400 */
}

/* Stop caret blinking after typing is done */
.typing-effect {
  animation: typing 1.2s steps(15, end) forwards;
}

.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
