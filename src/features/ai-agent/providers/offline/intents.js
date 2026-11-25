import { TOOL_NAMES } from '@shared/ai/toolDefinitions'

export const INTENTS = [
  {
    tool: TOOL_NAMES.GET_PROFILE,
    pattern: /\b(who|qui[eé]n|about (him|carlos)|sobre (él|el|carlos)|introduce|pres[eé]nta\w*|summary|resumen|perfil|profile)\b/i
  },
  {
    tool: TOOL_NAMES.SEARCH_PROJECTS,
    pattern: /\b(projects?|proyectos?|portfolio|portafolio|built|constru\w+|apps?|work samples|demos?|interpreto|products?|productos?|startup|saas)\b/i
  },
  {
    tool: TOOL_NAMES.GET_EXPERIENCE,
    pattern: /\b(experience|experiencia|career|carrera|worked|trabaj\w*|jobs?|empleos?|compan(y|ies)|empresas?|years|años)\b/i
  },
  {
    tool: TOOL_NAMES.GET_SKILLS,
    pattern: /\b(skills?|habilidades|stack|tech\w*|tecnolog\w*|lenguajes?|languages?|frameworks?|sabe|knows?)\b/i
  },
  {
    tool: TOOL_NAMES.GET_EDUCATION,
    pattern: /\b(educat\w*|educaci[oó]n|degree|t[ií]tulo|universi\w*|certif\w*|stud\w*|estudi\w*|diploma\w*)\b/i
  },
  {
    tool: TOOL_NAMES.SHOW_CONTACT_OPTIONS,
    pattern: /\b(contact\w*|hire|contrat\w*|email|correo|reach|interview|entrevista\w*|linkedin|cv|resume|curr[ií]cul\w*)\b/i
  }
]

const GREETING = /^\s*(hi|hello|hey|hola|buenas|buenos d[ií]as|qu[eé] tal)\b/i
const JOB_POST =
  /(job description|descripci[oó]n del puesto|vacante|requirements|requisitos|we are looking|we're looking|buscamos|responsibilities|responsabilidades|fit for|fits this role|encaja)/i

export const detectIntent = (text) => {
  if (text.length > 280 || JOB_POST.test(text)) return { kind: 'job_fit' }

  const tools = INTENTS.filter((intent) => intent.pattern.test(text)).map((intent) => intent.tool)
  if (tools.length) return { kind: 'tools', tools }
  if (GREETING.test(text)) return { kind: 'greeting' }
  return { kind: 'unknown' }
}
