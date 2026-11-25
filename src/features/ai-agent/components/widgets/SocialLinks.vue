<template>
  <div class="flex flex-wrap gap-2">
    <a
      v-for="link in links"
      :key="link.label"
      :href="link.href"
      :download="link.download"
      :target="link.download ? undefined : '_blank'"
      rel="noopener noreferrer"
      :aria-label="link.label"
      :title="link.label"
      class="social-link"
    >
      <i :class="link.icon" aria-hidden="true" />
      <span v-if="showLabels" class="text-sm">{{ link.label }}</span>
    </a>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  profile: { type: Object, required: true },
  showLabels: { type: Boolean, default: false }
})

const { t } = useI18n()

const links = computed(() =>
  [
    props.profile.social.linkedin && { label: 'LinkedIn', href: props.profile.social.linkedin, icon: 'fab fa-linkedin-in' },
    props.profile.social.github && { label: 'GitHub', href: props.profile.social.github, icon: 'fab fa-github' },
    props.profile.resume?.url && {
      label: t('aiAgent.widgets.downloadCv'),
      href: props.profile.resume.url,
      icon: 'fas fa-file-arrow-down',
      download: props.profile.resume.filename
    }
  ].filter(Boolean)
)
</script>

<style scoped>
.social-link {
  @apply inline-flex items-center gap-2 h-10 min-w-10 justify-center rounded-xl border border-white/10 bg-white/5 px-3 text-slate-200 transition hover:border-indigo-400/50 hover:bg-indigo-500/15 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
</style>
