<template>
  <div
    class="h-full bg-black text-green-400 font-mono p-4 text-sm overflow-auto"
    @click="focusInput"
  >
    <div v-for="(line, i) in history" :key="i" class="mb-1">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white">{{
        line.path || '~'
      }}</span
      >$ {{ line.cmd }}
      <div
        v-if="line.output"
        class="text-gray-300 whitespace-pre-wrap mt-1"
        v-html="line.output"
      ></div>
    </div>

    <div class="flex items-center">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white">{{
        currentPathString
      }}</span
      >$&nbsp;
      <input
        ref="inputRef"
        v-model="currentCmd"
        @keydown.enter="execute"
        type="text"
        class="bg-transparent border-none outline-none text-green-400 flex-grow"
        autofocus
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from 'vue'
import { useOSStore } from '@/store/useOSStore'
import { projects } from '@/data/projects'

const history = ref([
  {
    cmd: 'welcome',
    output: 'Welcome to Carlos DevOS v1.0.0\nType "help" to see available commands.'
  }
])
const store = useOSStore()
const currentCmd = ref('')
const inputRef = ref(null)
const currentPath = ref([]) // [] = ~, ['projects'] = ~/projects

const currentPathString = computed(() => {
  if (currentPath.value.length === 0) return '~'
  return '~/' + currentPath.value.join('/')
})

const fileSystem = computed(() => {
  const projectNodes = projects.reduce((acc, p) => {
    // Create virtual files for the project
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
      content: `Carlos Veizaga - Senior Full-Stack Architect\n\n10+ years of experience specializing in enterprise-grade platforms (BTP), cross-platform mobile apps (React Native), and high-performance web systems.\n\nMy expertise lies in architecting scalable solutions that solve complex business challenges.`
    },
    'skills.txt': {
      type: 'file',
      content: `SKILLS & EXPERTISE\n\n[Backend & Architecture]\nLaravel, Node.js, Python, MySQL, PostgreSQL, AWS, Docker, Redis\n\n[Frontend & UI]\nVue.js, React, Angular, Tailwind CSS, Bootstrap, Sass\n\n[Mobile]\nReact Native, Flutter, Expo, Android, iOS\n\n[DevOps]\nGit, n8n, Linux, CI/CD`
    },
    'contact.txt': {
      type: 'file',
      content:
        'Email: carlos.veizaga.c@gmail.com\nLocation: Cochabamba, Bolivia\nOpen to Remote Work: Yes'
    }
  }
})

// Helper to get current directory object
const getCurrentDir = () => {
  let current = fileSystem.value
  for (const segment of currentPath.value) {
    if (current[segment] && current[segment].type === 'dir') {
      current = current[segment].children
    } else {
      return null // Should not happen if path is valid
    }
  }
  return current
}

const execute = async () => {
  const rawCmd = currentCmd.value.trim()
  if (!rawCmd) return

  const parts = rawCmd.split(' ')
  const cmd = parts[0].toLowerCase()
  const args = parts.slice(1)

  let output = ''

  switch (cmd) {
    case 'help':
      output = `Available commands:
        ls           - List directory contents
        cd &lt;dir&gt;     - Change directory
        cat &lt;file&gt;   - Read file content
        clear        - Clear terminal
        sudo         - Run as superuser
        about        - Quick summary
        contact      - Get in touch
        shutdown     - Power off system`
      break

    case 'clear':
      history.value = []
      currentCmd.value = ''
      return

    case 'ls': {
      const dir = getCurrentDir()
      if (dir) {
        const items = Object.keys(dir).map((name) => {
          const isDir = dir[name].type === 'dir'
          return isDir ? `<span class="text-blue-400 font-bold">${name}/</span>` : name
        })
        output = items.join('  ')
      } else {
        output = 'Error: Current directory not found.'
      }
      break
    }

    case 'cd':
      if (!args[0] || args[0] === '~') {
        currentPath.value = []
      } else if (args[0] === '..') {
        if (currentPath.value.length > 0) {
          currentPath.value.pop()
        }
      } else {
        const target = args[0].replace(/\/$/, '') // remove trailing slash
        const currentDir = getCurrentDir()
        if (currentDir[target] && currentDir[target].type === 'dir') {
          currentPath.value.push(target)
        } else {
          output = `cd: ${target}: No such directory`
        }
      }
      break

    case 'cat':
      if (!args[0]) {
        output = 'usage: cat <filename>'
      } else {
        const currentDir = getCurrentDir()
        const file = currentDir[args[0]]
        if (file && file.type === 'file') {
          if (file.content) {
            output = file.content
          } else if (file.data && file.data.name === 'README.md') {
            output = `# ${file.project.title}\n\n${file.project.fullDescription}\n\nTech: ${file.project.technologies.join(', ')}`
          } else {
            output = '[Binary or Link File] Cannot read content.'
          }
        } else {
          output = `cat: ${args[0]}: No such file`
        }
      }
      break

    case 'sudo':
      output =
        'Permission denied: You are not in the sudoers file. This incident will be reported to Santa Claus.'
      break

    case 'about':
      output = fileSystem.value['about.txt'].content
      break

    case 'contact':
      output = fileSystem.value['contact.txt'].content
      break

    case 'shutdown':
      output = 'Initiating system shutdown...'
      setTimeout(() => {
        store.initiateShutdown()
      }, 800)
      break

    default:
      output = `Command not found: ${cmd}`
  }

  history.value.push({
    cmd: rawCmd,
    output: output,
    path: currentPathString.value
  })
  currentCmd.value = ''

  await nextTick()
  if (inputRef.value) inputRef.value.scrollIntoView()
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  focusInput()
})
</script>
