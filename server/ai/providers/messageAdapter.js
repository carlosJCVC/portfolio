
export const toOpenAITools = (toolDefinitions) =>
  toolDefinitions.map(({ name, description, input_schema }) => ({
    type: 'function',
    function: { name, description, parameters: input_schema }
  }))

const blocksOf = (content) => (typeof content === 'string' ? [{ type: 'text', text: content }] : content)

const textOf = (blocks) =>
  blocks
    .filter((block) => block.type === 'text')
    .map((block) => block.text)
    .join('\n')

const toolResultText = (block) => {
  const text = typeof block.content === 'string' ? block.content : textOf(block.content ?? [])
  return block.is_error ? `ERROR: ${text}` : text
}

const fromUser = (blocks) => {
  const out = []
  for (const block of blocks.filter((b) => b.type === 'tool_result')) {
    out.push({ role: 'tool', tool_call_id: block.tool_use_id, content: toolResultText(block) })
  }
  const text = textOf(blocks)
  if (text) out.push({ role: 'user', content: text })
  return out
}

const fromAssistant = (blocks) => {
  const toolCalls = blocks
    .filter((block) => block.type === 'tool_use')
    .map((block) => ({
      id: block.id,
      type: 'function',
      function: { name: block.name, arguments: JSON.stringify(block.input ?? {}) }
    }))
  return [
    {
      role: 'assistant',
      content: textOf(blocks) || (toolCalls.length ? null : ''),
      ...(toolCalls.length && { tool_calls: toolCalls })
    }
  ]
}

export const toOpenAIMessages = (systemPrompt, messages) => [
  { role: 'system', content: systemPrompt },
  ...messages.flatMap(({ role, content }) =>
    role === 'user' ? fromUser(blocksOf(content)) : fromAssistant(blocksOf(content))
  )
]

const STOP_REASONS = { tool_calls: 'tool_use', stop: 'end_turn', length: 'max_tokens', content_filter: 'refusal' }

export const toStopReason = (finishReason, hasToolCalls) =>
  STOP_REASONS[finishReason] ?? (hasToolCalls ? 'tool_use' : 'end_turn')

const parseArguments = (raw) => {
  try {
    const parsed = JSON.parse(raw || '{}')
    return parsed && typeof parsed === 'object' && !Array.isArray(parsed) ? parsed : {}
  } catch {
    return { __invalid_json: String(raw).slice(0, 500) }
  }
}

export const toAnthropicContent = (text, toolCalls) => [
  ...(text ? [{ type: 'text', text }] : []),
  ...toolCalls.map((call) => ({
    type: 'tool_use',
    id: call.id,
    name: call.name,
    input: parseArguments(call.arguments)
  }))
]
