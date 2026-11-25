import { TOOL_NAMES } from '@shared/ai/toolDefinitions'
import { stripVoicePrefix } from '@shared/ai/conversation'
import { knowledgeBase } from '../../domain/knowledgeBase'
import { detectIntent } from './intents'
import { detectLanguage } from './language'
import { analyzeJobFit } from './jobMatcher'
import { extractTechnologies } from './technologyExtractor'
import { copyFor } from './responses'

const sleep = (ms, signal) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(resolve, ms)
    signal?.addEventListener('abort', () => {
      clearTimeout(timer)
      reject(new DOMException('Aborted', 'AbortError'))
    })
  })

const textOf = (message) =>
  typeof message.content === 'string'
    ? stripVoicePrefix(message.content)
    : message.content
        .filter((block) => block.type === 'text')
        .map((block) => block.text)
        .join('\n')

const lastVisitorText = (messages) => {
  for (let i = messages.length - 1; i >= 0; i--) {
    const text = messages[i].role === 'user' ? textOf(messages[i]) : ''
    if (text) return text
  }
  return ''
}

const stripInstruction = (text) => {
  const [first, ...rest] = text.split(/\n{2,}/)
  return rest.length && first.trim().endsWith(':') ? rest.join('\n\n') : text
}

let idCounter = 0
const toolUse = (name, input = {}) => ({ type: 'tool_use', id: `local_${Date.now()}_${idCounter++}`, name, input })

export const createLocalProvider = ({ kb = knowledgeBase, typingDelayMs = 14 } = {}) => {
  async function* typeOut(text, signal) {
    for (const chunk of text.match(/\S+\s*/g) ?? []) {
      await sleep(typingDelayMs, signal)
      yield { type: 'text', delta: chunk }
    }
  }

  async function* finish(text, signal) {
    yield* typeOut(text, signal)
    yield { type: 'done', stopReason: 'end_turn', content: [{ type: 'text', text }] }
  }

  async function* callTools(intro, calls, signal) {
    yield* typeOut(intro, signal)
    for (const call of calls) yield { type: 'tool_start', id: call.id, name: call.name }
    yield { type: 'done', stopReason: 'tool_use', content: [{ type: 'text', text: intro }, ...calls] }
  }

  const planToolCalls = (tools, text) =>
    tools.map((name) => {
      if (name !== TOOL_NAMES.SEARCH_PROJECTS) return toolUse(name)
      const mentionedProject = kb.searchProjects({ limit: 100 }).items.find((project) => text.toLowerCase().includes(project.title.toLowerCase()))
      if (mentionedProject) return toolUse(name, { query: mentionedProject.title })
      const [technology] = extractTechnologies(text, kb.allTechnologies())
      return toolUse(name, technology ? { technology } : {})
    })

  const summarizeResults = (messages, copy) => {
    const results = messages.at(-1).content
    const calls = messages.at(-2).content.filter((block) => block.type === 'tool_use')
    return calls
      .map((call) => {
        const result = results.find((r) => r.tool_use_id === call.id)
        if (!result || result.is_error) return null
        return copy[call.name]?.(JSON.parse(result.content))
      })
      .filter(Boolean)
      .join(' ')
  }

  return {
    id: 'local',

    async *stream({ messages, signal }) {
      const visitorText = lastVisitorText(messages)
      const posting = stripInstruction(visitorText)
      const lang = detectLanguage(posting)
      const copy = copyFor(lang)
      const last = messages.at(-1)

      if (Array.isArray(last.content) && last.content.some((block) => block.type === 'tool_result')) {
        yield* finish(summarizeResults(messages, copy) || copy.unknown, signal)
        return
      }

      const intent = detectIntent(visitorText)
      if (intent.kind === 'job_fit') {
        const report = analyzeJobFit(posting, kb, lang)
        yield* callTools(copy.jobIntro, [toolUse(TOOL_NAMES.SHOW_JOB_FIT_REPORT, report)], signal)
      } else if (intent.kind === 'tools') {
        yield* callTools(copy.toolsIntro, planToolCalls(intent.tools, visitorText), signal)
      } else {
        yield* finish(intent.kind === 'greeting' ? copy.greeting : copy.unknown, signal)
      }
    }
  }
}
