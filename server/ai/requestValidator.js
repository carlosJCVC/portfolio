const ROLES = new Set(['user', 'assistant'])

const ALLOWED_BLOCKS = {
  user: new Set(['text', 'tool_result']),
  assistant: new Set(['text', 'tool_use', 'thinking', 'redacted_thinking', 'fallback'])
}

export class ValidationError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ValidationError'
  }
}

const assert = (condition, message) => {
  if (!condition) throw new ValidationError(message)
}

const textLength = (block) => {
  if (block.type === 'text') return block.text?.length ?? 0
  if (block.type === 'tool_result') {
    return typeof block.content === 'string' ? block.content.length : JSON.stringify(block.content ?? '').length
  }
  return 0
}

const validateBlocks = (role, blocks, limits) => {
  assert(blocks.length > 0, 'Message content cannot be empty.')
  for (const block of blocks) {
    assert(block && typeof block === 'object', 'Invalid content block.')
    assert(ALLOWED_BLOCKS[role].has(block.type), `Block type "${block.type}" is not allowed for ${role}.`)
    if (role === 'user') {
      assert(textLength(block) <= limits.maxTextLength, 'Message is too long.')
    }
  }
}

const validateMessage = (message, limits) => {
  assert(message && typeof message === 'object', 'Invalid message.')
  assert(ROLES.has(message.role), 'Invalid message role.')

  if (typeof message.content === 'string') {
    assert(message.content.trim().length > 0, 'Message content cannot be empty.')
    assert(message.content.length <= limits.maxTextLength, 'Message is too long.')
    return
  }

  assert(Array.isArray(message.content), 'Invalid message content.')
  validateBlocks(message.role, message.content, limits)
}

export const validateChatRequest = (body, limits) => {
  assert(body && typeof body === 'object', 'Request body must be a JSON object.')
  const { messages } = body

  assert(Array.isArray(messages) && messages.length > 0, '`messages` must be a non-empty array.')
  assert(messages.length <= limits.maxMessages, 'Conversation is too long. Please start a new chat.')
  assert(JSON.stringify(messages).length <= limits.maxPayloadChars, 'Conversation is too large. Please start a new chat.')
  assert(messages[0].role === 'user', 'Conversation must start with a user message.')
  assert(messages.at(-1).role === 'user', 'Conversation must end with a user message.')

  messages.forEach((message) => validateMessage(message, limits))

  return { messages }
}
