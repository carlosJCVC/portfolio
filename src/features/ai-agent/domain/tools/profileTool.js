import { TOOL_NAMES } from '@shared/ai/toolDefinitions'

export const profileTool = {
  name: TOOL_NAMES.GET_PROFILE,
  parse: () => ({}),
  execute(_input, kb) {
    const profile = kb.getProfile()
    return {
      result: {
        name: profile.name,
        role: profile.role,
        location: profile.location,
        open_to_work: profile.openToWork,
        summary: profile.about,
        linkedin: profile.social.linkedin,
        github: profile.social.github
      },
      view: { profile }
    }
  }
}
