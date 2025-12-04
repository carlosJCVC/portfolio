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
      <div class="relative flex items-center gap-2">
        <button
          v-if="currentLocation === 'trash'"
          class="bg-red-500/20 hover:bg-red-500/40 text-red-400 px-3 py-1 rounded text-xs border border-red-500/30 transition-colors"
          @click="emptyTrash"
        >
          Empty Trash
        </button>
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
        <SidebarItem
          icon="fas fa-home"
          label="Home"
          :active="currentLocation === 'root'"
          @click="goHome"
        />
        <SidebarItem
          icon="fas fa-desktop"
          label="Desktop"
          :active="currentLocation === 'desktop'"
          @click="goToLocation('desktop')"
        />
        <SidebarItem
          icon="fas fa-download"
          label="Downloads"
          :active="currentLocation === 'downloads'"
          @click="goToLocation('downloads')"
        />

        <div class="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">
          Locations
        </div>
        <SidebarItem
          icon="fas fa-hdd"
          label="Macintosh HD"
          :active="currentLocation === 'macintosh'"
          @click="goToLocation('macintosh')"
        />
        <SidebarItem
          icon="fab fa-google-drive"
          label="iCloud Drive"
          :active="currentLocation === 'icloud'"
          @click="goToLocation('icloud')"
        />

        <div class="px-2 py-1 text-xs font-bold text-gray-500 uppercase tracking-wider mt-4">
          Tags
        </div>
        <SidebarItem
          icon="fas fa-circle text-red-500"
          label="Important"
          :active="currentLocation === 'important'"
          @click="goToLocation('important')"
        />
        <SidebarItem
          icon="fas fa-circle text-green-500"
          label="Work"
          :active="currentLocation === 'work'"
          @click="goToLocation('work')"
        />
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

          <div
            v-if="currentItems.length === 0"
            class="col-span-full text-center text-gray-500 mt-10"
          >
            This folder is empty.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarItem from './components/SidebarItem.vue'
import FileIcon from './components/FileIcon.vue'
import { useOSStore } from '@/store/useOSStore'
import { useFileSystem } from '@/composables/useFileSystem'
import { getAppById } from '@/data/apps'

const store = useOSStore()

const {
  currentPath,
  currentLocation,
  searchQuery,
  currentItems,
  currentPathString,
  goToLocation,
  goBack,
  goHome,
  navigateInto
} = useFileSystem()

const handleItemClick = (item) => {
  if (item.type === 'folder') {
    navigateInto(item.name)
  } else if (item.type === 'link') {
    // Open Link
    if (item.data && item.data.url) {
      window.open(item.data.url, '_blank')
    }
  } else if (item.type === 'app') {
    // Launch App from Desktop view
    const app = getAppById(item.action)
    if (app) {
      store.openWindow(app.id, app.title, app.component, app.props || {})
    }
  } else if (item.type === 'system' && item.action === 'trash') {
    goToLocation('trash')
  } else if (item.type === 'file' && item.name === 'README.md') {
    // Open in Code Editor
    const app = getAppById('vscode')
    if (app) {
      const content = `<span class="text-blue-400"># ${item.data.title}</span>

${item.data.fullDescription}

<span class="text-purple-400">## Tech Stack</span>
${item.data.technologies.map((t) => `- ${t}`).join('\n')}

<span class="text-purple-400">## Features</span>
${
  item.data.features
    ? Object.entries(item.data.features)
        .map(([key, value]) => `- <strong>${key}</strong>: ${value}`)
        .join('\n')
    : 'No specific features listed.'
}`

      store.openWindow(app.id, app.title, app.component, {
        initialFile: {
          name: `README-${item.data.id}.md`,
          icon: 'fas fa-info-circle',
          color: '#42b883',
          content
        }
      })
    }
  } else if (item.type === 'image') {
    // Open in Image Viewer
    const app = getAppById('image-viewer')
    if (app) {
      store.openWindow(app.id, app.title, app.component, {
        image: item.data
      })
    }
  }
}

const emptyTrash = () => {
  store.openDialog({
    title: 'Permission Denied: Emotional Attachment',
    message: 'Error 418: I\'m a teapot. Also, these files are currently being used by your nostalgia. You spent weeks debugging them. You can\'t just throw them away.',
    type: 'warning'
  })
}
</script>
