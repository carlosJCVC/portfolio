import { TOOL_NAMES } from '@shared/ai/toolDefinitions'
import ProfileWidget from './ProfileWidget.vue'
import ProjectsWidget from './ProjectsWidget.vue'
import ExperienceWidget from './ExperienceWidget.vue'
import SkillsWidget from './SkillsWidget.vue'
import EducationWidget from './EducationWidget.vue'
import FitReportWidget from './FitReportWidget.vue'
import ContactWidget from './ContactWidget.vue'

const REGISTRY = {
  [TOOL_NAMES.GET_PROFILE]: { icon: 'fa-id-card', component: ProfileWidget },
  [TOOL_NAMES.SEARCH_PROJECTS]: { icon: 'fa-magnifying-glass', component: ProjectsWidget },
  [TOOL_NAMES.GET_EXPERIENCE]: { icon: 'fa-briefcase', component: ExperienceWidget },
  [TOOL_NAMES.GET_SKILLS]: { icon: 'fa-microchip', component: SkillsWidget },
  [TOOL_NAMES.GET_EDUCATION]: { icon: 'fa-graduation-cap', component: EducationWidget },
  [TOOL_NAMES.SHOW_JOB_FIT_REPORT]: { icon: 'fa-bullseye', component: FitReportWidget },
  [TOOL_NAMES.SHOW_CONTACT_OPTIONS]: { icon: 'fa-envelope-open-text', component: ContactWidget }
}

const FALLBACK = { icon: 'fa-wrench', component: null }

export const widgetFor = (toolName) => REGISTRY[toolName] ?? FALLBACK
