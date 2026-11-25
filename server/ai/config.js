const readInt = (value, fallback) => {
  const parsed = Number.parseInt(value ?? '', 10)
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback
}

const resolveProvider = (env) => {
  if (env.AI_PROVIDER) return env.AI_PROVIDER
  if (env.GROQ_API_KEY) return 'groq'
  if (env.ANTHROPIC_API_KEY) return 'anthropic'
  return 'none'
}

export const getAgentConfig = (env = process.env) =>
  Object.freeze({
    provider: resolveProvider(env),
    maxTokens: readInt(env.AI_MAX_TOKENS, 4096),
    groq: Object.freeze({
      apiKey: env.GROQ_API_KEY,
      baseUrl: env.GROQ_BASE_URL || 'https://api.groq.com/openai/v1',
      models: (env.AI_MODEL || 'openai/gpt-oss-120b,openai/gpt-oss-20b').split(',').map((model) => model.trim()),
      reasoningEffort: env.AI_REASONING_EFFORT || 'low',
      maxHistoryTurns: readInt(env.AI_MAX_HISTORY_TURNS, 4),
      label: env.AI_MODEL_LABEL || 'GPT-OSS · Groq'
    }),
    anthropic: Object.freeze({
      model: env.AI_MODEL || 'claude-opus-5-5',
      effort: env.AI_EFFORT || 'medium',
      label: env.AI_MODEL_LABEL || 'Claude'
    }),
    rateLimit: Object.freeze({
      maxRequests: readInt(env.AI_RATE_LIMIT_MAX, 40),
      windowMs: readInt(env.AI_RATE_LIMIT_WINDOW_MS, 10 * 60 * 1000)
    }),
    dailyLimit: readInt(env.AI_DAILY_LIMIT, 600),
    limits: Object.freeze({
      maxMessages: 60,
      maxTextLength: 6000,
      maxPayloadChars: 250_000
    })
  })
