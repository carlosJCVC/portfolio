<template>
  <div class="h-full flex flex-col bg-[#1e1e1e] text-gray-300 font-sans select-none">
    <!-- Toolbar -->
    <div class="h-12 border-b border-gray-700 flex items-center px-4 gap-4 bg-[#252526]">
      <div class="flex gap-2 text-gray-500">
        <button
          class="hover:text-white transition-colors"
          :class="{ 'opacity-50 cursor-not-allowed': currentPath.length === 0 }"
          @click="goBack"
        >
          <i class="fas fa-arrow-left"></i>
        </button>
        <button class="hover:text-white transition-colors opacity-50 cursor-not-allowed">
          <i class="fas fa-arrow-right"></i>
        </button>
        <button class="hover:text-white transition-colors" @click="goHome">
          <i class="fas fa-arrow-up"></i>
        </button>
      </div>
      <div
        class="flex-grow bg-[#1e1e1e] rounded px-3 py-1 text-sm border border-gray-700 flex items-center gap-2"
      >
        <i class="fas fa-folder text-yellow-500"></i>
        <span>{{ currentPathString }}</span>
      </div>
      <div class="relative">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search"
          class="bg-[#1e1e1e] rounded-full px-3 py-1 text-sm border border-gray-700 focus:border-blue-500 outline-none w-48"
        />
      </div>
    </div>

    <div class="flex-grow flex overflow-hidden">
      <!-- Sidebar -->
      <div class="w-48 border-r border-gray-700 bg-[#252526] p-2 flex flex-col gap-1 text-sm">
        <div class="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mt-2">
          Favorites
        </div>
        <SidebarItem icon="fas fa-home" label="Home" :active="currentPath.length === 0" @click="goHome" />
        <SidebarItem icon="fas fa-desktop" label="Desktop" />
        <SidebarItem icon="fas fa-download" label="Downloads" />

        <div class="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">
          Locations
        </div>
        <SidebarItem icon="fas fa-hdd" label="Macintosh HD" />
        <SidebarItem icon="fab fa-google-drive" label="iCloud Drive" />

        <div class="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">
          Tags
        </div>
        <SidebarItem icon="fas fa-circle text-red-500" label="Important" />
        <SidebarItem icon="fas fa-circle text-green-500" label="Work" />
      </div>

      <!-- Main Content (Grid View) -->
      <div class="flex-grow p-4 overflow-auto">
        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <FileIcon
            v-for="item in currentItems"
            :key="item.id"
            :label="item.name"
            :icon="item.icon"
            :color="item.color"
            @dblclick="handleItemClick(item)"
          />
          
          <div v-if="currentItems.length === 0" class="col-span-full text-center text-gray-500 mt-10">
            This folder is empty.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SidebarItem from './components/SidebarItem.vue'
import FileIcon from './components/FileIcon.vue'
import { projects } from '@/data/projects'

const currentPath = ref([]) // [] = root, ['Project Name'] = inside project
const searchQuery = ref('')

// Computed view of current directory
const currentItems = computed(() => {
  if (currentPath.value.length === 0) {
    // Root: Show all projects as folders
    return projects.map(p => ({
      id: p.id,
      name: p.title,
      type: 'folder',
      icon: 'fas fa-folder',
      color: 'text-blue-400',
      data: p
    }))
  } else {
    // Inside a project: Show files
    const projectName = currentPath.value[0]
    const project = projects.find(p => p.title === projectName)
    if (project) {
      return project.files.map((f, i) => ({
        id: `file-${i}`,
        name: f.name,
        type: f.type,
        icon: f.icon,
        color: f.color,
        data: project // Pass project data for context
      }))
    }
    return []
  }
})

const currentPathString = computed(() => {
  return '~/projects' + (currentPath.value.length ? '/' + currentPath.value.join('/') : '')
})

const handleItemClick = (item) => {
  if (item.type === 'folder') {
    currentPath.value.push(item.name)
  } else if (item.type === 'link') {
    // Open Link
    if (item.name.includes('source')) {
      window.open(item.data.githubUrl, '_blank')
    } else {
      window.open(item.data.liveUrl, '_blank')
    }
  } else if (item.type === 'file' && item.name === 'README.md') {
    alert(`README for ${item.data.title}:\n\n${item.data.fullDescription}\n\nTech Stack: ${item.data.technologies.join(', ')}`)
  } else if (item.type === 'image') {
    // Simple image preview (could be a modal in future)
    alert('Image preview coming soon!')
  }
}

const goBack = () => {
  if (currentPath.value.length > 0) {
    currentPath.value.pop()
  }
}

const goHome = () => {
  currentPath.value = []
}
</script>
