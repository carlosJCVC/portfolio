import { parseSse } from './sseParser'
import { ProviderError } from './providerError'

const RECOVERABLE_CODES = new Set(['not_configured', 'quota_exhausted', 'upstream', 'internal', 'unreachable'])

const readError = async (response) => {
  try {
    const { error } = await response.json()
    return error ?? {}
  } catch {
    return {}
  }
}

export const createRemoteProvider = ({ endpoint = '/api/chat', fetchImpl = (...args) => fetch(...args) } = {}) => ({
  id: 'remote',

  async *stream({ messages, signal }) {
    let response
    try {
      response = await fetchImpl(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages }),
        signal
      })
    } catch (error) {
      if (error.name === 'AbortError') throw error
      throw new ProviderError('unreachable', 'Could not reach the AI agent.', { recoverable: true })
    }

    const isStream = response.headers.get('content-type')?.includes('text/event-stream')
    if (!response.ok || !isStream) {
      const { code = 'unreachable', message = 'The AI agent is unavailable.' } = await readError(response)
      throw new ProviderError(code, message, {
        recoverable: RECOVERABLE_CODES.has(code) || response.status === 404 || !isStream
      })
    }

    for await (const { event, data } of parseSse(response.body)) {
      if (event === 'error') {
        throw new ProviderError(data.code, data.message, { recoverable: RECOVERABLE_CODES.has(data.code) })
      }
      yield { type: event, ...data }
    }
  }
})
