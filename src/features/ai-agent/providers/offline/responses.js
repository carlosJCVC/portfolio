import { TOOL_NAMES } from '@shared/ai/toolDefinitions'

const COPY = {
  en: {
    greeting:
      "Hi! I'm Carlos's portfolio agent. Ask me about his **projects**, **experience** or **skills**, or paste a **job description** and I'll analyze his fit.",
    unknown:
      "I'm not sure I understood. I can show Carlos's **projects** (try a technology, like *Laravel*), his **experience**, **skills**, **education**, or analyze a **job description**.",
    jobIntro: 'Let me compare this role against Carlos’s skills, experience and projects.',
    toolsIntro: 'Let me look that up.',
    [TOOL_NAMES.GET_PROFILE]: (r) =>
      `**${r.name}** is a ${r.role} based in ${r.location}${r.open_to_work ? ', currently **open to new opportunities**' : ''}.`,
    [TOOL_NAMES.SEARCH_PROJECTS]: (r) =>
      r.total_matches === 0
        ? "I couldn't find projects matching that. Try another technology or ask to see all projects."
        : `I found **${r.total_matches}** project${r.total_matches === 1 ? '' : 's'}. Click any card for screenshots and details.`,
    [TOOL_NAMES.GET_EXPERIENCE]: (r) =>
      `He has held **${r.positions.length}** positions, growing from Junior Backend Developer to **Senior Full Stack Developer**.`,
    [TOOL_NAMES.GET_SKILLS]: (r) =>
      `His stack spans **${r.skill_groups.length}** areas, from backend architecture to mobile.`,
    [TOOL_NAMES.GET_EDUCATION]: (r) =>
      `He holds a **${r.education[0]?.degree ?? 'degree'}** and **${r.certifications.length}** professional certifications.`,
    [TOOL_NAMES.SHOW_JOB_FIT_REPORT]: () =>
      'Here is the fit report. Missing items are usually quick to pick up given his breadth across stacks.',
    [TOOL_NAMES.SHOW_CONTACT_OPTIONS]: () => 'Here are the best ways to reach Carlos. A short note about the role is the best way to start.'
  },
  es: {
    greeting:
      '¡Hola! Soy el agente del portafolio de Carlos. Pregúntame por sus **proyectos**, **experiencia** o **habilidades**, o pega una **descripción de puesto** y analizo su encaje.',
    unknown:
      'No estoy seguro de haber entendido. Puedo mostrarte sus **proyectos** (prueba con una tecnología, como *Laravel*), su **experiencia**, **habilidades**, **formación**, o analizar una **oferta de trabajo**.',
    jobIntro: 'Voy a comparar este puesto con las habilidades, experiencia y proyectos de Carlos.',
    toolsIntro: 'Déjame buscarlo.',
    [TOOL_NAMES.GET_PROFILE]: (r) =>
      `**${r.name}** es ${r.role} en ${r.location}${r.open_to_work ? ' y actualmente está **abierto a nuevas oportunidades**' : ''}.`,
    [TOOL_NAMES.SEARCH_PROJECTS]: (r) =>
      r.total_matches === 0
        ? 'No encontré proyectos con ese criterio. Prueba otra tecnología o pide ver todos los proyectos.'
        : `Encontré **${r.total_matches}** proyecto${r.total_matches === 1 ? '' : 's'}. Haz clic en cualquiera para ver capturas y detalles.`,
    [TOOL_NAMES.GET_EXPERIENCE]: (r) =>
      `Ha ocupado **${r.positions.length}** puestos, creciendo de Junior Backend Developer a **Senior Full Stack Developer**.`,
    [TOOL_NAMES.GET_SKILLS]: (r) =>
      `Su stack cubre **${r.skill_groups.length}** áreas, desde arquitectura backend hasta mobile.`,
    [TOOL_NAMES.GET_EDUCATION]: (r) =>
      `Es **${r.education[0]?.degree ?? 'profesional'}** y tiene **${r.certifications.length}** certificaciones profesionales.`,
    [TOOL_NAMES.SHOW_JOB_FIT_REPORT]: () =>
      'Aquí está el reporte de encaje. Lo que falta suele aprenderlo rápido, dada su amplitud en distintos stacks.',
    [TOOL_NAMES.SHOW_CONTACT_OPTIONS]: () => 'Estas son las mejores formas de contactar a Carlos. Una nota breve sobre el puesto es el mejor punto de partida.'
  }
}

export const copyFor = (lang) => COPY[lang] ?? COPY.en
