<template>
  <div
    class="h-full bg-black text-green-400 font-mono p-4 text-sm overflow-auto"
    @click="focusInput"
  >
    <div v-for="(line, i) in history" :key="i" class="mb-1">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white">{{
        line.path || '~'
      }}</span
      >$ {{ line.cmd }}
      <div
        v-if="line.output"
        class="text-gray-300 whitespace-pre-wrap mt-1"
        v-html="line.output"
      ></div>
    </div>

    <div class="flex items-center">
      <span class="text-blue-400 font-bold">visitor@carlos-dev</span>:<span class="text-white">{{
        currentPathString
      }}</span
      >$&nbsp;
      <input
        ref="inputRef"
        v-model="currentCmd"
        @keydown.enter="execute"
        type="text"
        class="bg-transparent border-none outline-none text-green-400 flex-grow"
        autofocus
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useTerminal } from '@/composables/useTerminal'

const props = defineProps({
  initialCommand: String
})

const inputRef = ref(null)

const {
  history,
  currentCmd,
  currentPathString,
  execute: executeCommand
} = useTerminal()

const execute = async () => {
  await executeCommand()
  await nextTick()
  if (inputRef.value) inputRef.value.scrollIntoView()
}

const focusInput = () => {
  inputRef.value?.focus()
}

onMounted(() => {
  focusInput()
  if (props.initialCommand) {
    currentCmd.value = props.initialCommand
    execute()
  }
})
</script>
