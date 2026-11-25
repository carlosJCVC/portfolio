export class AgentError extends Error {
  constructor(code, message, status = 502, cause = undefined) {
    super(message, { cause })
    this.name = 'AgentError'
    this.code = code
    this.status = status
  }
}

export const AgentErrors = {
  notConfigured: (cause) => new AgentError('not_configured', 'The AI agent is not configured.', 503, cause),
  quotaExhausted: (cause) =>
    new AgentError('quota_exhausted', 'The AI quota is used up for now.', 503, cause),
  badRequest: (cause) =>
    new AgentError('bad_request', 'The conversation could not be processed. Please start a new chat.', 400, cause),
  upstream: (cause) => new AgentError('upstream', 'The AI service is temporarily unavailable.', 502, cause),
  internal: (cause) => new AgentError('internal', 'Unexpected error.', 500, cause)
}
