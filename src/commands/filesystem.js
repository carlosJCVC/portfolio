

const getCurrentDir = (fileSystem, path) => {
  let current = fileSystem
  for (const segment of path) {
    if (current[segment] && current[segment].type === 'dir') {
      current = current[segment].children
    } else {
      return null
    }
  }
  return current
}

export const ls = {
  name: 'ls',
  description: 'List directory contents',
  execute: (args, { fileSystem, currentPath }) => {
    const dir = getCurrentDir(fileSystem, currentPath.value)
    if (dir) {
      const items = Object.keys(dir).map((name) => {
        const isDir = dir[name].type === 'dir'
        return isDir ? `<span class="text-blue-400 font-bold">${name}/</span>` : name
      })
      return items.join('  ')
    } else {
      return 'Error: Current directory not found.'
    }
  }
}

export const cd = {
  name: 'cd',
  description: 'Change directory',
  execute: (args, { fileSystem, currentPath }) => {
    const target = args[0]
    
    if (!target || target === '~') {
      currentPath.value = []
      return null
    }
    
    if (target === '..') {
      if (currentPath.value.length > 0) {
        currentPath.value.pop()
      }
      return null
    }
    
    // Check if target exists in current dir
    const currentDir = getCurrentDir(fileSystem, currentPath.value)
    // Handle simple relative path "folder"
    // For complex paths "folder/subfolder", we'd need better resolution, but keeping it simple as per original
    const cleanTarget = target.replace(/\/$/, '')
    
    if (currentDir[cleanTarget] && currentDir[cleanTarget].type === 'dir') {
      currentPath.value.push(cleanTarget)
      return null
    } else {
      return `cd: ${target}: No such directory`
    }
  }
}

export const cat = {
  name: 'cat',
  description: 'Read file content',
  execute: (args, { fileSystem, currentPath }) => {
    if (!args[0]) return 'usage: cat <filename>'
    
    const currentDir = getCurrentDir(fileSystem, currentPath.value)
    const file = currentDir[args[0]]
    
    if (file && file.type === 'file') {
      if (file.content) {
        return file.content
      } else if (file.data && file.data.name === 'README.md') {
        // Fallback for project READMEs if structure is different, but virtual FS should handle this
        return 'File content not available.'
      } else {
        return '[Binary or Link File] Cannot read content.'
      }
    } else {
      return `cat: ${args[0]}: No such file`
    }
  }
}
