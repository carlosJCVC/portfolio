export const VOICE_PREFIX = '[voice]'

export const withVoicePrefix = (text) => `${VOICE_PREFIX} ${text}`

export const stripVoicePrefix = (text = '') =>
  text.startsWith(VOICE_PREFIX) ? text.slice(VOICE_PREFIX.length).trimStart() : text
