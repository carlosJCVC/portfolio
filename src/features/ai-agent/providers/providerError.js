export class ProviderError extends Error {
  constructor(code, message, { recoverable = false } = {}) {
    super(message)
    this.name = 'ProviderError'
    this.code = code
    this.recoverable = recoverable
  }
}
