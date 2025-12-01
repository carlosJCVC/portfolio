<template>
  <nav
    id="navbar"
    class="fixed w-full z-50 transition-all duration-300"
    :class="{
      'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg': scrolled,
      'bg-transparent': !scrolled
    }"
  >
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
              :class="[
                scrolled
                  ? 'text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary'
                  : 'text-white hover:text-indigo-200'
              ]"
            >
              {{ item.text }}
              <span
                class="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"
              ></span>
            </a>
          </div>
        </div>

        <div class="flex items-center gap-4">
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
          :class="[
            scrolled && !isDarkMode
              ? 'text-gray-700 hover:text-primary hover:bg-indigo-50'
              : 'text-white hover:text-primary hover:bg-gray-800'
          ]"
          @click="closeMobileMenu"
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
import LanguageSelector from './LanguageSelector.vue'
import { useThemeStore } from '@/store/useThemeStore'
const { theme } = useThemeStore()

const { t } = useI18n()

const scrolled = ref(false)
const mobileMenuOpen = ref(false)
const isDarkMode = ref(theme == 'dark' ? true : false)

const navItems = computed(() => [
  { href: '/', text: t('nav.home') },
  { href: '#about-me', text: t('nav.about') },
  { href: '#projects', text: t('nav.projects') },
  { href: '#skills', text: t('nav.skills') },
  { href: '#contact', text: t('nav.contact') }
])

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style lang="scss" scoped></style>
