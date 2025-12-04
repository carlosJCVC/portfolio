<template>
  <div class="h-full flex bg-[#1e1e1e] text-gray-300 font-sans select-none">
    <!-- Activity Bar -->
    <div class="w-12 bg-[#333333] flex flex-col items-center py-4 gap-6 border-r border-[#1e1e1e]">
      <i
        class="far fa-copy text-2xl text-white cursor-pointer opacity-100 border-l-2 border-white pl-3 -ml-3"
      ></i>
      <i
        class="fas fa-search text-2xl text-gray-500 hover:text-white cursor-pointer transition-colors"
      ></i>
      <i
        class="fas fa-code-branch text-2xl text-gray-500 hover:text-white cursor-pointer transition-colors"
      ></i>
      <i
        class="far fa-envelope text-2xl text-gray-500 hover:text-white cursor-pointer transition-colors"
      ></i>
      <div class="flex-grow"></div>
      <i
        class="fas fa-cog text-2xl text-gray-500 hover:text-white cursor-pointer transition-colors"
      ></i>
    </div>

    <!-- Sidebar (Explorer) -->
    <div class="w-60 bg-[#252526] flex flex-col text-sm border-r border-[#1e1e1e]">
      <div
        class="px-4 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider flex justify-between items-center"
      >
        <span>Explorer</span>
        <i class="fas fa-ellipsis-h"></i>
      </div>

      <!-- Project Folder -->
      <div class="mt-2">
        <div
          class="px-2 py-1 flex items-center gap-1 hover:bg-[#2a2d2e] cursor-pointer text-blue-400 font-bold"
        >
          <i class="fas fa-chevron-down text-xs w-4 text-center"></i>
          <span>PORTFOLIO</span>
        </div>

        <!-- Files -->
        <div class="flex flex-col">
          <div
            v-for="file in files"
            :key="file.name"
            class="px-8 py-1 flex items-center gap-2 hover:bg-[#2a2d2e] cursor-pointer transition-colors"
            :class="{ 'bg-[#37373d] text-white': activeFile.name === file.name }"
            @click="openFile(file)"
          >
            <i :class="file.icon" :style="{ color: file.color }"></i>
            <span>{{ file.name }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Editor Area -->
    <div class="flex-grow flex flex-col bg-[#1e1e1e]">
      <!-- Tabs -->
      <div class="flex bg-[#252526] overflow-x-auto">
        <div
          v-for="file in openFiles"
          :key="file.name"
          class="px-4 py-2 text-sm flex items-center gap-2 border-r border-[#1e1e1e] cursor-pointer min-w-[120px] group"
          :class="
            activeFile.name === file.name
              ? 'bg-[#1e1e1e] text-white border-t-2 border-t-blue-500'
              : 'text-gray-500 hover:bg-[#2d2d2d]'
          "
          @click="openFile(file)"
        >
          <i :class="file.icon" :style="{ color: file.color }" class="text-xs"></i>
          <span class="truncate">{{ file.name }}</span>
          <i
            class="fas fa-times ml-auto text-xs opacity-0 group-hover:opacity-100 hover:bg-gray-700 rounded-sm p-0.5 transition-all"
            @click.stop="closeFile(file)"
          ></i>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div
        class="h-6 bg-[#1e1e1e] flex items-center px-4 text-xs text-gray-500 gap-2 border-b border-[#2d2d2d]"
      >
        <span>portfolio</span>
        <i class="fas fa-chevron-right text-[10px]"></i>
        <span>src</span>
        <i class="fas fa-chevron-right text-[10px]"></i>
        <span class="text-white">{{ activeFile.name }}</span>
      </div>

      <!-- Code Content -->
      <div class="flex-grow flex overflow-auto font-mono text-sm relative">
        <!-- Line Numbers -->
        <div class="w-12 bg-[#1e1e1e] text-gray-600 text-right pr-4 py-4 select-none leading-6">
          <div v-for="n in lineCount" :key="n">{{ n }}</div>
        </div>

        <!-- Code -->
        <div
          class="flex-grow p-4 text-gray-300 leading-6 whitespace-pre"
          v-html="activeFile.content"
        ></div>
      </div>

      <!-- Status Bar -->
      <div
        class="h-6 bg-[#007acc] text-white text-xs flex items-center px-3 justify-between select-none"
      >
        <div class="flex items-center gap-4">
          <div class="flex items-center gap-1">
            <i class="fas fa-code-branch text-[10px]"></i>
            <span>main*</span>
          </div>
          <div class="flex items-center gap-1">
            <i class="far fa-times-circle"></i>
            <span>0</span>
            <i class="fas fa-exclamation-triangle"></i>
            <span>0</span>
          </div>
        </div>
        <div class="flex items-center gap-4">
          <span>Ln 12, Col 45</span>
          <span>UTF-8</span>
          <span>JavaScript</span>
          <i class="far fa-bell"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { profile } from '@/data/profile'

const files = [
  {
    name: 'about.js',
    icon: 'fab fa-js',
    color: '#f7df1e',
    content: `<span class="text-purple-400">class</span> <span class="text-yellow-300">Developer</span> <span class="text-white">{</span>
  <span class="text-blue-400">constructor</span>() <span class="text-white">{</span>
    <span class="text-blue-300">this</span>.<span class="text-blue-300">name</span> = <span class="text-green-300">'${profile.name}'</span>;
    <span class="text-blue-300">this</span>.<span class="text-blue-300">role</span> = <span class="text-green-300">'${profile.role}'</span>;
    <span class="text-blue-300">this</span>.<span class="text-blue-300">location</span> = <span class="text-green-300">'${profile.location}'</span>;
  <span class="text-white">}</span>

  <span class="text-yellow-300">getSkills</span>() <span class="text-white">{</span>
    <span class="text-purple-400">return</span> [
      ${Object.values(profile.skills)
        .flatMap((cat) => cat.items)
        .map((s) => `<span class="text-green-300">'${s}'</span>`)
        .join(', ')}
    ];
  <span class="text-white">}</span>
<span class="text-white">}</span>

<span class="text-purple-400">export default</span> <span class="text-yellow-300">Developer</span>;`
  },
  {
    name: 'contact.json',
    icon: 'fas fa-code',
    color: '#e34c26',
    content: `<span class="text-white">{</span>
  <span class="text-blue-300">"email"</span>: <span class="text-green-300">"${profile.email}"</span>,
  <span class="text-blue-300">"github"</span>: <span class="text-green-300">"${profile.social.github.replace('https://', '')}"</span>,
  <span class="text-blue-300">"linkedin"</span>: <span class="text-green-300">"${profile.social.linkedin.replace('https://', '')}"</span>,
  <span class="text-blue-300">"availableForHire"</span>: <span class="text-purple-400">${profile.openToWork}</span>
<span class="text-white">}</span>`
  },
  {
    name: 'README.md',
    icon: 'fas fa-info-circle',
    color: '#42b883',
    content: `<span class="text-blue-400"># Welcome to DevOS</span>

This portfolio is built as a functional Operating System simulation.
It demonstrates advanced <strong>Vue 3</strong> concepts, state management with <strong>Pinia</strong>,
and styling with <strong>Tailwind CSS</strong>.

## Features
- Window Management (Drag, Resize, Minimize)
- Functional Terminal & File System
- Real-time Clock & Taskbar
- VS Code-style Editor (You are here!)

Feel free to explore the source code on GitHub.`
  }
]

const openFiles = ref([...files])
const activeFile = ref(files[0])

const lineCount = computed(() => {
  return activeFile.value.content.split('\n').length
})

const openFile = (file) => {
  if (!openFiles.value.find((f) => f.name === file.name)) {
    openFiles.value.push(file)
  }
  activeFile.value = file
}

const closeFile = (file) => {
  const index = openFiles.value.findIndex((f) => f.name === file.name)
  if (index !== -1) {
    openFiles.value.splice(index, 1)
    if (activeFile.value.name === file.name) {
      activeFile.value = openFiles.value[Math.max(0, index - 1)] || null
    }
  }
}
</script>
