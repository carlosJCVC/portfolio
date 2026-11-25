import { loadEnv } from 'vite'

export const aiDevApi = () => ({
  name: 'ai-dev-api',
  apply: 'serve',
  configureServer(server) {
    const env = loadEnv(server.config.mode, process.cwd(), '')
    for (const key of Object.keys(env)) {
      if (['ANTHROPIC_', 'GROQ_', 'AI_'].some((prefix) => key.startsWith(prefix)) && process.env[key] === undefined) {
        process.env[key] = env[key]
      }
    }

    server.middlewares.use('/api/chat', async (req, res) => {
      const { default: chatHandler } = await import('../ai/chatHandler.js')
      await chatHandler(req, res)
    })
  }
})
