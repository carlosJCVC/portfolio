<template>
  <nav
    id="navbar"
    class="fixed w-full z-50 transition-all duration-300"
    :class="{
      'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg': scrolled,
      'bg-transparent': !scrolled
    }"
  >
    <!-- Scroll Progress Bar -->
    <div
      class="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-primary to-secondary transition-all duration-100 ease-out"
      :style="{ width: scrollProgress + '%' }"
    ></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-20 items-center">
        <a href="/" class="text-3xl font-bold logo-gradient-text tracking-tight">CARLOS DEV</a>

        <div class="hidden md:block">
          <div class="ml-10 flex items-center space-x-8">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="nav-link text-sm font-medium transition-colors duration-300 relative group"
              :class="getDesktopNavLinkClass(item)"
              @click.prevent="scrollToSection(item.id)"
            >
              {{ item.text }}
              <span
                class="absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300"
                :class="activeSection === item.id ? 'w-full' : 'w-0 group-hover:w-full'"
              ></span>
            </a>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <!-- Theme Toggle -->
          <button
            @click="toggleTheme"
            class="p-2 rounded-full transition-colors duration-300 focus:outline-none"
            :class="
              scrolled
                ? 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                : 'text-white hover:bg-white/10'
            "
            :title="theme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'"
          >
            <i class="fas" :class="theme === 'light' ? 'fa-moon' : 'fa-sun'"></i>
          </button>

          <LanguageSelector></LanguageSelector>

          <div class="md:hidden">
            <button
              @click="toggleMobileMenu"
              type="button"
              class="hover:text-primary focus:outline-none transition-colors"
              :class="[isDarkMode || !scrolled ? 'text-white' : 'text-gray-900']"
            >
              <svg
                class="h-8 w-8"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div
      class="md:hidden transition-all duration-300 ease-in-out overflow-hidden"
      :class="[mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0']"
      id="mobile-menu"
    >
      <div
        class="px-4 pt-2 pb-4 space-y-2 backdrop-blur-xl"
        :class="[isDarkMode || scrolled ? 'bg-white/90 dark:bg-gray-900/90' : 'bg-gray-900/90']"
      >
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="mobile-nav-link block px-3 py-2 rounded-lg text-base font-medium transition-all"
          :class="getMobileNavLinkClass(item)"
          @click="handleMobileNavClick(item)"
        >
          {{ item.text }}
        </a>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import LanguageSelector from './LanguageSelector.vue'
import { useThemeStore } from '@/store/useThemeStore'

const themeStore = useThemeStore()
const { theme } = storeToRefs(themeStore)
const { toggleTheme } = themeStore

const { t } = useI18n()

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const isDarkMode = computed(() => theme.value === 'dark')
const activeSection = ref('home')
const scrollProgress = ref(0)

const navItems = computed(() => [
  { href: '#home', id: 'home', text: t('nav.home') },
  { href: '#about-me', id: 'about-me', text: t('nav.about') },
  { href: '#projects', id: 'projects', text: t('nav.projects') },
  { href: '#skills', id: 'skills', text: t('nav.skills') },
  { href: '#contact', id: 'contact', text: t('nav.contact') }
])

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  const scrollY = window.scrollY
  scrolled.value = scrollY > 50

  // Update Scroll Progress
  const winHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (scrollY / winHeight) * 100

  // Scroll Spy Logic
  const sections = navItems.value.map((item) => item.id)

  for (const sectionId of sections) {
    const element = document.getElementById(sectionId)
    if (element) {
      const rect = element.getBoundingClientRect()
      // Check if the section is roughly in the middle of the viewport
      if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
        activeSection.value = sectionId
      }
    }
  }
}

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
    activeSection.value = id
  }
}

const handleMobileNavClick = (item) => {
  scrollToSection(item.id)
  closeMobileMenu()
}

const getDesktopNavLinkClass = (item) => {
  if (activeSection.value === item.id) {
    return 'text-primary dark:text-primary'
  }
  if (scrolled.value) {
    return 'text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary'
  }
  return 'text-white hover:text-indigo-200'
}

const getMobileNavLinkClass = (item) => {
  if (activeSection.value === item.id) {
    return 'text-primary bg-primary/10'
  }
  if (scrolled.value && !isDarkMode.value) {
    return 'text-gray-700 hover:text-primary hover:bg-indigo-50'
  }
  return 'text-white hover:text-primary hover:bg-gray-800'
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped></style>
