import { TOOL_NAMES } from '@shared/ai/toolDefinitions'

export const educationTool = {
  name: TOOL_NAMES.GET_EDUCATION,
  parse: () => ({}),
  execute(_input, kb) {
    const { education, certifications } = kb.getEducation()
    return {
      result: {
        education: education.map(({ degree, school, period }) => ({ degree, school, period })),
        certifications: certifications.map(({ name, issuer, year }) => ({ name, issuer, year }))
      },
      view: { education, certifications }
    }
  }
}
