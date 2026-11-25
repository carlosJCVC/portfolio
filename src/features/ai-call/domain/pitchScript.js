import { knowledgeBase } from '@/features/ai-agent/domain/knowledgeBase'

export const SCENES = Object.freeze({
  INTRO: 'intro',
  FLAGSHIP: 'flagship',
  STACK: 'stack',
  PROJECTS: 'projects',
  CAREER: 'career',
  CTA: 'cta'
})

const firstYearOf = (jobs) =>
  Math.min(...jobs.map((job) => Number(job.period.match(/\d{4}/)?.[0])).filter(Number.isFinite))

export const pitchClipUrl = (locale, sceneId) => `/audio/pitch/${locale}/${sceneId}.mp3`

export const buildPitch = ({ t, locale, kb = knowledgeBase }) => {
  const list = (items) => new Intl.ListFormat(locale, { type: 'conjunction' }).format(items)
  const profile = kb.getProfile()
  const jobs = kb.getExperience()
  const groups = kb.getSkills()
  const allProjects = kb.searchProjects({ limit: 100 })
  const flagship = kb.getFlagship()
  const featured = kb
    .searchProjects({ featuredOnly: true, limit: 4 })
    .items.filter((project) => !project.flagship)
    .slice(0, 3)

  const scenes = [
    {
      id: SCENES.INTRO,
      line: t('aiCall.pitch.intro', {
        name: profile.name,
        role: profile.role,
        location: profile.location,
        year: firstYearOf(jobs)
      }),
      visual: { profile }
    },
    flagship && {
      id: SCENES.FLAGSHIP,
      line: t('aiCall.pitch.flagship', { name: flagship.title }),
      visual: { project: flagship }
    },
    {
      id: SCENES.STACK,
      line: t('aiCall.pitch.stack', { stack: list(groups.flatMap((group) => group.items.slice(0, 2)).slice(0, 6)) }),
      visual: { groups }
    },
    {
      id: SCENES.PROJECTS,
      line: t('aiCall.pitch.projects', {
        total: allProjects.total,
        featured: list(featured.map((project) => project.title))
      }),
      visual: { projects: featured }
    },
    {
      id: SCENES.CAREER,
      line: t('aiCall.pitch.career', { first: jobs.at(-1).role, current: jobs[0].role }),
      visual: { jobs }
    },
    { id: SCENES.CTA, line: t('aiCall.pitch.cta'), visual: {} }
  ]

  return scenes.filter(Boolean).map((scene) => ({ ...scene, audio: pitchClipUrl(locale, scene.id) }))
}
