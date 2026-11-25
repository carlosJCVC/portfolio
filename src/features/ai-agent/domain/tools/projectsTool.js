import { PROJECT_CATEGORIES, TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { field } from '../inputValidation'

const toModelSummary = (project) => ({
  title: project.title,
  category: project.category,
  featured: project.featured,
  summary: project.description,
  technologies: project.technologies,
  key_features: (project.features ?? []).slice(0, 6),
  live_url: project.displayLiveUrl ? project.liveUrl : undefined
})

export const projectsTool = {
  name: TOOL_NAMES.SEARCH_PROJECTS,
  parse: (input) => ({
    query: field.string(input, 'query', { max: 120 }),
    technology: field.string(input, 'technology', { max: 60 }),
    category: field.oneOf(input, 'category', PROJECT_CATEGORIES),
    featuredOnly: field.boolean(input, 'featured_only'),
    limit: field.integer(input, 'limit', { min: 1, max: 10 }) ?? 6
  }),
  execute(filters, kb) {
    const { total, items } = kb.searchProjects(filters)
    return {
      result: {
        total_matches: total,
        returned: items.length,
        projects: items.map(toModelSummary),
        ...(total === 0 && { note: 'No projects match these filters. Try a broader search.' })
      },
      view: { projects: items, total, filters }
    }
  }
}
