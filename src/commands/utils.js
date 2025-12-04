import { profile } from '@/data/profile'

export const whoami = {
  name: 'whoami',
  description: 'Show current user',
  execute: () => {
    return `User: <span class="text-green-400">guest</span>\nProfile: <span class="text-blue-400">${profile.name}</span>`
  }
}

export const date = {
  name: 'date',
  description: 'Show system date',
  execute: () => {
    return new Date().toString()
  }
}

export const history = {
  name: 'history',
  description: 'Show command history',
  execute: (args, { history }) => {
    return history.map((entry, i) => `${i + 1}  ${entry.command}`).join('\n')
  }
}

export const echo = {
  name: 'echo',
  description: 'Print arguments',
  execute: (args) => {
    return args.join(' ')
  }
}
