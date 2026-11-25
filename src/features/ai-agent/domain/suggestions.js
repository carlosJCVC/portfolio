import { TOOL_NAMES } from '@shared/ai/toolDefinitions'

export const PROMPT_IDS = Object.freeze({
  WHO: 'who',
  FEATURED: 'featured',
  EXPERIENCE: 'experience',
  SKILLS: 'skills',
  LARAVEL: 'laravel',
  MOBILE: 'mobile',
  EDUCATION: 'education',
  CONTACT: 'contact',
  JOB_FIT: 'jobFit'
})

const P = PROMPT_IDS

const NEXT_STEPS = {
  [TOOL_NAMES.GET_PROFILE]: [P.FEATURED, P.EXPERIENCE, P.JOB_FIT],
  [TOOL_NAMES.SEARCH_PROJECTS]: [P.EXPERIENCE, P.JOB_FIT, P.CONTACT],
  [TOOL_NAMES.GET_EXPERIENCE]: [P.FEATURED, P.SKILLS, P.JOB_FIT],
  [TOOL_NAMES.GET_SKILLS]: [P.LARAVEL, P.MOBILE, P.JOB_FIT],
  [TOOL_NAMES.GET_EDUCATION]: [P.EXPERIENCE, P.FEATURED, P.CONTACT],
  [TOOL_NAMES.SHOW_JOB_FIT_REPORT]: [P.CONTACT, P.FEATURED, P.EXPERIENCE],
  [TOOL_NAMES.SHOW_CONTACT_OPTIONS]: [P.FEATURED, P.JOB_FIT]
}

export const STARTER_PROMPTS = [P.WHO, P.FEATURED, P.EXPERIENCE, P.MOBILE]

export const suggestFollowUps = (toolNamesUsed = []) => {
  const used = new Set(toolNamesUsed)
  const candidates = toolNamesUsed.flatMap((name) => NEXT_STEPS[name] ?? [])
  const pool = candidates.length ? candidates : [P.FEATURED, P.EXPERIENCE, P.JOB_FIT]
  const unique = [...new Set(pool)].filter((id) => !(id === P.CONTACT && used.has(TOOL_NAMES.SHOW_CONTACT_OPTIONS)))
  return unique.slice(0, 3)
}
