import { normalizeTerm } from '../../domain/knowledgeBase'
import { extractTechnologies } from './technologyExtractor'

const MARKET_TECHNOLOGIES = [
  'Kubernetes', 'GraphQL', 'Golang', 'Java', 'Spring', 'C#', '.NET', 'Ruby', 'Rails', 'Django',
  'FastAPI', 'Kafka', 'Terraform', 'Azure', 'GCP', 'Nuxt', 'Svelte', 'Rust', 'Scala',
  'MongoDB', 'Elasticsearch', 'Swift', 'Kotlin', 'NestJS', 'Firebase', 'Supabase'
]

const usesTech = (techList, tech) => techList.some((t) => normalizeTerm(t).includes(normalizeTerm(tech)))

const evidenceFor = (tech, kb, lang) => {
  const projects = kb.searchProjects({ technology: tech, limit: 3 }).items.map((p) => p.title)
  const jobs = kb.getExperience().filter((job) => usesTech(job.skills, tech))
  if (projects.length) {
    return lang === 'es' ? `Usado en ${projects.join(', ')}.` : `Used in ${projects.join(', ')}.`
  }
  if (jobs.length) {
    const job = jobs[0]
    return lang === 'es' ? `${job.role} en ${job.company}.` : `${job.role} at ${job.company}.`
  }
  return lang === 'es' ? 'Parte de su stack principal.' : 'Part of his core stack.'
}

const guessRoleTitle = (text, lang) => {
  const firstLine = text.split('\n').map((l) => l.trim()).find(Boolean) ?? ''
  if (firstLine.length > 3 && firstLine.length <= 80) return firstLine.replace(/[:.]$/, '')
  return lang === 'es' ? 'Puesto analizado' : 'Analyzed role'
}

export const analyzeJobFit = (jobText, kb, lang) => {
  const known = kb.allTechnologies()
  const matched = extractTechnologies(jobText, known)
  const missing = extractTechnologies(
    jobText,
    MARKET_TECHNOLOGIES.filter((tech) => !known.some((k) => normalizeTerm(k) === normalizeTerm(tech)))
  )

  const total = matched.length + missing.length
  const ratio = total === 0 ? 0.6 : matched.length / total
  const matchScore = Math.round(45 + ratio * 50)

  const projectHits = new Map()
  for (const tech of matched) {
    for (const project of kb.searchProjects({ technology: tech, limit: 10 }).items) {
      projectHits.set(project.title, (projectHits.get(project.title) ?? 0) + 1)
    }
  }
  const relevantProjects = [...projectHits.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([title]) => title)

  const summary =
    lang === 'es'
      ? `Carlos cubre ${matched.length} de ${total || matched.length} tecnologías detectadas en la descripción, con más de 10 años de experiencia full-stack.`
      : `Carlos covers ${matched.length} of ${total || matched.length} technologies detected in the description, backed by 10+ years of full-stack experience.`

  return {
    role_title: guessRoleTitle(jobText, lang),
    match_score: matchScore,
    summary,
    strengths: matched.slice(0, 6).map((tech) => ({ requirement: tech, evidence: evidenceFor(tech, kb, lang) })),
    gaps: missing.slice(0, 4),
    relevant_projects: relevantProjects
  }
}
