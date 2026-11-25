<template>
  <div class="relative inline-flex items-center justify-center" :style="{ width: `${size}px`, height: `${size}px` }">
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" class="-rotate-90" aria-hidden="true">
      <defs>
        <linearGradient :id="gradientId" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" :stop-color="palette[0]" />
          <stop offset="100%" :stop-color="palette[1]" />
        </linearGradient>
      </defs>
      <circle :cx="center" :cy="center" :r="radius" fill="none" stroke="rgb(255 255 255 / 0.08)" :stroke-width="stroke" />
      <circle
        :cx="center"
        :cy="center"
        :r="radius"
        fill="none"
        :stroke="`url(#${gradientId})`"
        :stroke-width="stroke"
        stroke-linecap="round"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="offset"
        class="gauge-arc"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span class="text-3xl font-extrabold text-white tabular-nums">{{ displayed }}<span class="text-lg">%</span></span>
      <span class="text-[11px] uppercase tracking-widest text-slate-400">{{ label }}</span>
    </div>
    <span class="sr-only">{{ value }}% {{ label }}</span>
  </div>
</template>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'

const props = defineProps({
  value: { type: Number, required: true },
  label: { type: String, default: '' },
  size: { type: Number, default: 132 },
  stroke: { type: Number, default: 10 }
})

const gradientId = `gauge-${useId()}`
const center = computed(() => props.size / 2)
const radius = computed(() => (props.size - props.stroke) / 2)
const circumference = computed(() => 2 * Math.PI * radius.value)

const progress = ref(0)
const displayed = computed(() => Math.round(progress.value))
const offset = computed(() => circumference.value * (1 - progress.value / 100))

const palette = computed(() => {
  if (props.value >= 80) return ['#2dd4bf', '#22c55e']
  if (props.value >= 60) return ['#818cf8', '#2dd4bf']
  return ['#f59e0b', '#f97316']
})

let frame = null
onMounted(() => {
  const reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) {
    progress.value = props.value
    return
  }
  const duration = 1200
  const start = performance.now()
  const tick = (now) => {
    const t = Math.min(1, (now - start) / duration)
    progress.value = props.value * (1 - Math.pow(1 - t, 3))
    if (t < 1) frame = requestAnimationFrame(tick)
  }
  frame = requestAnimationFrame(tick)
})
onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>
