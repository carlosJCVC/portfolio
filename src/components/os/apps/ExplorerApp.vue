<template>
  <div class="h-full flex flex-col bg-[#1e1e1e] text-gray-300 font-sans select-none">
    <!-- Toolbar -->
    <div class="h-12 border-b border-gray-700 flex items-center px-4 gap-4 bg-[#252526]">
      <div class="flex gap-2 text-gray-500">
        <button class="hover:text-white transition-colors">
          <i class="fas fa-arrow-left"></i>
        </button>
        <button class="hover:text-white transition-colors">
          <i class="fas fa-arrow-right"></i>
        </button>
        <button class="hover:text-white transition-colors"><i class="fas fa-arrow-up"></i></button>
      </div>
      <div
        class="flex-grow bg-[#1e1e1e] rounded px-3 py-1 text-sm border border-gray-700 flex items-center gap-2"
      >
        <i class="fas fa-folder text-yellow-500"></i>
        <span>~/projects</span>
      </div>
      <div class="relative">
        <input
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
        <SidebarItem icon="fas fa-home" label="Home" active />
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
            v-for="project in projects"
            :key="project.id"
            :label="project.title"
            icon="fas fa-folder"
            color="text-blue-400"
            @dblclick="openProject(project)"
          />

          <!-- Mock Files -->
          <FileIcon label="resume.pdf" icon="fas fa-file-pdf" color="text-red-400" />
          <FileIcon label="notes.txt" icon="fas fa-file-alt" color="text-gray-400" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import SidebarItem from './components/SidebarItem.vue'
import FileIcon from './components/FileIcon.vue'

// Mock Data (Ideally this comes from a store or prop)
const projects = ref([
  { id: 1, title: 'AI Analytics', type: 'folder' },
  { id: 2, title: 'Crypto Dashboard', type: 'folder' },
  { id: 3, title: 'Social Graph', type: 'folder' },
  { id: 4, title: 'IoT Controller', type: 'folder' }
])

const openProject = (project) => {
  // In a real OS, this would navigate into the folder
  console.log('Opening project:', project.title)
}
</script>
