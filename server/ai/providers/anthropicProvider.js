import Anthropic from '@anthropic-ai/sdk'
import { toolDefinitions } from '../../../shared/ai/toolDefinitions.js'
import { SYSTEM_PROMPT } from '../systemPrompt.js'
import { AgentError, AgentErrors } from '../agentError.js'

const toAgentError = (error) => {
  if (error instanceof AgentError) return error
  if (error instanceof Anthropic.AuthenticationError || error instanceof Anthropic.PermissionDeniedError) {
    return AgentErrors.notConfigured(error)
  }
  if (error instanceof Anthropic.RateLimitError) return AgentErrors.quotaExhausted(error)
  if (error instanceof Anthropic.BadRequestError) return AgentErrors.badRequest(error)
  if (error instanceof Anthropic.APIError || error instanceof Anthropic.APIConnectionError) {
    return AgentErrors.upstream(error)
  }
  return AgentErrors.internal(error)
}

export const createAnthropicProvider = ({ config, maxTokens, client = new Anthropic() }) => ({
  label: config.label,

  async streamTurn({ messages, emit, signal }) {
    try {
      const stream = client.beta.messages.stream(
        {
          model: config.model,
          max_tokens: maxTokens,
          system: SYSTEM_PROMPT,
          tools: toolDefinitions,
          messages,
          output_config: { effort: config.effort },
          cache_control: { type: 'ephemeral' },
          betas: ['server-side-fallback-2026-07-01'],
          fallbacks: 'default'
        },
        { signal }
      )

      for await (const event of stream) {
        if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
          emit('text', { delta: event.delta.text })
        } else if (event.type === 'content_block_start' && event.content_block.type === 'tool_use') {
          emit('tool_start', { id: event.content_block.id, name: event.content_block.name })
        }
      }

      const message = await stream.finalMessage()
      emit('done', { stopReason: message.stop_reason, content: message.content })
    } catch (error) {
      if (signal?.aborted) return
      throw toAgentError(error)
    }
  }
})
