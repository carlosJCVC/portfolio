<template>
  <div>
    <p
      class="text-xl leading-relaxed text-gray-700 dark:text-gray-300 text-justify mb-8 font-light"
      v-html="sanitizedIntroduction"
    ></p>

    <div class="space-y-6 my-8">
      <div v-for="category in skillCategories" :key="category.name">
        <h3
          class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3 flex items-center gap-2"
        >
          <i :class="category.icon"></i> {{ category.name }}
        </h3>
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(skill, index) in category.skills"
            :key="skill"
            class="px-3 py-1.5 bg-gray-100 dark:bg-dark-card text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-all duration-300 hover:bg-primary hover:text-white dark:hover:bg-primary dark:hover:text-white cursor-default border border-gray-200 dark:border-gray-700 hover:border-primary dark:hover:border-primary hover:scale-105 transform"
            @click="highlightSkill(skill)"
            data-aos="zoom-in"
            :data-aos-delay="index * 50"
          >
            {{ skill }}
          </span>
        </div>
      </div>
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

const skillCategories = [
  {
    name: 'Backend & Architecture',
    icon: 'fas fa-server',
    skills: ['Laravel', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'AWS', 'Docker', 'Redis']
  },
  {
    name: 'Frontend & UI',
    icon: 'fas fa-laptop-code',
    skills: ['Vue.js', 'React', 'Angular', 'Tailwind CSS', 'Bootstrap', 'Sass', 'TypeScript']
  },
  {
    name: 'Mobile Development',
    icon: 'fas fa-mobile-alt',
    skills: ['React Native', 'Flutter', 'Expo', 'Android', 'iOS']
  },
  {
    name: 'Tools & DevOps',
    icon: 'fas fa-tools',
    skills: ['Git', 'n8n', 'Linux', 'Agile/Scrum', 'CI/CD', 'Webpack']
  }
]

const sanitizedIntroduction = computed(() => {
  const name = 'Carlos'
  const rawHtml = t('info.introduction', {
    name: `<span class='font-semibold text-primary'>${DOMPurify.sanitize(name)}</span>`
  })

  return DOMPurify.sanitize(rawHtml, {
    ALLOWED_TAGS: ['span', 'b', 'strong'],
    ALLOWED_ATTR: ['class']
  })
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
