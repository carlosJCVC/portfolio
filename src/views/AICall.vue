<template>
  <PhoneFrame>
    <IncomingCallScreen
      v-if="state === CALL_STATES.RINGING"
      :locale="locale"
      @answer="call.answer"
      @decline="call.decline"
      @toggle-locale="locale = locale === 'es' ? 'en' : 'es'"
    />

    <CallSummary
      v-else-if="state === CALL_STATES.ENDED || state === CALL_STATES.MISSED"
      :missed="state === CALL_STATES.MISSED"
      :duration="timer.formatted.value"
      @call-back="call.callBack()"
      @scan-job="openScanner"
    />

    <template v-else>
      <CallHeader :duration="timer.formatted.value" :status="statusLabel" :speaking="voice.speaking.value" />

      <template v-if="state === CALL_STATES.PITCH">
        <PitchStage
          :scene="call.currentScene.value"
          :current="call.sceneIndex.value"
          :total="scenes.length"
          @scan-job="openScanner"
          @ask="call.skipPitch"
        />
        <CallCaptions :text="call.caption.value" />
      </template>

      <template v-else>
        <div class="min-h-0 flex-1">
          <MessageList v-if="!chat.isEmpty.value" :show-jump-button="false" :messages="chat.messages.value" @suggest="handleSuggestion" @retry="chat.retry" />
          <div v-else class="flex h-full flex-col justify-center gap-6 px-6">
            <CallCaptions :text="call.caption.value" />
            <CtaScene @scan-job="openScanner" @ask="startListening" />
          </div>
        </div>
        <VoiceComposer
          :voice-supported="recognition.supported"
          :listening="recognition.listening.value"
          :transcript="recognition.transcript.value"
          :busy="chat.isRunning.value"
          @send="ask"
          @start-listening="startListening"
          @stop-listening="recognition.stop"
          @scan-job="openScanner"
        />
      </template>

      <CallControls
        :muted="voice.muted.value"
        :can-skip="state === CALL_STATES.PITCH"
        @toggle-mute="voice.setMuted(!voice.muted.value)"
        @skip="call.skipPitch"
        @scan-job="openScanner"
        @hang-up="hangUp"
      />
    </template>

    <JobScanSheet :open="scannerOpen" @close="scannerOpen = false" @analyze="analyzeJob" />
  </PhoneFrame>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { withVoicePrefix } from '@shared/ai/conversation'
import { useAgentChat } from '@/features/ai-agent/composables/useAgentChat'
import { useForcedDarkMode } from '@/features/ai-agent/composables/useForcedDarkMode'
import { createConversationStore } from '@/features/ai-agent/domain/conversationStore'
import { PROMPT_IDS } from '@/features/ai-agent/domain/suggestions'
import MessageList from '@/features/ai-agent/components/MessageList.vue'
import { buildPitch, pitchClipUrl } from '@/features/ai-call/domain/pitchScript'
import { CALL_STATES, useCallSession } from '@/features/ai-call/composables/useCallSession'
import { useCallVoice } from '@/features/ai-call/composables/useCallVoice'
import { useSpeechRecognition } from '@/features/ai-call/composables/useSpeechRecognition'
import { useCallTimer } from '@/features/ai-call/composables/useCallTimer'
import { useSpokenReplies } from '@/features/ai-call/composables/useSpokenReplies'
import PhoneFrame from '@/features/ai-call/components/PhoneFrame.vue'
import IncomingCallScreen from '@/features/ai-call/components/IncomingCallScreen.vue'
import CallHeader from '@/features/ai-call/components/CallHeader.vue'
import PitchStage from '@/features/ai-call/components/PitchStage.vue'
import CallCaptions from '@/features/ai-call/components/CallCaptions.vue'
import CallControls from '@/features/ai-call/components/CallControls.vue'
import VoiceComposer from '@/features/ai-call/components/VoiceComposer.vue'
import JobScanSheet from '@/features/ai-call/components/JobScanSheet.vue'
import CallSummary from '@/features/ai-call/components/CallSummary.vue'
import CtaScene from '@/features/ai-call/components/scenes/CtaScene.vue'

useForcedDarkMode()

const { t, locale } = useI18n()
if (navigator.language?.toLowerCase().startsWith('es')) locale.value = 'es'
const voice = useCallVoice()
const recognition = useSpeechRecognition()
const timer = useCallTimer()
const chat = useAgentChat({ store: createConversationStore({ storage: null }) })

const scenes = computed(() => buildPitch({ t, locale: locale.value }))
const call = useCallSession({ scenes, voice, timer, locale })
const state = computed(() => call.state.value)
const scannerOpen = ref(false)

useSpokenReplies({ messages: chat.messages, voice, locale, enabled: call.isLive })

watch(locale, (value) => voice.detectRecordings(pitchClipUrl(value, 'intro')), { immediate: true })

const statusLabel = computed(() => {
  if (recognition.listening.value) return t('aiCall.status.listening')
  if (chat.isRunning.value) return t('aiCall.status.thinking')
  if (voice.speaking.value) return t('aiCall.status.speaking')
  return t('aiCall.status.connected')
})

const ensureConversation = () => {
  if (state.value === CALL_STATES.PITCH) call.skipPitch()
  else if (!call.isLive.value) call.callBack({ skipIntro: true })
}

const ask = (question) => {
  ensureConversation()
  voice.stop()
  chat.send(withVoicePrefix(question), { display: question })
}

const startListening = async () => {
  ensureConversation()
  voice.stop()
  const question = await recognition.listen(locale.value)
  if (question) ask(question)
}

const openScanner = () => {
  if (state.value === CALL_STATES.PITCH) call.skipPitch()
  else voice.stop()
  scannerOpen.value = true
}

const analyzeJob = (text) => {
  scannerOpen.value = false
  ensureConversation()
  voice.stop()
  chat.send(withVoicePrefix(t('aiAgent.jobRequest', { text })), { kind: 'job', display: text })
}

const handleSuggestion = (id) => {
  if (id === PROMPT_IDS.JOB_FIT) openScanner()
  else ask(t(`aiAgent.prompts.${id}.prompt`))
}

const hangUp = () => {
  chat.stop()
  recognition.stop()
  call.hangUp()
}
</script>
