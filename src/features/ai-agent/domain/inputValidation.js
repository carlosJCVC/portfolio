export class ToolInputError extends Error {
  constructor(message) {
    super(message)
    this.name = 'ToolInputError'
  }
}

const fail = (field, expectation) => {
  throw new ToolInputError(`"${field}" ${expectation}`)
}

export const field = {
  string(input, name, { required = false, max = 2000 } = {}) {
    const value = input?.[name]
    if (value === undefined || value === null || value === '') {
      if (required) fail(name, 'is required')
      return undefined
    }
    if (typeof value !== 'string') fail(name, 'must be a string')
    return value.trim().slice(0, max)
  },

  boolean(input, name) {
    const value = input?.[name]
    if (value === undefined || value === null) return undefined
    if (typeof value !== 'boolean') fail(name, 'must be a boolean')
    return value
  },

  integer(input, name, { min = -Infinity, max = Infinity, required = false } = {}) {
    const value = input?.[name]
    if (value === undefined || value === null) {
      if (required) fail(name, 'is required')
      return undefined
    }
    if (!Number.isInteger(value)) fail(name, 'must be an integer')
    return Math.min(max, Math.max(min, value))
  },

  oneOf(input, name, options) {
    const value = input?.[name]
    if (value === undefined || value === null || value === '') return undefined
    if (!options.includes(value)) fail(name, `must be one of: ${options.join(', ')}`)
    return value
  },

  array(input, name, mapItem, { max = 10, required = false } = {}) {
    const value = input?.[name]
    if (value === undefined || value === null) {
      if (required) fail(name, 'is required')
      return []
    }
    if (!Array.isArray(value)) fail(name, 'must be an array')
    return value.slice(0, max).map((item, index) => mapItem(item, `${name}[${index}]`))
  }
}

export const itemString = (item, name, max = 400) => {
  if (typeof item !== 'string' || !item.trim()) fail(name, 'must be a non-empty string')
  return item.trim().slice(0, max)
}
