import { ToolInputError } from './inputValidation'

export const createToolRegistry = (tools, knowledgeBase) => {
  const byName = new Map(tools.map((tool) => [tool.name, tool]))

  const errorResult = (id, message) => ({
    toolResult: { type: 'tool_result', tool_use_id: id, is_error: true, content: message },
    view: null,
    error: message
  })

  return {
    has: (name) => byName.has(name),

    async execute({ id, name, input }) {
      const tool = byName.get(name)
      if (!tool) return errorResult(id, `Unknown tool "${name}".`)
      if (input && '__invalid_json' in input) {
        return errorResult(id, 'Invalid input: the arguments were not valid JSON. Send them again as a JSON object.')
      }

      try {
        const parsed = tool.parse(input ?? {})
        const { result, view } = await tool.execute(parsed, knowledgeBase)
        return {
          toolResult: { type: 'tool_result', tool_use_id: id, content: JSON.stringify(result) },
          view,
          error: null
        }
      } catch (error) {
        const message =
          error instanceof ToolInputError
            ? `Invalid input: ${error.message}. Fix the arguments and try again.`
            : 'The tool failed unexpectedly.'
        if (!(error instanceof ToolInputError)) console.error(`[ai-agent] tool ${name} failed`, error)
        return errorResult(id, message)
      }
    }
  }
}
