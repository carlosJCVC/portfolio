import * as general from './general'
import * as info from './info'
import * as system from './system'
import * as filesystem from './filesystem'

export const registry = {
  ...general,
  ...info,
  ...system,
  ...filesystem
}

export const executeCommand = async (cmdName, args, context) => {
  const command = registry[cmdName]
  if (command) {
    return await command.execute(args, context)
  }
  return `Command not found: ${cmdName}`
}
