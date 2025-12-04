import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

export function useTypewriter(options = {}) {
  const {
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseTime = 2000,
    translationKey = 'header.roles'
  } = options

  const { t, locale } = useI18n()
  const displayText = ref('')
  const currentRoleIndex = ref(0)
  const isDeleting = ref(false)
  let typewriterTimeout = null

  const roles = computed(() => {
    const rolesList = t(translationKey, { returnObjects: true })
    return Array.isArray(rolesList) ? rolesList : [t('header.role')]
  })

  const type = () => {
    const currentRole = roles.value[currentRoleIndex.value]

    if (isDeleting.value) {
      displayText.value = currentRole.substring(0, displayText.value.length - 1)
    } else {
      displayText.value = currentRole.substring(0, displayText.value.length + 1)
    }

    let typeSpeedVal = typingSpeed

    if (!isDeleting.value && displayText.value === currentRole) {
      typeSpeedVal = pauseTime
      isDeleting.value = true
    } else if (isDeleting.value && displayText.value === '') {
      isDeleting.value = false
      currentRoleIndex.value = (currentRoleIndex.value + 1) % roles.value.length
      typeSpeedVal = 500
    } else if (isDeleting.value) {
      typeSpeedVal = deletingSpeed
    }

    typewriterTimeout = setTimeout(type, typeSpeedVal)
  }

  const start = () => {
    type()
  }

  const stop = () => {
    clearTimeout(typewriterTimeout)
  }

  // Restart typewriter when locale changes
  watch(locale, () => {
    stop()
    displayText.value = ''
    isDeleting.value = false
    currentRoleIndex.value = 0
    start()
  })

  return {
    displayText,
    start,
    stop
  }
}
