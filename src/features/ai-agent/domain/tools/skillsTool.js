import { SKILL_AREAS, TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { field } from '../inputValidation'

export const skillsTool = {
  name: TOOL_NAMES.GET_SKILLS,
  parse: (input) => ({ area: field.oneOf(input, 'area', SKILL_AREAS) }),
  execute(filters, kb) {
    const groups = kb.getSkills(filters)
    return {
      result: { skill_groups: groups.map(({ title, items }) => ({ area: title, skills: items })) },
      view: { groups }
    }
  }
}
