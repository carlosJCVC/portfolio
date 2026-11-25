<template>
  <div class="markdown-text" v-html="html" />
</template>

<script setup>
import { computed } from 'vue'
import { renderMarkdown } from '../utils/markdown'

const props = defineProps({
  text: { type: String, required: true }
})

const html = computed(() => renderMarkdown(props.text))
</script>

<style scoped>
.markdown-text {
  @apply text-[15px] leading-relaxed text-slate-200 space-y-3 break-words;
}
.markdown-text :deep(strong) {
  @apply font-semibold text-white;
}
.markdown-text :deep(em) {
  @apply text-indigo-200;
}
.markdown-text :deep(code) {
  @apply px-1.5 py-0.5 rounded-md bg-white/10 text-teal-300 text-[13px];
}
.markdown-text :deep(a) {
  @apply text-teal-300 underline decoration-teal-300/40 underline-offset-2 hover:decoration-teal-300;
}
.markdown-text :deep(ul),
.markdown-text :deep(ol) {
  @apply space-y-1.5 pl-5;
}
.markdown-text :deep(ul) {
  @apply list-disc marker:text-indigo-400;
}
.markdown-text :deep(ol) {
  @apply list-decimal marker:text-indigo-400;
}
</style>
