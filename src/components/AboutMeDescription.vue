<template>
  <div>
    <p
      class="text-xl leading-relaxed dark:text-gray-300 text-justify"
      v-html="sanitizedIntroduction"
    ></p>
    <!-- <p class="text-lg leading-relaxed dark:text-gray-300 text-justify">
            I specialize in JavaScript and modern frameworks like React and Vue.js, always striving to find the perfect
            balance between functionality and design. My approach? Build scalable, efficient, and user-centric
            applications that make a real difference.
        </p> -->
    <div class="flex flex-wrap gap-3 my-6">
      <span
        v-for="skill in skills"
        :key="skill"
        class="px-4 py-2 bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-200 rounded-full text-sm font-medium transition-transform hover:scale-110 cursor-pointer"
        @click="highlightSkill(skill)"
      >
        {{ skill }}
      </span>
    </div>
    <div class="flex flex-wrap gap-4 mt-8">
      <a href="javascript:void(0)" @click.prevent="downloadCV" class="btn-primary">
        <i class="fas fa-download mr-2"></i> {{ $t('info.download') }}
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
  'AWS'
]

const sanitizedIntroduction = computed(() => {
  const name = 'Carlos'
  const rawHtml = t('info.introduction', {
    name: `<span class='font-semibold text-indigo-600 dark:text-indigo-400'>${DOMPurify.sanitize(name)}</span>`
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
  //   toast.info(`Skill highlighted: ${skill}`);
  // You could add more interactive features here, like showing a modal with more info about the skill
}
</script>

<style scoped>
.btn-primary {
  @apply inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-md;
}

.btn-secondary {
  @apply inline-flex items-center px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-300 transform hover:scale-105 shadow-md;
}
</style>
