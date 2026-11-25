import { TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { field } from '../inputValidation'

export const experienceTool = {
  name: TOOL_NAMES.GET_EXPERIENCE,
  parse: (input) => ({ company: field.string(input, 'company', { max: 80 }) }),
  execute(filters, kb) {
    const jobs = kb.getExperience(filters)
    return {
      result: {
        positions: jobs.map(({ role, company, period, description, skills }) => ({
          role,
          company,
          period,
          description,
          skills
        }))
      },
      view: { jobs }
    }
  }
}
