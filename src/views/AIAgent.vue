<template>
  <div class="relative flex h-dvh flex-col overflow-hidden bg-slate-950 font-sans text-slate-200">
    <AuroraBackground />

    <ChatHeader
      class="relative z-10"
      :engine="chat.engine.value"
      :model-label="chat.modelLabel.value"
      :busy="chat.isRunning.value"
      :can-reset="!chat.isEmpty.value"
      @reset="chat.reset"
      @open-insights="insightsOpen = true"
    />

    <main class="relative z-0 min-h-0 flex-1">
      <div v-if="chat.isEmpty.value" class="h-full overflow-y-auto">
        <ChatWelcome @select="handlePrompt" />
      </div>
      <MessageList
        v-else
        ref="messageList"
        :messages="chat.messages.value"
        @suggest="handlePrompt"
        @retry="chat.retry"
      />
    </main>

    <footer class="relative z-10 px-3 pb-4 pt-2 sm:px-6">
      <div class="mx-auto max-w-3xl">
        <ChatComposer ref="composer" :busy="chat.isRunning.value" @send="handleSend" @stop="chat.stop" />
      </div>
    </footer>

    <UnderTheHoodPanel
      :open="insightsOpen"
      :engine="chat.engine.value"
      :model-label="chat.modelLabel.value"
      :stats="chat.stats"
      @close="insightsOpen = false"
    />
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAgentChat } from '@/features/ai-agent/composables/useAgentChat'
import { useForcedDarkMode } from '@/features/ai-agent/composables/useForcedDarkMode'
import { PROMPT_IDS } from '@/features/ai-agent/domain/suggestions'
import AuroraBackground from '@/features/ai-agent/components/AuroraBackground.vue'
import ChatHeader from '@/features/ai-agent/components/ChatHeader.vue'
import ChatWelcome from '@/features/ai-agent/components/ChatWelcome.vue'
import MessageList from '@/features/ai-agent/components/MessageList.vue'
import ChatComposer from '@/features/ai-agent/components/ChatComposer.vue'
import UnderTheHoodPanel from '@/features/ai-agent/components/UnderTheHoodPanel.vue'

const { t } = useI18n()
const chat = useAgentChat()

const composer = ref(null)
const messageList = ref(null)
const insightsOpen = ref(false)

const send = (prompt, options) => {
  chat.send(prompt, options)
  nextTick(() => messageList.value?.scrollToBottom())
}

const handlePrompt = (id) => {
  if (id === PROMPT_IDS.JOB_FIT) {
    composer.value?.openJobMode()
    return
  }
  send(t(`aiAgent.prompts.${id}.prompt`))
}

const handleSend = ({ text, kind }) => {
  if (kind === 'job') send(t('aiAgent.jobRequest', { text }), { kind, display: text })
  else send(text)
}

useForcedDarkMode()
onMounted(() => composer.value?.focus())
</script>
