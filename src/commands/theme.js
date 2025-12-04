export const theme = {
  name: 'theme',
  description: 'Change terminal theme',
  execute: (args, { setTheme }) => {
    const themeName = args[0]
    if (!themeName) return 'Usage: theme [default|retro|cyber|matrix]'

    const themes = ['default', 'retro', 'cyber', 'matrix']
    if (themes.includes(themeName)) {
      setTheme(themeName)
      return `Theme changed to <span class="text-green-400">${themeName}</span>`
    } else {
      return `Unknown theme. Available: ${themes.join(', ')}`
    }
  }
}
