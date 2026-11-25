import { parseSse } from './sseParser'
import { ProviderError } from './providerError'

const RECOVERABLE_CODES = new Set(['not_configured', 'quota_exhausted', 'upstream', 'internal', 'unreachable'])
const PERSISTENT_CODES = new Set(['not_configured', 'unreachable'])

const errorFor = (code, message, { forceUnavailable = false } = {}) =>
  new ProviderError(code, message, {
    recoverable: forceUnavailable || RECOVERABLE_CODES.has(code),
    persistent: forceUnavailable || PERSISTENT_CODES.has(code)
  })

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
      throw errorFor('unreachable', 'Could not reach the AI agent.')
    }

    const isStream = response.headers.get('content-type')?.includes('text/event-stream')
    if (!response.ok || !isStream) {
      const { code = 'unreachable', message = 'The AI agent is unavailable.' } = await readError(response)
      throw errorFor(code, message, { forceUnavailable: response.status === 404 || (response.ok && !isStream) })
    }

    for await (const { event, data } of parseSse(response.body)) {
      if (event === 'error') {
        throw errorFor(data.code, data.message)
      }
      yield { type: event, ...data }
    }
  }
})
