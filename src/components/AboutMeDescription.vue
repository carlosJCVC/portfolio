<template>
  <div>
    <p
      class="text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify mb-8 font-light"
      v-html="sanitizedIntroduction"
    ></p>

    <div class="flex flex-wrap gap-3 my-8">
      <span
        v-for="skill in skills"
        :key="skill"
        class="px-4 py-2 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white cursor-default border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary"
        @click="highlightSkill(skill)"
      >
        {{ skill }}
      </span>
    </div>

    <div class="flex flex-wrap gap-4 mt-10">
      <a href="javascript:void(0)" @click.prevent="downloadCV" class="btn-primary group">
        <i class="fas fa-download mr-2 group-hover:animate-bounce"></i> {{ $t('info.download') }}
      </a>
      <a href="#projects" class="btn-secondary">
        <i class="fas fa-project-diagram mr-2"></i> {{ $t('info.view_projects') }}
      </a>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import DOMPurify from 'dompurify'

const { t } = useI18n()
import cv from '@/assets/Carlos_Veizaga_Resume.pdf'
const skills = [
  'JavaScript',
  'Vue.js',
  'Angular',
  'React',
  'PHP',
  'Laravel',
  'CodeIgniter',
  'WordPress',
  'Node.js',
  'Python',
  'Flutter',
  'MySQL',
  'SQL',
  'MongoDB',
  'AWS',
  'n8n',
  'React Native'
]

const sanitizedIntroduction = computed(() => {
  const name = 'Carlos'
  const rawHtml = t('info.introduction', {
    name: `<span class='font-semibold text-primary'>${DOMPurify.sanitize(name)}</span>`
  })

  return DOMPurify.sanitize(rawHtml, { ALLOWED_TAGS: ['span'], ALLOWED_ATTR: ['class'] })
})

const downloadCV = () => {
  console.log('Downloading CV...')
  const link = document.createElement('a')
  link.href = cv
  link.download = 'carlos-veizaga-cv.pdf'
  link.click()
}

const highlightSkill = (skill) => {
  console.log(skill)
}
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center px-8 py-3 bg-primary text-white rounded-full font-semibold hover:bg-secondary transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-primary/30;
}

.btn-secondary {
  @apply inline-flex items-center px-8 py-3 bg-white dark:bg-dark-card text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700 rounded-full font-semibold hover:border-primary dark:hover:border-primary hover:text-primary dark:hover:text-primary transition-all duration-300 transform hover:-translate-y-1 shadow-md;
}
</style>
