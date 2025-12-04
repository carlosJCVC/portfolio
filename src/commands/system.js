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
