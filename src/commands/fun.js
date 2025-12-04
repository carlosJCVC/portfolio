export const matrix = {
  name: 'matrix',
  description: 'Toggle matrix effect',
  execute: (args, { toggleMatrix }) => {
    toggleMatrix()
    return 'Wake up, Neo...'
  }
}
