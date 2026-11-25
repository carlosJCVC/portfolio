<template>
  <WidgetFrame>
    <div class="contact-glow" aria-hidden="true" />
    <div class="relative flex flex-col gap-4">
      <div class="flex items-center gap-3">
        <img :src="profile.avatar" :alt="profile.name" class="h-12 w-12 rounded-xl object-cover" loading="lazy" />
        <div>
          <p class="text-xs font-semibold uppercase tracking-wider text-teal-300">{{ $t('aiAgent.widgets.contact') }}</p>
          <p class="font-semibold text-white">{{ headline || $t('aiAgent.widgets.contactHeadline') }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row gap-2">
        <a :href="`mailto:${profile.email}`" class="btn-primary">
          <i class="fas fa-paper-plane" aria-hidden="true" />{{ $t('aiAgent.widgets.sendEmail') }}
        </a>
        <button type="button" class="btn-secondary" @click="copyEmail">
          <i :class="['fas', copied ? 'fa-check text-emerald-400' : 'fa-copy']" aria-hidden="true" />
          {{ profile.email }}
        </button>
      </div>

      <SocialLinks :profile="profile" show-labels />
    </div>
  </WidgetFrame>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import WidgetFrame from './WidgetFrame.vue'
import SocialLinks from './SocialLinks.vue'

const props = defineProps({
  profile: { type: Object, required: true },
  headline: { type: String, default: '' }
})

const { t } = useI18n()
const toast = useToast()
const copied = ref(false)

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(props.profile.email)
    copied.value = true
    toast.success(t('aiAgent.widgets.emailCopied'), { timeout: 2000 })
    setTimeout(() => (copied.value = false), 2000)
  } catch {
    window.location.href = `mailto:${props.profile.email}`
  }
}
</script>

<style scoped>
.contact-glow {
  @apply pointer-events-none absolute inset-0 rounded-2xl opacity-60;
  background: radial-gradient(circle at 0% 0%, rgb(45 212 191 / 0.18), transparent 55%),
    radial-gradient(circle at 100% 100%, rgb(99 102 241 / 0.2), transparent 55%);
}
.btn-primary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.btn-secondary {
  @apply inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-slate-200 transition hover:bg-white/10 truncate focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400;
}
</style>
