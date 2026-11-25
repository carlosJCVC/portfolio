import { ProviderError } from './providerError'

export const createResilientProvider = ({ primary, fallback, startOnFallback = false, onSwitch = () => {} }) => {
  let primaryDisabled = startOnFallback
  let active = startOnFallback ? fallback : primary

  const use = (provider, reason) => {
    if (active === provider) return
    onSwitch({ from: active.id, to: provider.id, reason })
    active = provider
  }

  return {
    get id() {
      return active.id
    },

    async *stream(request) {
      if (primaryDisabled) {
        yield* fallback.stream(request)
        return
      }

      let produced = false
      try {
        for await (const event of primary.stream(request)) {
          if (event.type !== 'meta') {
            produced = true
            use(primary)
          }
          yield event
        }
      } catch (error) {
        const canFallBack = error instanceof ProviderError && error.recoverable && !produced
        if (!canFallBack) throw error

        primaryDisabled = error.persistent
        use(fallback, error.code)
        yield* fallback.stream(request)
      }
    }
  }
}
