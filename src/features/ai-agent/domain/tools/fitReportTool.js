import { TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { field, itemString, ToolInputError } from '../inputValidation'

const parseStrength = (item, name) => {
  if (!item || typeof item !== 'object') throw new ToolInputError(`"${name}" must be an object`)
  return {
    requirement: itemString(item.requirement, `${name}.requirement`, 160),
    evidence: itemString(item.evidence, `${name}.evidence`, 400)
  }
}

export const fitReportTool = {
  name: TOOL_NAMES.SHOW_JOB_FIT_REPORT,
  parse: (input) => ({
    roleTitle: field.string(input, 'role_title', { required: true, max: 120 }),
    company: field.string(input, 'company', { max: 80 }),
    matchScore: field.integer(input, 'match_score', { min: 0, max: 100, required: true }),
    summary: field.string(input, 'summary', { required: true, max: 600 }),
    strengths: field.array(input, 'strengths', parseStrength, { max: 6, required: true }),
    gaps: field.array(input, 'gaps', (item, name) => itemString(item, name, 200), { max: 4 }),
    relevantProjects: field.array(input, 'relevant_projects', (item, name) => itemString(item, name, 120), {
      max: 4
    })
  }),
  execute(report, kb) {
    const projects = kb.findProjectsByTitle(report.relevantProjects)
    return {
      result: { displayed: true, note: 'The report card is now visible to the visitor.' },
      view: { ...report, projects }
    }
  }
}
