const SPANISH_HINTS =
  /\b(hola|qu[eé]|cu[aá]l(es)?|c[oó]mo|d[oó]nde|tiene|sus|proyectos?|experiencia|habilidades|sobre|puesto|empresa|trabaj\w*|contact\w*|buscamos|requisitos|para|con|los|las|una?|del)\b/gi

const ENGLISH_HINTS =
  /\b(hi|hello|what|which|how|where|does|has|his|projects?|experience|skills|about|role|company|work\w*|contact|looking|requirements|for|with|the|an?|of)\b/gi

export const detectLanguage = (text = '') => {
  const es = text.match(SPANISH_HINTS)?.length ?? 0
  const en = text.match(ENGLISH_HINTS)?.length ?? 0
  return es > en ? 'es' : 'en'
}
