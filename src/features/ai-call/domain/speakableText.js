const MAX_SPOKEN_CHARS = 360
const MAX_SPOKEN_SENTENCES = 3

export const splitSentences = (text) =>
  text.match(/[^.!?¡¿]+[.!?]+|[^.!?]+$/g)?.map((sentence) => sentence.trim()).filter(Boolean) ?? []

export const toSpeakableText = (markdown = '') => {
  const text = markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*_`#>]/g, '')
    .replace(/^\s*([-•]|\d+[.)])\s+/gm, '')
    .replace(/\s*\n+\s*/g, '. ')
    .replace(/\.{2,}/g, '.')
    .replace(/\s{2,}/g, ' ')
    .trim()

  const spoken = splitSentences(text).slice(0, MAX_SPOKEN_SENTENCES).join(' ')
  if (spoken.length <= MAX_SPOKEN_CHARS) return spoken
  const cut = spoken.slice(0, MAX_SPOKEN_CHARS)
  return cut.slice(0, Math.max(cut.lastIndexOf('. ') + 1, cut.lastIndexOf(' '))).trim()
}
