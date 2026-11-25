import { getAgentConfig } from './config.js'
import { createRateLimiter } from './rateLimiter.js'
import { validateChatRequest, ValidationError } from './requestValidator.js'
import { createSseWriter } from './sse.js'
import { AgentError, AgentErrors } from './agentError.js'
import { createModelProvider } from './providers/index.js'

const config = getAgentConfig()
const perClientLimiter = createRateLimiter(config.rateLimit)
const dailyLimiter = createRateLimiter({ maxRequests: config.dailyLimit, windowMs: 24 * 60 * 60 * 1000 })
let modelProvider = null

const getModelProvider = () => {
  if (!modelProvider) {
    try {
      modelProvider = createModelProvider(config)
    } catch (error) {
      throw error instanceof AgentError ? error : AgentErrors.notConfigured(error)
    }
  }
  return modelProvider
}

const sendJson = (res, status, payload, headers = {}) => {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  Object.entries(headers).forEach(([key, value]) => res.setHeader(key, value))
  res.end(JSON.stringify(payload))
}

const sendError = (res, error, headers) =>
  sendJson(res, error.status, { error: { code: error.code, message: error.message } }, headers)

const clientIdOf = (req) =>
  String(req.headers['x-forwarded-for'] ?? '').split(',')[0].trim() || req.socket?.remoteAddress || 'unknown'

const readJsonBody = async (req, maxChars) => {
  if (req.body !== undefined) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body
  }
  let raw = ''
  for await (const chunk of req) {
    raw += chunk
    if (raw.length > maxChars * 2) throw new ValidationError('Payload too large.')
  }
  return JSON.parse(raw || '{}')
}

export default async function chatHandler(req, res) {
  if (req.method !== 'POST') {
    return sendJson(res, 405, { error: { code: 'method_not_allowed', message: 'Use POST.' } }, { Allow: 'POST' })
  }

  let provider
  try {
    provider = getModelProvider()
  } catch (error) {
    return sendError(res, error)
  }

  const quota = perClientLimiter.consume(clientIdOf(req))
  if (!quota.allowed) {
    return sendJson(
      res,
      429,
      { error: { code: 'rate_limited', message: 'Too many messages. Please slow down a little.' } },
      { 'Retry-After': String(quota.retryAfterSeconds) }
    )
  }
  if (!dailyLimiter.consume('global').allowed) {
    return sendError(res, AgentErrors.quotaExhausted())
  }

  let messages
  try {
    const body = await readJsonBody(req, config.limits.maxPayloadChars)
    ;({ messages } = validateChatRequest(body, config.limits))
  } catch (error) {
    const message = error instanceof ValidationError ? error.message : 'Invalid JSON body.'
    return sendJson(res, 400, { error: { code: 'invalid_request', message } })
  }

  const abortController = new AbortController()
  res.on('close', () => abortController.abort())

  const sse = createSseWriter(res)
  sse.send('meta', { model: provider.label })
  try {
    await provider.streamTurn({ messages, emit: sse.send, signal: abortController.signal })
  } catch (error) {
    const safe = error instanceof AgentError ? error : AgentErrors.internal(error)
    console.error(`[ai-agent] ${safe.code}`, safe.cause ?? '')
    sse.send('error', { code: safe.code, message: safe.message })
  } finally {
    sse.close()
  }
}
