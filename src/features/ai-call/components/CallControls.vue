<template>
  <div class="flex items-start justify-center gap-6 px-6 pb-8 pt-3">
    <CallActionButton
      small
      :icon="muted ? 'fa-volume-xmark' : 'fa-volume-high'"
      :active="muted"
      :label="muted ? $t('aiCall.controls.unmute') : $t('aiCall.controls.mute')"
      @click="$emit('toggle-mute')"
    />
    <CallActionButton
      v-if="canSkip"
      small
      icon="fa-forward"
      :label="$t('aiCall.controls.skip')"
      @click="$emit('skip')"
    />
    <CallActionButton small icon="fa-camera" :label="$t('aiCall.controls.scan')" @click="$emit('scan-job')" />
    <CallActionButton small tone="danger" icon="fa-phone-slash" :label="$t('aiCall.controls.end')" @click="$emit('hang-up')" />
  </div>
</template>

<script setup>
import CallActionButton from './CallActionButton.vue'

defineProps({
  muted: { type: Boolean, default: false },
  canSkip: { type: Boolean, default: false }
})
defineEmits(['toggle-mute', 'skip', 'scan-job', 'hang-up'])
</script>
