import * as general from './general'
import * as info from './info'
import * as system from './system'
import * as filesystem from './filesystem'
import * as utils from './utils'
import * as theme from './theme'
import * as fun from './fun'

export const registry = {
  ...general,
  ...info,
  ...system,
  ...filesystem,
  ...utils,
  ...theme,
  ...theme,
  ...fun,
  '?': general.question
}

export const executeCommand = async (cmdName, args, context) => {
  const command = registry[cmdName]
  if (command) {
    return await command.execute(args, context)
  }
  return `Command not found: ${cmdName}`
}
