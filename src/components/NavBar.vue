<template>
  <nav
    id="navbar"
    class="fixed w-full z-50 transition-all duration-300"
    :class="{
      'bg-white shadow-md': scrolled && !isDarkMode,
      'bg-gray-900 shadow-md': scrolled && isDarkMode,
      'bg-transparent': !isDarkMode
    }"
  >
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16 items-center">
        <a href="/" class="text-2xl font-bold gradient-text">CARLOS DEV</a>

        <div class="hidden md:block">
          <div class="ml-10 flex items-baseline space-x-4">
            <a
              v-for="item in navItems"
              :key="item.href"
              :href="item.href"
              class="nav-link px-3 py-2 rounded-md text-sm font-medium"
              :class="[
                scrolled && !isDarkMode
                  ? 'text-gray-800 hover:text-indigo-600'
                  : 'text-white hover:text-indigo-200'
              ]"
            >
              {{ item.text }}
            </a>
          </div>
        </div>

        <LanguageSelector></LanguageSelector>

        <div class="md:hidden">
          <button
            @click="toggleMobileMenu"
            type="button"
            class="hover:text-indigo-200 focus:outline-none focus:text-indigo-200"
            :class="[isDarkMode || !scrolled ? 'text-white' : 'text-gray-900']"
          >
            <svg
              class="h-6 w-6"
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

    <div class="md:hidden" :class="{ hidden: !mobileMenuOpen }" id="mobile-menu">
      <div
        class="px-2 pt-2 pb-3 space-y-1 sm:px-3"
        :class="[isDarkMode || scrolled ? 'bg-white' : 'bg-gray-900']"
      >
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="mobile-nav-link block px-3 py-2 rounded-md text-base font-medium"
          :class="[
            scrolled && !isDarkMode
              ? 'text-gray-700 hover:text-indigo-600 hover:bg-indigo-50'
              : 'text-white hover:text-indigo-200 hover:bg-gray-800'
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
