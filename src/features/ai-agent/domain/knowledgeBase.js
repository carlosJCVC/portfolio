import { profile } from '@/data/profile'
import { projects } from '@/data/projects'
import { experience, education, certifications } from '@/data/experience'

export const normalizeTerm = (value = '') =>
  value
    .toLowerCase()
    .replace(/\.js\b/g, '')
    .replace(/[^a-z0-9#+]/g, '')

const matchesTechnology = (technologies, technology) => {
  const needle = normalizeTerm(technology)
  return technologies.some((tech) => normalizeTerm(tech).includes(needle))
}

const matchesQuery = (project, query) => {
  const haystack = [project.title, project.description, project.fullDescription, ...(project.features ?? [])]
    .join(' ')
    .toLowerCase()
  return query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean)
    .every((word) => haystack.includes(word))
}

export const createKnowledgeBase = (source = { profile, projects, experience, education, certifications }) => ({
  getProfile: () => source.profile,

  searchProjects({ query, technology, category, featuredOnly, limit = 6 } = {}) {
    const matches = source.projects.filter(
      (project) =>
        (!technology || matchesTechnology(project.technologies, technology)) &&
        (!category || project.category === category) &&
        (!featuredOnly || project.featured) &&
        (!query || matchesQuery(project, query))
    )
    const ranked = [...matches].sort((a, b) => Number(b.featured) - Number(a.featured))
    return { total: matches.length, items: ranked.slice(0, limit) }
  },

  getExperience({ company } = {}) {
    if (!company) return source.experience
    const needle = company.toLowerCase()
    return source.experience.filter((job) => job.company.toLowerCase().includes(needle))
  },

  getSkills({ area } = {}) {
    const entries = Object.entries(source.profile.skills)
    return entries
      .filter(([key]) => !area || key === area)
      .map(([key, group]) => ({ area: key, title: group.title, items: group.items }))
  },

  getEducation: () => ({ education: source.education, certifications: source.certifications }),

  findProjectsByTitle(titles = []) {
    const wanted = titles.map(normalizeTerm)
    return source.projects.filter((project) => wanted.includes(normalizeTerm(project.title)))
  },

  allTechnologies() {
    const fromSkills = Object.values(source.profile.skills).flatMap((group) => group.items)
    const fromProjects = source.projects.flatMap((project) => project.technologies)
    const fromJobs = source.experience.flatMap((job) => job.skills)
    const unique = new Map()
    for (const tech of [...fromSkills, ...fromProjects, ...fromJobs]) {
      unique.set(normalizeTerm(tech), tech)
    }
    return [...unique.values()]
  }
})

export const knowledgeBase = createKnowledgeBase()
