<template>
  <WidgetFrame>
    <div class="flex flex-col sm:flex-row sm:items-center gap-4">
      <div class="relative shrink-0">
        <img
          :src="profile.avatar"
          :alt="profile.name"
          class="h-20 w-20 rounded-2xl object-cover ring-2 ring-indigo-400/40"
          loading="lazy"
        />
        <span
          v-if="profile.openToWork"
          class="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-400 ring-4 ring-slate-900"
          aria-hidden="true"
        />
      </div>

      <div class="min-w-0 flex-1">
        <div class="flex flex-wrap items-center gap-2">
          <h3 class="text-lg font-bold text-white">{{ profile.name }}</h3>
          <span
            v-if="profile.openToWork"
            class="rounded-full bg-emerald-400/10 border border-emerald-400/30 px-2 py-0.5 text-xs font-semibold text-emerald-300"
          >
            {{ $t('aiAgent.widgets.openToWork') }}
          </span>
        </div>
        <p class="text-indigo-200 font-medium">{{ profile.role }}</p>
        <p class="text-sm text-slate-400">
          <i class="fas fa-location-dot mr-1" aria-hidden="true" />{{ profile.location }}
        </p>
      </div>

      <div class="flex gap-2">
        <SocialLinks :profile="profile" />
      </div>
    </div>
  </WidgetFrame>
</template>

<script setup>
import WidgetFrame from './WidgetFrame.vue'
import SocialLinks from './SocialLinks.vue'

defineProps({
  profile: { type: Object, required: true }
})
</script>
