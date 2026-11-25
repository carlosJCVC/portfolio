const VERSION = 1

export const createConversationStore = ({ key = 'ai-agent:conversation', storage = window.sessionStorage } = {}) => ({
  load() {
    try {
      const saved = JSON.parse(storage?.getItem(key) ?? 'null')
      if (saved?.version !== VERSION) return null
      return { transcript: saved.transcript, messages: saved.messages, engine: saved.engine, modelLabel: saved.modelLabel }
    } catch {
      return null
    }
  },

  save({ transcript, messages, engine, modelLabel }) {
    try {
      storage?.setItem(key, JSON.stringify({ version: VERSION, transcript, messages, engine, modelLabel }))
      return true
    } catch {
      return false
    }
  },

  clear() {
    storage?.removeItem(key)
  }
})
