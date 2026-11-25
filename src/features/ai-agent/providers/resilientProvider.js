import { ProviderError } from './providerError'

export const createResilientProvider = ({ primary, fallback, startOnFallback = false, onSwitch = () => {} }) => {
  let active = startOnFallback ? fallback : primary

  return {
    get id() {
      return active.id
    },

    async *stream(request) {
      if (active === fallback) {
        yield* fallback.stream(request)
        return
      }

      let produced = false
      try {
        for await (const event of primary.stream(request)) {
          if (event.type !== 'meta') produced = true
          yield event
        }
      } catch (error) {
        const canSwitch = error instanceof ProviderError && error.recoverable && !produced
        if (!canSwitch) throw error

        active = fallback
        onSwitch({ from: primary.id, to: fallback.id, reason: error.code })
        yield* fallback.stream(request)
      }
    }
  }
}
