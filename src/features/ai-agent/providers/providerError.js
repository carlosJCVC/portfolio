export class ProviderError extends Error {
  constructor(code, message, { recoverable = false, persistent = false } = {}) {
    super(message)
    this.name = 'ProviderError'
    this.code = code
    this.recoverable = recoverable
    this.persistent = persistent
  }
}
