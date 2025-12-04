export const help = {
  name: 'help',
  description: 'List available commands',
  execute: (args, { registry }) => {
    const commands = Object.values(registry).map(cmd => 
      `${cmd.name.padEnd(12)} - ${cmd.description}`
    ).join('\n')
    return `Available commands:\n${commands}`
  }
}

export const clear = {
  name: 'clear',
  description: 'Clear terminal',
  execute: (args, { clearHistory }) => {
    clearHistory()
    return null
  }
}
