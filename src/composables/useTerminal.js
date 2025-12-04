import { ref, computed } from 'vue'
import { useOSStore } from '@/store/useOSStore'
import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { registry, executeCommand } from '@/commands/registry'
import { WELCOME_BANNER } from '@/utils/banners'

export function useTerminal() {
  const store = useOSStore()
  const history = ref([
    {
      cmd: 'welcome',
      output: WELCOME_BANNER + '\nType "?" or "help" to see available commands.'
    }
  ])
  const currentCmd = ref('')
  const currentPath = ref([]) // [] = ~, ['projects'] = ~/projects

  const currentPathString = computed(() => {
    if (currentPath.value.length === 0) return '~'
    return '~/' + currentPath.value.join('/')
  })

  // Virtual File System Construction
  const fileSystem = computed(() => {
    const projectNodes = projects.reduce((acc, p) => {
      const children = {
        'README.md': {
          type: 'file',
          content: `# ${p.title}\n\n${p.fullDescription}\n\nTech Stack: ${p.technologies.join(', ')}`
        }
      }

      if (p.displayGithubUrl && p.githubUrl) {
        children['source.url'] = { type: 'link', url: p.githubUrl }
      }

      if (p.displayLiveUrl && p.liveUrl) {
        children['demo.url'] = { type: 'link', url: p.liveUrl }
      }

      acc[p.title.replace(/\s+/g, '-').toLowerCase()] = {
        type: 'dir',
        children: children
      }
      return acc
    }, {})

    return {
      projects: {
        type: 'dir',
        children: projectNodes
      },
      'about.txt': {
        type: 'file',
        content: profile.about
      },
      'skills.txt': {
        type: 'file',
        content: `SKILLS & EXPERTISE\n\n${Object.values(profile.skills)
          .map((cat) => `[${cat.title}]\n${cat.items.join(', ')}`)
          .join('\n\n')}`
      },
      'contact.txt': {
        type: 'file',
        content:
          `Email: ${profile.email}\nLocation: ${profile.location}\nOpen to Remote Work: ${profile.openToWork ? 'Yes' : 'No'}`
      }
    }
  })

  const theme = ref('default')
  const showMatrix = ref(false)

  const clearHistory = () => {
    history.value = []
  }

  const setTheme = (newTheme) => {
    theme.value = newTheme
  }

  const toggleMatrix = () => {
    showMatrix.value = !showMatrix.value
  }

  const execute = async () => {
    const rawCmd = currentCmd.value.trim()
    
    if (!rawCmd) {
      history.value.push({
        cmd: '',
        path: currentPathString.value
      })
      currentCmd.value = ''
      return
    }

    const parts = rawCmd.split(' ')
    const cmdName = parts[0].toLowerCase()
    const args = parts.slice(1)

    // Context passed to commands
    const context = {
      store,
      fileSystem: fileSystem.value,
      currentPath,
      registry,
      clearHistory,
      setTheme,
      toggleMatrix,
      history: history.value
    }

    const output = await executeCommand(cmdName, args, context)

    // Only add to history if output is not null (null means command handled history clearing or other special cases)
    // Actually, we always want to show the command entered, unless it was 'clear' which clears everything.
    // If 'clear' was run, history is empty, so pushing this command would add it back.
    // The 'clear' command returns null, so we can check that.
    
    if (cmdName !== 'clear') {
       history.value.push({
        cmd: rawCmd,
        output: output,
        path: currentPathString.value
      })
    }

    currentCmd.value = ''
  }

  return {
    history,
    currentCmd,
    currentPath,
    currentPathString,
    execute,
    theme,
    showMatrix
  }
}
