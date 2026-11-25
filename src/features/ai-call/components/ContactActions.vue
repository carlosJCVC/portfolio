<template>
  <div class="grid grid-cols-2 gap-2.5">
    <button type="button" class="contact contact--primary col-span-2" @click="saveContact">
      <i class="fas fa-address-card" aria-hidden="true" />{{ $t('aiCall.contact.save') }}
    </button>
    <a :href="`mailto:${profile.email}`" class="contact"><i class="fas fa-envelope" aria-hidden="true" />{{ $t('aiCall.contact.email') }}</a>
    <a :href="profile.social.linkedin" target="_blank" rel="noopener noreferrer" class="contact">
      <i class="fab fa-linkedin-in" aria-hidden="true" />LinkedIn
    </a>
    <a :href="profile.resume.url" :download="profile.resume.filename" class="contact">
      <i class="fas fa-file-arrow-down" aria-hidden="true" />{{ $t('aiAgent.widgets.downloadCv') }}
    </a>
    <button type="button" class="contact" @click="share">
      <i class="fas fa-share-nodes" aria-hidden="true" />{{ $t('aiCall.contact.share') }}
    </button>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import { useToast } from 'vue-toastification'
import { profile } from '@/data/profile'
import { downloadVCard } from '../domain/vCard'

const { t } = useI18n()
const toast = useToast()
const websiteUrl = () => window.location.origin

const saveContact = () => downloadVCard({ profile, websiteUrl: websiteUrl() })

const share = async () => {
  const data = { title: profile.name, text: t('aiCall.contact.shareText', { name: profile.name }), url: websiteUrl() }
  if (navigator.share) {
    await navigator.share(data).catch(() => null)
    return
  }
  await navigator.clipboard?.writeText(data.url)
  toast.success(t('aiCall.contact.linkCopied'), { timeout: 2000 })
}
</script>

<style scoped>
.contact {
  @apply flex items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3 py-3.5 text-sm font-medium transition active:scale-[0.98] hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-300;
}
.contact--primary {
  @apply border-transparent bg-white text-slate-900 hover:bg-white/90;
}
</style>
