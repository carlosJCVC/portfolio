import { TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { field } from '../inputValidation'

export const contactTool = {
  name: TOOL_NAMES.SHOW_CONTACT_OPTIONS,
  parse: (input) => ({ headline: field.string(input, 'headline', { max: 160 }) }),
  execute({ headline }, kb) {
    return {
      result: { displayed: true },
      view: { headline, profile: kb.getProfile() }
    }
  }
}
