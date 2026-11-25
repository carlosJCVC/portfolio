<template>
  <div v-if="message.role === 'user'" class="flex justify-end">
    <div class="user-bubble">
      <span v-if="message.kind === 'job'" class="mb-1.5 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-200">
        <i class="fas fa-file-lines" aria-hidden="true" />{{ $t('aiAgent.jobBadge') }}
      </span>
      <p :class="['whitespace-pre-wrap break-words', { 'line-clamp-4': message.kind === 'job' }]">{{ message.text }}</p>
    </div>
  </div>

  <div v-else class="flex gap-3">
    <AgentAvatar :active="message.status === 'streaming'" class="mt-1" />
    <div class="min-w-0 flex-1 space-y-3">
      <template v-for="(part, index) in message.parts" :key="part.type === 'tool' ? part.id : `t${index}`">
        <MarkdownText v-if="part.type === 'text' && part.text.trim()" :text="part.text" />
        <div v-else-if="part.type === 'tool'" class="space-y-3">
          <ToolCallStep :part="part" />
          <component
            :is="widgetFor(part.name).component"
            v-if="part.status === 'done' && part.view && widgetFor(part.name).component"
            v-bind="part.view"
          />
        </div>
      </template>

      <TypingDots v-if="showTyping" />

      <p v-if="message.status === 'stopped'" class="text-xs text-slate-500">
        <i class="fas fa-circle-stop mr-1" aria-hidden="true" />{{ $t('aiAgent.message.stopped') }}
      </p>
      <div
        v-if="message.status === 'error'"
        class="flex flex-wrap items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 px-3 py-2 text-sm text-rose-200"
        role="alert"
      >
        <i class="fas fa-circle-exclamation" aria-hidden="true" />
        <span class="flex-1">{{ message.error }}</span>
        <button v-if="canRetry" type="button" class="font-semibold underline underline-offset-2" @click="$emit('retry')">
          {{ $t('aiAgent.message.retry') }}
        </button>
      </div>

      <SuggestionChips
        v-if="isLast && message.status !== 'streaming' && message.suggestions?.length"
        :ids="message.suggestions"
        class="pt-1"
        @select="$emit('suggest', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import AgentAvatar from './AgentAvatar.vue'
import MarkdownText from './MarkdownText.vue'
import ToolCallStep from './ToolCallStep.vue'
import TypingDots from './TypingDots.vue'
import SuggestionChips from './SuggestionChips.vue'
import { widgetFor } from './widgets/widgetRegistry'

const props = defineProps({
  message: { type: Object, required: true },
  isLast: { type: Boolean, default: false },
  canRetry: { type: Boolean, default: false }
})

defineEmits(['suggest', 'retry'])

const showTyping = computed(() => {
  if (props.message.status !== 'streaming') return false
  const last = props.message.parts.at(-1)
  return !last || (last.type === 'tool' && last.status !== 'running')
})
</script>

<style scoped>
.user-bubble {
  @apply max-w-[85%] sm:max-w-[75%] rounded-2xl rounded-br-md bg-gradient-to-br from-indigo-500 to-indigo-600 px-4 py-2.5 text-[15px] text-white shadow-lg shadow-indigo-900/30;
}
</style>
