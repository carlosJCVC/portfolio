import { ref, computed } from 'vue'
import { projects } from '@/data/projects'
import { profile } from '@/data/profile'

export function useFileSystem() {
  const currentPath = ref([]) // [] = root, ['Project Name'] = inside project
  const currentLocation = ref('root') // 'root', 'desktop', 'downloads', 'important', 'work', 'macintosh', 'icloud', 'trash'
  const searchQuery = ref('')

  // Helper to get items for a specific location and path
  const getItems = () => {
    let items = []

    // 1. Desktop View
    if (currentLocation.value === 'desktop') {
      items = [
        { id: 'term', name: 'Terminal', type: 'app', icon: 'fas fa-terminal', color: 'text-gray-300', action: 'terminal' },
        { id: 'code', name: 'VS Code', type: 'app', icon: 'fas fa-code', color: 'text-blue-400', action: 'vscode' },
        { id: 'chrome', name: 'Chrome', type: 'app', icon: 'fab fa-chrome', color: 'text-yellow-400', action: 'browser' },
        { id: 'trash', name: 'Trash', type: 'system', icon: 'fas fa-trash', color: 'text-gray-500', action: 'trash' }
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
          data: { url: profile.resume.url || '#' }
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
    // 3. Trash View (Creative)
    else if (currentLocation.value === 'trash') {
      items = [
        {
          id: 'jquery',
          name: 'jquery_v1.0.js',
          type: 'file',
          icon: 'fab fa-js',
          color: 'text-yellow-600',
          data: { title: 'Legacy Code', fullDescription: 'An ancient artifact from a simpler time.', technologies: ['jQuery'] }
        },
        {
          id: 'todo',
          name: 'todo_list_2018.txt',
          type: 'file',
          icon: 'fas fa-file-alt',
          color: 'text-gray-500',
          data: { title: 'Old TODOs', fullDescription: '1. Learn React\n2. Fix CSS centering\n3. Buy Bitcoin (missed it)', technologies: [] }
        },
        {
          id: 'final',
          name: 'project_final_final_v2.zip',
          type: 'file',
          icon: 'fas fa-file-archive',
          color: 'text-orange-400',
          data: { title: 'The "Final" Project', fullDescription: 'It was never actually final.', technologies: [] }
        },
        {
          id: 'ie6',
          name: 'ie6_fixes.css',
          type: 'file',
          icon: 'fab fa-css3',
          color: 'text-blue-300',
          data: { title: 'IE6 Nightmares', fullDescription: '*zoom: 1; display: inline; /* I am sorry */', technologies: ['CSS Hacks'] }
        }
      ]
    }
    // 4. Macintosh HD View
    else if (currentLocation.value === 'macintosh') {
      if (currentPath.value.length === 0) {
        items = [
          { id: 'apps', name: 'Applications', type: 'folder', icon: 'fas fa-layer-group', color: 'text-blue-400', data: {} },
          { id: 'system', name: 'System', type: 'folder', icon: 'fas fa-cogs', color: 'text-gray-400', data: {} },
          { id: 'users', name: 'Users', type: 'folder', icon: 'fas fa-users', color: 'text-green-400', data: {} },
          { id: 'library', name: 'Library', type: 'folder', icon: 'fas fa-book', color: 'text-purple-400', data: {} }
        ]
      } else if (currentPath.value.length === 1) {
        const folder = currentPath.value[0]
        if (folder === 'Applications') {
          items = [
            { id: 'term', name: 'Terminal', type: 'app', icon: 'fas fa-terminal', color: 'text-gray-300', action: 'terminal' },
            { id: 'code', name: 'VS Code', type: 'app', icon: 'fas fa-code', color: 'text-blue-400', action: 'vscode' },
            { id: 'chrome', name: 'Chrome', type: 'app', icon: 'fab fa-chrome', color: 'text-yellow-400', action: 'browser' },
            { id: 'photos', name: 'Photos', type: 'app', icon: 'fas fa-image', color: 'text-purple-400', action: 'image-viewer' }
          ]
        } else if (folder === 'System') {
          items = [
             { id: 'kernel', name: 'kernel_task', type: 'file', icon: 'fas fa-microchip', color: 'text-red-400', data: { title: 'Kernel', fullDescription: 'Do not touch.', technologies: [] } },
             { id: 'drivers', name: 'Drivers', type: 'folder', icon: 'fas fa-hdd', color: 'text-gray-400', data: {} }
          ]
        } else if (folder === 'Users') {
          items = [
             { id: 'guest', name: 'Guest', type: 'folder', icon: 'fas fa-user', color: 'text-gray-300', data: {} },
             { id: 'admin', name: 'Carlos Veizaga', type: 'folder', icon: 'fas fa-user-astronaut', color: 'text-blue-400', data: {} }
          ]
        }
      } else {
        items = []
      }
    }
    // 5. iCloud Drive View
    else if (currentLocation.value === 'icloud') {
      if (currentPath.value.length === 0) {
        items = [
          { id: 'docs', name: 'Documents', type: 'folder', icon: 'fas fa-folder', color: 'text-blue-300', data: {} },
          { id: 'photos', name: 'Photos', type: 'folder', icon: 'fas fa-images', color: 'text-purple-300', data: {} },
          { id: 'backup', name: 'Backup_2024.zip', type: 'file', icon: 'fas fa-file-archive', color: 'text-gray-400', data: { title: 'Full Backup', fullDescription: 'Encrypted backup of all projects.', technologies: [] } }
        ]
      } else if (currentPath.value.length === 1) {
         const folder = currentPath.value[0]
         if (folder === 'Documents') {
           items = [
              {
                id: 'resume',
                name: 'Resume.pdf',
                type: 'link',
                icon: 'fas fa-file-pdf',
                color: 'text-red-400',
                data: { url: profile.resume.url || '#' }
              },
              { id: 'notes', name: 'Notes.txt', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400', data: { title: 'Notes', fullDescription: 'Ideas for next project...', technologies: [] } }
           ]
         } else if (folder === 'Photos') {
            items = projects.flatMap(p => p.gallery || []).slice(0, 4).map((img, i) => ({
              id: `cloud-img-${i}`,
              name: img.caption || `Photo ${i + 1}`,
              type: 'image',
              icon: 'fas fa-image',
              color: 'text-purple-300',
              data: img
            }))
         }
      } else {
        items = []
      }
    }
    // 6. Projects (Root, Important, Work)
    else {
      let filteredProjects = projects

      if (currentLocation.value === 'important') {
        filteredProjects = projects.filter(p => p.featured)
      }
      else if (currentLocation.value === 'work') {
         // No filter, show all
      }

      if (currentPath.value.length === 0) {
        items = filteredProjects.map((p) => ({
          id: p.id,
          name: p.title,
          type: 'folder',
          icon: 'fas fa-folder',
          color: 'text-blue-400',
          data: p
        }))
      } else {
        const projectName = currentPath.value[0]
        const project = projects.find((p) => p.title === projectName)

        if (!project) return []

        if (currentPath.value.length === 1) {
          items.push({
            id: 'readme',
            name: 'README.md',
            type: 'file',
            icon: 'fas fa-file-alt',
            color: 'text-gray-400',
            data: project
          })

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

    return items
  }

  const currentItems = computed(() => {
    const items = getItems()
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      return items.filter((item) => item.name.toLowerCase().includes(query))
    }
    return items
  })

  const currentPathString = computed(() => {
    let base = '~/'
    if (currentLocation.value === 'desktop') base += 'Desktop'
    else if (currentLocation.value === 'downloads') base += 'Downloads'
    else if (currentLocation.value === 'trash') base += 'Trash'
    else if (currentLocation.value === 'macintosh') base += 'Macintosh HD'
    else if (currentLocation.value === 'icloud') base += 'iCloud Drive'
    else if (currentLocation.value === 'root') base += 'projects'
    else if (currentLocation.value === 'important') base += 'projects/Important'
    else if (currentLocation.value === 'work') base += 'projects/Work'

    return base + (currentPath.value.length ? '/' + currentPath.value.join('/') : '')
  })

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

  const navigateInto = (folderName) => {
    currentPath.value.push(folderName)
  }

  return {
    currentPath,
    currentLocation,
    searchQuery,
    currentItems,
    currentPathString,
    goToLocation,
    goBack,
    goHome,
    navigateInto
  }
}
