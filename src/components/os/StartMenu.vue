<template>
  <div
    class="absolute bottom-14 left-4 w-80 bg-[#1e1e1e]/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 origin-bottom-left z-[9999]"
    :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'"
  >
    <!-- User Profile -->
    <div class="p-4 border-b border-gray-700 flex items-center gap-3 bg-[#252526]">
      <img
        src="@/assets/images/avatar.jpg"
        alt="Carlos Veizaga"
        class="w-10 h-10 rounded-full object-cover border border-gray-600"
      />
      <div>
        <div class="text-white font-bold text-sm">Carlos Veizaga</div>
        <div class="text-gray-400 text-xs">Full Stack Developer</div>
      </div>
    </div>

    <!-- Pinned Apps -->
    <div class="p-2 grid grid-cols-4 gap-2">
      <div
        v-for="app in pinnedApps"
        :key="app.id"
        class="flex flex-col items-center gap-1 p-2 rounded hover:bg-white/10 cursor-pointer transition-colors group"
        @click="launch(app)"
      >
        <div
          class="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-xl text-gray-300 group-hover:text-white group-hover:bg-white/10 transition-all"
        >
          <i :class="app.icon"></i>
        </div>
        <span class="text-[10px] text-gray-400 group-hover:text-white">
          {{ app.title }}
        </span>
      </div>
    </div>

    <!-- Recent Files / Links -->
    <div class="p-4 bg-[#252526] border-t border-gray-700">
      <div class="text-xs font-bold text-gray-500 uppercase mb-2">Recommended</div>
      <div class="space-y-1">
        <a
          href="https://github.com/carlosJCVC"
          target="_blank"
          class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <i class="fab fa-github text-gray-400 group-hover:text-white text-lg w-6 text-center"></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">GitHub Profile</div>
            <div class="text-gray-500 text-[10px]">Check out my repos</div>
          </div>
        </a>

        <a
          href="https:www.linkedin.com/in/jcarlos-veizaga"
          target="_blank"
          class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <i
            class="fab fa-linkedin text-blue-400 group-hover:text-blue-300 text-lg w-6 text-center"
          ></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">LinkedIn</div>
            <div class="text-gray-500 text-[10px]">Let's connect</div>
          </div>
        </a>

        <a
          :href="resumeUrl"
          download="Carlos_Veizaga_Resume.pdf"
          class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <i
            class="fas fa-file-pdf text-red-400 group-hover:text-red-300 text-lg w-6 text-center"
          ></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">Resume.pdf</div>
            <div class="text-gray-500 text-[10px]">Download CV</div>
          </div>
        </a>

        <a
          href="mailto:carlos.veizaga.c@gmail.com"
          class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <i
            class="fas fa-envelope text-green-400 group-hover:text-green-300 text-lg w-6 text-center"
          ></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">Email Me</div>
            <div class="text-gray-500 text-[10px]">carlos.veizaga.c@gmail.com</div>
          </div>
        </a>
      </div>
    </div>

    <!-- Power Options -->
    <div class="p-4 border-t border-gray-700 flex justify-between items-center bg-[#252526]">
      <button
        class="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors text-sm text-gray-300"
        @click="goToClassic"
      >
        <i class="fas fa-sign-out-alt"></i>
        <span>Exit to Classic Site</span>
      </button>
      <button
        class="flex items-center gap-2 px-3 py-2 rounded hover:bg-white/10 transition-colors text-sm text-gray-300"
        @click="shutdown"
      >
        <i class="fas fa-power-off"></i>
        <span>Shut Down</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import resumeUrl from '@/assets/Carlos_Veizaga_Resume.pdf'

const props = defineProps({
  isOpen: Boolean,
  apps: Array
})

const emit = defineEmits(['close', 'launch'])
const router = useRouter()

// Filter apps for the pinned section (excluding browser for now if null)
const pinnedApps = props.apps.filter((app) => app.component && app.id !== 'settings')

const launch = (app) => {
  emit('launch', app)
  emit('close')
}

const openSettings = () => {
  const settingsApp = props.apps.find((app) => app.id === 'settings')
  if (settingsApp) {
    emit('launch', settingsApp)
  }
}

const goToClassic = () => {
  router.push('/classic')
}

const shutdown = () => {
  // Placeholder for shutdown logic
  alert('Shutting down...')
}
</script>
```
