<template>
  <div class="grid w-full grid-cols-2 gap-2.5">
    <div
      v-for="(group, index) in groups"
      :key="group.area"
      class="pop-in rounded-2xl border border-white/10 bg-white/5 p-3"
      :style="{ animationDelay: `${index * 120}ms` }"
    >
      <p class="mb-2 text-[11px] font-semibold uppercase tracking-wider text-teal-300">{{ group.title }}</p>
      <div class="flex flex-wrap gap-1">
        <TechChip v-for="item in group.items.slice(0, 4)" :key="item" :label="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import TechChip from '@/features/ai-agent/components/widgets/TechChip.vue'

defineProps({
  groups: { type: Array, required: true }
})
</script>

<style scoped>
.pop-in {
  animation: pop 0.45s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}
@keyframes pop {
  from {
    opacity: 0;
    transform: translateY(10px) scale(0.96);
  }
}
</style>
