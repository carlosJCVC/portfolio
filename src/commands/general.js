export const help = {
  name: 'help',
  description: 'List available commands',
  execute: (args, { registry }) => {
    const categories = {
      'System': ['shutdown', 'sudo', 'open', 'help', 'clear'],
      'Filesystem': ['ls', 'cd', 'cat'],
      'Utils': ['whoami', 'date', 'history', 'echo'],
      'Fun': ['theme', 'matrix']
    }

    let output = '<span class="text-blue-400 font-bold">Available Commands:</span>\n'

    for (const [category, cmds] of Object.entries(categories)) {
      output += `\n<span class="text-amber-400 font-bold">[${category}]</span>\n`
      cmds.forEach(cmdName => {
        const cmd = registry[cmdName]
        if (cmd && cmd.name && cmd.description) {
          output += `  <span class="text-green-400">${cmd.name.padEnd(12)}</span> <span class="text-gray-400">${cmd.description}</span>\n`
        }
      })
    }
    
    return output
  }
}

export const question = {
  name: '?',
  description: 'Alias for help',
  execute: help.execute
}

export const clear = {
  name: 'clear',
  description: 'Clear terminal',
  execute: (args, { clearHistory }) => {
    clearHistory()
    return null
  }
}
