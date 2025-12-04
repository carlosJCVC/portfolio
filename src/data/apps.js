import TerminalApp from '@/components/os/apps/TerminalApp.vue'
import ExplorerApp from '@/components/os/apps/ExplorerApp.vue'
import MessengerApp from '@/components/os/apps/MessengerApp.vue'
import SettingsApp from '@/components/os/apps/SettingsApp.vue'
import BrowserApp from '@/components/os/apps/BrowserApp.vue'
import CodeEditorApp from '@/components/os/apps/CodeEditorApp.vue'
import ImageViewerApp from '@/components/os/apps/ImageViewerApp.vue'

export const apps = [
  { id: 'terminal', title: 'Terminal', icon: 'fas fa-terminal', component: TerminalApp },
  { id: 'projects', title: 'Projects', icon: 'fas fa-folder-open', component: ExplorerApp },
  { id: 'skills', title: 'Skills', icon: 'fas fa-layer-group', component: TerminalApp, props: { initialCommand: 'skills' } },
  { id: 'vscode', title: 'VS Code', icon: 'fas fa-code', component: CodeEditorApp },
  { id: 'contact', title: 'Contact', icon: 'fas fa-envelope', component: MessengerApp },
  { id: 'settings', title: 'Settings', icon: 'fas fa-cog', component: SettingsApp },
  { id: 'browser', title: 'Chrome', icon: 'fab fa-chrome', component: BrowserApp },
  { id: 'image-viewer', title: 'Photos', icon: 'fas fa-image', component: ImageViewerApp }
]

export const getAppById = (id) => apps.find(app => app.id === id)
