let sequence = 0
const nextId = () => `m${Date.now().toString(36)}${(sequence++).toString(36)}`

export const createUserMessage = (text, { kind = 'text', prompt = text } = {}) => ({
  id: nextId(),
  role: 'user',
  kind,
  text,
  prompt,
  status: 'done'
})

export const createAssistantMessage = () => ({
  id: nextId(),
  role: 'assistant',
  parts: [],
  status: 'streaming',
  error: null,
  suggestions: []
})

export const createToolPart = ({ id, name, input = null }) => ({
  type: 'tool',
  id,
  name,
  input,
  status: 'running',
  view: null,
  error: null,
  durationMs: null
})

export const toolNamesOf = (message) =>
  (message?.parts ?? []).filter((part) => part.type === 'tool' && part.status === 'done').map((part) => part.name)
