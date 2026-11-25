export class AgentLoopError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'AgentLoopError'
    this.code = code
  }
}

const throwIfAborted = (signal) => {
  if (signal?.aborted) throw new DOMException('Aborted', 'AbortError')
}

export const runAgentTurn = async ({ provider, registry, transcript, signal, hooks = {}, maxSteps = 6 }) => {
  for (let step = 0; step < maxSteps; step++) {
    hooks.onStepStart?.(step)

    let completion = null
    for await (const event of provider.stream({ messages: transcript, signal })) {
      if (event.type === 'meta') hooks.onMeta?.(event)
      else if (event.type === 'text') hooks.onText?.(event.delta)
      else if (event.type === 'tool_start') hooks.onToolStart?.(event)
      else if (event.type === 'done') completion = event
    }
    throwIfAborted(signal)
    if (!completion) throw new AgentLoopError('incomplete', 'The response ended unexpectedly.')

    transcript.push({ role: 'assistant', content: completion.content })
    hooks.onStepComplete?.(completion)

    if (completion.stopReason === 'refusal') {
      hooks.onRefusal?.()
      return
    }

    const toolCalls = completion.content.filter((block) => block.type === 'tool_use')
    if (completion.stopReason !== 'tool_use' || toolCalls.length === 0) return

    const toolResults = await Promise.all(
      toolCalls.map(async (call) => {
        hooks.onToolCall?.(call)
        const startedAt = performance.now()
        const outcome = await registry.execute(call)
        hooks.onToolResult?.({ id: call.id, ...outcome, durationMs: Math.round(performance.now() - startedAt) })
        return outcome.toolResult
      })
    )
    throwIfAborted(signal)

    transcript.push({ role: 'user', content: toolResults })
  }

  throw new AgentLoopError('step_limit', 'The agent needed too many steps for this request.')
}

export const consistentLength = (transcript, baseLength) => {
  for (let i = transcript.length; i > baseLength; i--) {
    const last = transcript[i - 1]
    const pendingTools = Array.isArray(last.content) && last.content.some((b) => b.type === 'tool_use')
    if (last.role === 'assistant' && !pendingTools) return i
  }
  return baseLength
}
