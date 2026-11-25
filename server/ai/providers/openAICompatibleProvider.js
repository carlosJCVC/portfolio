import { toolDefinitions } from '../../../shared/ai/toolDefinitions.js'
import { SYSTEM_PROMPT } from '../systemPrompt.js'
import { AgentError, AgentErrors } from '../agentError.js'
import { toAnthropicContent, toOpenAIMessages, toOpenAITools, toStopReason, trimHistory } from './messageAdapter.js'

const errorForStatus = (status, cause) => {
  if (status === 401 || status === 403) return AgentErrors.notConfigured(cause)
  if (status === 429) return AgentErrors.quotaExhausted(cause)
  if (status === 400 || status === 413 || status === 422) return AgentErrors.badRequest(cause)
  return AgentErrors.upstream(cause)
}

async function* readChunks(body) {
  const decoder = new TextDecoder()
  let buffer = ''
  for await (const bytes of body) {
    buffer += decoder.decode(bytes, { stream: true })
    let newline
    while ((newline = buffer.indexOf('\n')) !== -1) {
      const line = buffer.slice(0, newline).trim()
      buffer = buffer.slice(newline + 1)
      if (!line.startsWith('data:')) continue
      const data = line.slice(5).trim()
      if (data === '[DONE]') return
      const chunk = JSON.parse(data)
      if (chunk.error) throw AgentErrors.upstream(new Error(`Stream error: ${JSON.stringify(chunk.error).slice(0, 300)}`))
      yield chunk
    }
  }
}

export const createOpenAICompatibleProvider = ({ config, maxTokens, fetchImpl = fetch }) => {
  if (!config.apiKey) throw AgentErrors.notConfigured()
  const tools = toOpenAITools(toolDefinitions)

  const requestBody = (model, messages) => ({
    model,
    messages: toOpenAIMessages(SYSTEM_PROMPT, trimHistory(messages, config.maxHistoryTurns)),
    tools,
    tool_choice: 'auto',
    max_completion_tokens: maxTokens,
    stream: true,
    ...(config.reasoningEffort && model.startsWith('openai/gpt-oss') && { reasoning_effort: config.reasoningEffort })
  })

  const openStream = async (messages, signal) => {
    let lastError = null
    for (const model of config.models) {
      const response = await fetchImpl(`${config.baseUrl}/chat/completions`, {
        method: 'POST',
        signal,
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${config.apiKey}` },
        body: JSON.stringify(requestBody(model, messages))
      })
      if (response.ok) return response

      const detail = await response.text().catch(() => '')
      lastError = errorForStatus(response.status, new Error(`${model} HTTP ${response.status}: ${detail.slice(0, 300)}`))
      if (response.status !== 429) break
    }
    throw lastError
  }

  return {
    label: config.label,

    async streamTurn({ messages, emit, signal }) {
      try {
        const response = await openStream(messages, signal)

        let text = ''
        let finishReason = null
        const calls = []

        for await (const chunk of readChunks(response.body)) {
          const choice = chunk.choices?.[0]
          if (!choice) continue
          const delta = choice.delta ?? {}

          if (delta.content) {
            text += delta.content
            emit('text', { delta: delta.content })
          }

          for (const part of delta.tool_calls ?? []) {
            const call = (calls[part.index ?? calls.length] ??= { id: '', name: '', arguments: '', announced: false })
            if (part.id) call.id = part.id
            if (part.function?.name) call.name += part.function.name
            if (part.function?.arguments) call.arguments += part.function.arguments
            if (!call.announced && call.id && call.name) {
              call.announced = true
              emit('tool_start', { id: call.id, name: call.name })
            }
          }

          if (choice.finish_reason) finishReason = choice.finish_reason
        }

        const toolCalls = calls.filter(Boolean).map((call, i) => ({ ...call, id: call.id || `call_${Date.now()}_${i}` }))
        emit('done', {
          stopReason: toStopReason(finishReason, toolCalls.length > 0),
          content: toAnthropicContent(text, toolCalls)
        })
      } catch (error) {
        if (signal?.aborted) return
        if (error instanceof AgentError) throw error
        throw AgentErrors.upstream(error)
      }
    }
  }
}
