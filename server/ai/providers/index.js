import { AgentErrors } from '../agentError.js'
import { createAnthropicProvider } from './anthropicProvider.js'
import { createOpenAICompatibleProvider } from './openAICompatibleProvider.js'

const FACTORIES = {
  groq: (config) => createOpenAICompatibleProvider({ config: config.groq, maxTokens: config.maxTokens }),
  anthropic: (config) => createAnthropicProvider({ config: config.anthropic, maxTokens: config.maxTokens })
}

export const createModelProvider = (config) => {
  const factory = FACTORIES[config.provider]
  if (!factory) throw AgentErrors.notConfigured()
  return factory(config)
}
