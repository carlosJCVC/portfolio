<template>
  <div ref="scroller" class="h-full overflow-y-auto overscroll-contain" @scroll.passive="onScroll">
    <div ref="content" class="mx-auto w-full max-w-3xl space-y-6 px-4 py-6 sm:px-6" aria-live="polite">
      <ChatMessage
        v-for="(message, index) in messages"
        :key="message.id"
        :message="message"
        :is-last="index === messages.length - 1"
        :can-retry="index === messages.length - 1"
        @suggest="$emit('suggest', $event)"
        @retry="$emit('retry')"
      />
    </div>

    <Transition name="fade">
      <button
        v-if="showJumpButton && !stickToBottom"
        type="button"
        class="fixed bottom-36 left-1/2 z-10 -translate-x-1/2 rounded-full border border-white/10 bg-slate-800/90 px-3 py-1.5 text-xs text-slate-200 shadow-lg backdrop-blur hover:bg-slate-700"
        aria-label="Scroll to latest"
        @click="scrollToBottom('smooth')"
      >
        <i class="fas fa-arrow-down" aria-hidden="true" />
      </button>
    </Transition>
  </div>
</template>

<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import ChatMessage from './ChatMessage.vue'

defineProps({
  messages: { type: Array, required: true },
  showJumpButton: { type: Boolean, default: true }
})
defineEmits(['suggest', 'retry'])

const scroller = ref(null)
const content = ref(null)
const stickToBottom = ref(true)
const THRESHOLD_PX = 120

const scrollToBottom = (behavior = 'auto') => {
  scroller.value?.scrollTo({ top: scroller.value.scrollHeight, behavior })
}

const onScroll = () => {
  const el = scroller.value
  stickToBottom.value = el.scrollHeight - el.scrollTop - el.clientHeight < THRESHOLD_PX
}

let observer = null
onMounted(() => {
  scrollToBottom()
  observer = new ResizeObserver(() => stickToBottom.value && scrollToBottom())
  observer.observe(content.value)
})
onBeforeUnmount(() => observer?.disconnect())

defineExpose({
  scrollToBottom: () => {
    stickToBottom.value = true
    scrollToBottom('smooth')
  }
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
