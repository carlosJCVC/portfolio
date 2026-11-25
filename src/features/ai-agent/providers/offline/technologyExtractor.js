import { normalizeTerm } from '../../domain/knowledgeBase'

export const extractTechnologies = (text, technologies) => {
  const words = text.toLowerCase().split(/[^a-z0-9#+.]+/).filter(Boolean)
  const candidates = new Set()
  words.forEach((word, i) => {
    candidates.add(normalizeTerm(word))
    if (words[i + 1]) candidates.add(normalizeTerm(word + words[i + 1]))
  })

  const sorted = [...technologies].sort((a, b) => normalizeTerm(b).length - normalizeTerm(a).length)
  const found = []
  for (const tech of sorted) {
    const key = normalizeTerm(tech)
    if (key.length < 2 || !candidates.has(key)) continue
    if (found.some((f) => normalizeTerm(f).includes(key))) continue
    found.push(tech)
  }
  return found
}
