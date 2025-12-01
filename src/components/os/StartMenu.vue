<template>
  <div
    class="absolute bottom-14 left-4 w-80 bg-[#1e1e1e]/95 backdrop-blur-xl rounded-xl border border-gray-700 shadow-2xl flex flex-col overflow-hidden transition-all duration-200 origin-bottom-left z-[9999]"
    :class="isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'"
  >
    <!-- User Profile -->
    <div class="p-4 border-b border-gray-700 flex items-center gap-3 bg-[#252526]">
      <div
        class="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg"
      >
        CV
      </div>
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
        <span class="text-[10px] text-gray-400 group-hover:text-white">{{ app.title }}</span>
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
          <i class="fab fa-github text-gray-400 group-hover:text-white"></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">GitHub Profile</div>
            <div class="text-gray-500 text-[10px]">View source code</div>
          </div>
        </a>
        <a
          href="#"
          class="flex items-center gap-3 p-2 rounded hover:bg-white/5 cursor-pointer transition-colors group"
        >
          <i class="fas fa-file-pdf text-red-400"></i>
          <div class="flex-grow">
            <div class="text-gray-300 text-sm group-hover:text-white">Resume.pdf</div>
            <div class="text-gray-500 text-[10px]">Recently updated</div>
          </div>
        </a>
      </div>
    </div>

    <!-- Power Options -->
    <div class="p-2 bg-[#1e1e1e] border-t border-gray-700 flex justify-between items-center">
      <button
        class="p-2 rounded hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
      >
        <i class="fas fa-cog"></i>
      </button>
      <button
        class="p-2 rounded hover:bg-red-500/20 text-gray-400 hover:text-red-400 transition-colors"
        @click="shutdown"
      >
        <i class="fas fa-power-off"></i>
      </button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: Boolean,
  apps: Array
})

const emit = defineEmits(['close', 'launch'])

// Filter apps for the pinned section (excluding browser for now if null)
const pinnedApps = props.apps.filter((app) => app.component)

const launch = (app) => {
  emit('launch', app)
  emit('close')
}

const shutdown = () => {
  // Fun shutdown effect? For now just reload or alert
  if (confirm('Are you sure you want to shut down the system?')) {
    window.location.reload()
  }
}
</script>
