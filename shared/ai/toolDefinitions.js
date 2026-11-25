
export const TOOL_NAMES = Object.freeze({
  GET_PROFILE: 'get_profile',
  SEARCH_PROJECTS: 'search_projects',
  GET_EXPERIENCE: 'get_experience',
  GET_SKILLS: 'get_skills',
  GET_EDUCATION: 'get_education',
  SHOW_JOB_FIT_REPORT: 'show_job_fit_report',
  SHOW_CONTACT_OPTIONS: 'show_contact_options'
})

export const SKILL_AREAS = Object.freeze(['backend', 'frontend', 'mobile', 'tools'])

export const PROJECT_CATEGORIES = Object.freeze(['Web App', 'Enterprise', 'Mobile App', 'Backend'])

const VISUAL_NOTE =
  'The visitor automatically sees a visual card with the full result, so do not repeat every detail in your reply — highlight what matters.'

export const toolDefinitions = [
  {
    name: TOOL_NAMES.GET_PROFILE,
    description: `Returns Carlos's professional profile: role, location, availability, summary and social links. ${VISUAL_NOTE}`,
    input_schema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: TOOL_NAMES.SEARCH_PROJECTS,
    description: `Searches Carlos's portfolio projects. All filters are optional and combined with AND; call with no filters to list everything. ${VISUAL_NOTE}`,
    input_schema: {
      type: 'object',
      properties: {
        query: {
          type: 'string',
          description: 'Free-text search over title, description and features, e.g. "payments" or "scraping".'
        },
        technology: {
          type: 'string',
          description: 'A single technology to filter by, e.g. "Laravel", "Vue.js", "React Native".'
        },
        category: { type: 'string', enum: PROJECT_CATEGORIES },
        featured_only: { type: 'boolean', description: 'Only return highlighted projects.' },
        limit: { type: 'integer', minimum: 1, maximum: 10, description: 'Max results (default 6).' }
      },
      additionalProperties: false
    }
  },
  {
    name: TOOL_NAMES.GET_EXPERIENCE,
    description: `Returns Carlos's work history (roles, companies, periods, achievements, skills), newest first. ${VISUAL_NOTE}`,
    input_schema: {
      type: 'object',
      properties: {
        company: { type: 'string', description: 'Optional company name to filter by.' }
      },
      additionalProperties: false
    }
  },
  {
    name: TOOL_NAMES.GET_SKILLS,
    description: `Returns Carlos's technical skills grouped by area. ${VISUAL_NOTE}`,
    input_schema: {
      type: 'object',
      properties: {
        area: { type: 'string', enum: SKILL_AREAS, description: 'Optional single area.' }
      },
      additionalProperties: false
    }
  },
  {
    name: TOOL_NAMES.GET_EDUCATION,
    description: `Returns Carlos's degrees, postgraduate diplomas and certifications. ${VISUAL_NOTE}`,
    input_schema: { type: 'object', properties: {}, additionalProperties: false }
  },
  {
    name: TOOL_NAMES.SHOW_JOB_FIT_REPORT,
    description:
      'Renders a job-match report card for the visitor. Use it only after gathering evidence with the data tools, when the visitor shares a job description or asks how Carlos fits a role. Every strength must cite real evidence from the tool results; list real gaps honestly.',
    input_schema: {
      type: 'object',
      properties: {
        role_title: { type: 'string', description: 'Title of the role being evaluated.' },
        company: { type: 'string', description: 'Hiring company, if known.' },
        match_score: {
          type: 'integer',
          minimum: 0,
          maximum: 100,
          description: 'Honest overall fit, 0-100.'
        },
        summary: { type: 'string', description: 'One or two sentence verdict.' },
        strengths: {
          type: 'array',
          maxItems: 6,
          items: {
            type: 'object',
            properties: {
              requirement: { type: 'string', description: 'Requirement from the job description.' },
              evidence: { type: 'string', description: 'Concrete proof from Carlos\'s data.' }
            },
            required: ['requirement', 'evidence'],
            additionalProperties: false
          }
        },
        gaps: {
          type: 'array',
          maxItems: 4,
          items: { type: 'string' },
          description: 'Requirements with weak or no evidence.'
        },
        relevant_projects: {
          type: 'array',
          maxItems: 4,
          items: { type: 'string' },
          description: 'Exact project titles that best prove the fit.'
        }
      },
      required: ['role_title', 'match_score', 'summary', 'strengths', 'gaps'],
      additionalProperties: false
    }
  },
  {
    name: TOOL_NAMES.SHOW_CONTACT_OPTIONS,
    description:
      'Shows a contact card (email, LinkedIn, GitHub, CV download). Use it when the visitor wants to hire, interview or reach Carlos.',
    input_schema: {
      type: 'object',
      properties: {
        headline: { type: 'string', description: 'Short, friendly call to action for the card.' }
      },
      additionalProperties: false
    }
  }
]
