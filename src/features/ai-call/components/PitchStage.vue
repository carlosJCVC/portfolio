<template>
  <div class="flex flex-1 flex-col">
    <div class="flex flex-1 items-center justify-center px-6">
      <Transition name="scene" mode="out-in">
        <component :is="SCENE_COMPONENTS[scene.id]" :key="scene.id" v-bind="scene.visual" @scan-job="$emit('scan-job')" @ask="$emit('ask')" />
      </Transition>
    </div>
    <div class="flex justify-center gap-1.5 pb-4" aria-hidden="true">
      <span v-for="(item, index) in total" :key="item" :class="['h-1 rounded-full transition-all', index === current ? 'w-6 bg-white' : 'w-1.5 bg-white/30']" />
    </div>
  </div>
</template>

<script setup>
import { SCENES } from '../domain/pitchScript'
import ProfileScene from './scenes/ProfileScene.vue'
import FlagshipScene from './scenes/FlagshipScene.vue'
import StackScene from './scenes/StackScene.vue'
import ProjectsScene from './scenes/ProjectsScene.vue'
import CareerScene from './scenes/CareerScene.vue'
import CtaScene from './scenes/CtaScene.vue'

defineProps({
  scene: { type: Object, required: true },
  current: { type: Number, required: true },
  total: { type: Number, required: true }
})
defineEmits(['scan-job', 'ask'])

const SCENE_COMPONENTS = {
  [SCENES.INTRO]: ProfileScene,
  [SCENES.FLAGSHIP]: FlagshipScene,
  [SCENES.STACK]: StackScene,
  [SCENES.PROJECTS]: ProjectsScene,
  [SCENES.CAREER]: CareerScene,
  [SCENES.CTA]: CtaScene
}
</script>

<style scoped>
.scene-enter-active,
.scene-leave-active {
  transition: opacity 0.35s ease, transform 0.35s ease;
}
.scene-enter-from {
  opacity: 0;
  transform: scale(0.96);
}
.scene-leave-to {
  opacity: 0;
  transform: scale(1.02);
}
</style>
