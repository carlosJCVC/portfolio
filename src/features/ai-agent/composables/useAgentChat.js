import { computed, reactive, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { runAgentTurn, consistentLength } from '../domain/agentRunner'
import { createToolRegistry } from '../domain/toolRegistry'
import { knowledgeBase } from '../domain/knowledgeBase'
import { portfolioTools } from '../domain/tools'
import { suggestFollowUps } from '../domain/suggestions'
import { createConversationStore } from '../domain/conversationStore'
import { createAssistantMessage, createToolPart, createUserMessage, toolNamesOf } from '../domain/chatMessages'
import { createRemoteProvider } from '../providers/remoteProvider'
import { createResilientProvider } from '../providers/resilientProvider'
import { createLocalProvider } from '../providers/offline/localProvider'
import { ProviderError } from '../providers/providerError'

const isAbort = (error) => error?.name === 'AbortError'

const restoreMessages = (saved = []) =>
  saved.map((message) => {
    if (message.status !== 'streaming') return message
    const parts = message.parts.map((part) => (part.status === 'running' ? { ...part, status: 'error' } : part))
    return { ...message, parts, status: 'stopped' }
  })

export function useAgentChat({
  registry = createToolRegistry(portfolioTools, knowledgeBase),
  store = createConversationStore(),
  remote = createRemoteProvider(),
  local = createLocalProvider()
} = {}) {
  const { t } = useI18n()
  const saved = store.load()

  const messages = ref(restoreMessages(saved?.messages))
  const engine = ref(saved?.engine ?? 'remote')
  const modelLabel = ref(saved?.modelLabel ?? '')
  const status = ref('idle')
  const stats = reactive({ steps: 0, toolCalls: 0 })
  let transcript = saved?.transcript ?? []
  let abortController = null

  const provider = createResilientProvider({
    primary: remote,
    fallback: local,
    startOnFallback: engine.value === 'local',
    onSwitch: ({ to }) => (engine.value = to)
  })

  const isRunning = computed(() => status.value === 'running')
  const isEmpty = computed(() => messages.value.length === 0)

  const persist = () =>
    store.save({ transcript, messages: messages.value, engine: engine.value, modelLabel: modelLabel.value })
  watch([engine, modelLabel], persist)

  const errorMessageFor = (error) => {
    if (error instanceof ProviderError && error.code === 'rate_limited') return t('aiAgent.errors.rateLimited')
    if (error instanceof ProviderError && error.code === 'busy') return t('aiAgent.errors.busy')
    if (error instanceof ProviderError && error.code === 'bad_request') return t('aiAgent.errors.badRequest')
    return t('aiAgent.errors.generic')
  }

  const createHooks = (message) => {
    let stepStart = 0
    const toolPart = (id) => message.parts.find((part) => part.type === 'tool' && part.id === id)

    return {
      onMeta({ model }) {
        if (model) modelLabel.value = model
      },
      onStepStart() {
        stepStart = message.parts.length
        stats.steps++
      },
      onText(delta) {
        const last = message.parts.at(-1)
        if (last?.type === 'text') last.text += delta
        else message.parts.push({ type: 'text', text: delta })
      },
      onToolStart({ id, name }) {
        if (!toolPart(id)) message.parts.push(createToolPart({ id, name }))
      },
      onStepComplete({ content }) {
        if (content.some((block) => block.type === 'fallback')) {
          const tools = message.parts.slice(stepStart).filter((part) => part.type === 'tool')
          const texts = content.filter((b) => b.type === 'text').map((b) => ({ type: 'text', text: b.text }))
          message.parts.splice(stepStart, Infinity, ...texts, ...tools)
        }
      },
      onToolCall({ id, name, input }) {
        const part = toolPart(id) ?? message.parts[message.parts.push(createToolPart({ id, name })) - 1]
        part.input = input
      },
      onToolResult({ id, view, error, durationMs }) {
        const part = toolPart(id)
        if (!part) return
        Object.assign(part, { status: error ? 'error' : 'done', view, error, durationMs })
        stats.toolCalls++
      },
      onRefusal() {
        message.parts.push({ type: 'text', text: t('aiAgent.errors.refusal') })
      }
    }
  }

  async function send(text, { kind = 'text', display } = {}) {
    const content = text.trim()
    if (!content || isRunning.value) return

    messages.value.push(createUserMessage(display ?? content, { kind, prompt: content }))
    messages.value.push(createAssistantMessage())
    const message = messages.value.at(-1)

    const baseLength = transcript.length
    const working = [...transcript, { role: 'user', content }]
    abortController = new AbortController()
    status.value = 'running'

    try {
      await runAgentTurn({
        provider,
        registry,
        transcript: working,
        signal: abortController.signal,
        hooks: createHooks(message)
      })
      message.status = 'done'
    } catch (error) {
      if (isAbort(error)) {
        message.status = 'stopped'
      } else {
        console.error('[ai-agent]', error)
        message.status = 'error'
        message.error = errorMessageFor(error)
      }
    } finally {
      message.parts
        .filter((part) => part.type === 'tool' && part.status === 'running')
        .forEach((part) => (part.status = 'error'))
      message.suggestions = suggestFollowUps(toolNamesOf(message))
      transcript = working.slice(0, consistentLength(working, baseLength))
      status.value = 'idle'
      abortController = null
      persist()
    }
  }

  function retry() {
    const [user, assistant] = messages.value.slice(-2)
    if (isRunning.value || user?.role !== 'user' || assistant?.status !== 'error') return
    messages.value.splice(-2, 2)
    send(user.prompt, { kind: user.kind, display: user.text })
  }

  function stop() {
    abortController?.abort()
  }

  function reset() {
    stop()
    transcript = []
    messages.value = []
    stats.steps = 0
    stats.toolCalls = 0
    store.clear()
  }

  return { messages, engine, modelLabel, stats, isRunning, isEmpty, send, retry, stop, reset }
}
