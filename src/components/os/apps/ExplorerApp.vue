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
        <SidebarItem icon="fas fa-hdd" label="Macintosh HD" />
        <SidebarItem icon="fab fa-google-drive" label="iCloud Drive" />

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
import { ref, computed } from 'vue'
import SidebarItem from './components/SidebarItem.vue'
import FileIcon from './components/FileIcon.vue'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'
import { useOSStore } from '@/store/useOSStore'
import CodeEditorApp from './CodeEditorApp.vue'
import ImageViewerApp from './ImageViewerApp.vue'
import TerminalApp from './TerminalApp.vue'
import BrowserApp from './BrowserApp.vue'

const store = useOSStore()

const currentPath = ref([]) // [] = root, ['Project Name'] = inside project
const currentLocation = ref('root') // 'root', 'desktop', 'downloads', 'important', 'work'
const searchQuery = ref('')

// Computed view of current directory
const currentItems = computed(() => {
  let items = []

  // 1. Desktop View
  if (currentLocation.value === 'desktop') {
    items = [
      { id: 'term', name: 'Terminal', type: 'app', icon: 'fas fa-terminal', color: 'text-gray-300', action: 'terminal' },
      { id: 'code', name: 'VS Code', type: 'app', icon: 'fas fa-code', color: 'text-blue-400', action: 'vscode' },
      { id: 'chrome', name: 'Chrome', type: 'app', icon: 'fab fa-chrome', color: 'text-yellow-400', action: 'browser' },
      { id: 'trash', name: 'Trash', type: 'system', icon: 'fas fa-trash', color: 'text-gray-500' }
    ]
  }
  // 2. Downloads View
  else if (currentLocation.value === 'downloads') {
    items = [
      {
        id: 'resume',
        name: 'Resume.pdf',
        type: 'link',
        icon: 'fas fa-file-pdf',
        color: 'text-red-400',
        data: { url: profile.resume }
      },
      {
        id: 'installer',
        name: 'DevOS_Installer.dmg',
        type: 'file',
        icon: 'fas fa-box-open',
        color: 'text-gray-400',
        data: { title: 'DevOS Installer', fullDescription: 'This is a dummy installer file.', technologies: [] }
      }
    ]
  }
  // 3. Projects (Root, Important, Work)
  else {
    let filteredProjects = projects

    if (currentLocation.value === 'important') {
      filteredProjects = projects.filter(p => p.featured)
    }
    // 'work' could be a specific category, for now let's show all or maybe 'Enterprise'
    // Let's make 'work' show everything for now as a "All Projects" alias, or maybe filter by 'Web App'
    // User asked for "Work" to show all or specific. Let's make it show all.
    else if (currentLocation.value === 'work') {
       // No filter, show all
    }

    if (currentPath.value.length === 0) {
      // Root of Projects
      items = filteredProjects.map((p) => ({
        id: p.id,
        name: p.title,
        type: 'folder',
        icon: 'fas fa-folder',
        color: 'text-blue-400',
        data: p
      }))
    } else {
      // Inside a Project (same logic as before)
      const projectName = currentPath.value[0]
      const project = projects.find((p) => p.title === projectName)

      if (!project) return []

      // Level 1: Inside a Project Folder
      if (currentPath.value.length === 1) {
        // README.md
        items.push({
          id: 'readme',
          name: 'README.md',
          type: 'file',
          icon: 'fas fa-file-alt',
          color: 'text-gray-400',
          data: project
        })

        // Source Code Link
        if (project.displayGithubUrl && project.githubUrl) {
          items.push({
            id: 'source',
            name: 'Source Code.url',
            type: 'link',
            icon: 'fab fa-github',
            color: 'text-white',
            data: { url: project.githubUrl }
          })
        }

        // Live Demo Link
        if (project.displayLiveUrl && project.liveUrl) {
          items.push({
            id: 'demo',
            name: 'Live Demo.url',
            type: 'link',
            icon: 'fas fa-globe',
            color: 'text-green-400',
            data: { url: project.liveUrl }
          })
        }

        // Gallery Folder (if has images)
        if (project.gallery && project.gallery.length > 0) {
          items.push({
            id: 'gallery',
            name: 'Gallery',
            type: 'folder',
            icon: 'fas fa-images',
            color: 'text-purple-400',
            data: project
          })
        }
      }

      // Level 2: Inside Gallery
      else if (currentPath.value.length === 2 && currentPath.value[1] === 'Gallery') {
        if (project.gallery) {
          items = project.gallery.map((img, i) => ({
            id: `img-${i}`,
            name: img.caption || `Image ${i + 1}`,
            type: 'image',
            icon: 'fas fa-image',
            color: 'text-purple-300',
            data: img
          }))
        }
      }
    }
  }

  // Apply Search Filter
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    return items.filter((item) => item.name.toLowerCase().includes(query))
  }

  return items
})

const currentPathString = computed(() => {
  let base = '~/'
  if (currentLocation.value === 'desktop') {
    base += 'Desktop'
  } else if (currentLocation.value === 'downloads') {
    base += 'Downloads'
  } else if (currentLocation.value === 'root') {
    base += 'projects'
  } else if (currentLocation.value === 'important') {
    base += 'projects/Important'
  } else if (currentLocation.value === 'work') {
    base += 'projects/Work'
  }

  return base + (currentPath.value.length ? '/' + currentPath.value.join('/') : '')
})

const handleItemClick = (item) => {
  if (item.type === 'folder') {
    currentPath.value.push(item.name)
  } else if (item.type === 'link') {
    // Open Link
    if (item.data && item.data.url) {
      window.open(item.data.url, '_blank')
    }
  } else if (item.type === 'app') {
    // Launch App from Desktop view
    if (item.action === 'terminal') {
      store.openWindow('terminal', 'Terminal', TerminalApp)
    } else if (item.action === 'vscode') {
      store.openWindow('vscode', 'VS Code', CodeEditorApp)
    } else if (item.action === 'browser') {
      store.openWindow('browser', 'Chrome', BrowserApp)
    }
  } else if (item.type === 'file' && item.name === 'README.md') {
    // Open in Code Editor
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

    store.openWindow('vscode', 'VS Code', CodeEditorApp, {
      initialFile: {
        name: `README-${item.data.id}.md`,
        icon: 'fas fa-info-circle',
        color: '#42b883',
        content
      }
    })
  } else if (item.type === 'image') {
    // Open in Image Viewer
    store.openWindow('image-viewer', 'Photos', ImageViewerApp, {
      image: item.data
    })
  }
}

const goToLocation = (loc) => {
  currentLocation.value = loc
  currentPath.value = []
}

const goBack = () => {
  if (currentPath.value.length > 0) {
    currentPath.value.pop()
  }
}

const goHome = () => {
  currentLocation.value = 'root'
  currentPath.value = []
}
</script>
