export const shutdown = {
  name: 'shutdown',
  description: 'Power off system',
  execute: (args, { store }) => {
    setTimeout(() => {
      store.initiateShutdown()
    }, 800)
    return 'Initiating system shutdown...'
  }
}

export const sudo = {
  name: 'sudo',
  description: 'Run as superuser',
  execute: () => {
    return 'Permission denied: You are not in the sudoers file. This incident will be reported to Santa Claus.'
  }
}

import { apps } from '@/data/apps'

export const open = {
  name: 'open',
  description: 'Open an application',
  execute: (args, { store }) => {
    const appName = args[0]?.toLowerCase()
    if (!appName) return 'Usage: open [app_name] (e.g., open vscode)'

    const app = apps.find(a => a.id === appName || a.title.toLowerCase() === appName.toLowerCase())
    if (app) {
      store.openWindow(app.id, app.title, app.component, app.props)
      return `Opening ${app.title}...`
    }
    return `App not found: ${appName}. Try: ${apps.map(a => a.id).join(', ')}`
  }
}
