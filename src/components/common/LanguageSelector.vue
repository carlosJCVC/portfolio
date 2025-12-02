<template>
  <!-- <select v-model="$i18n.locale">
        <option v-for="locale in $i18n.availableLocales" :key="`locale-${locale}`" :value="locale">
            {{ locale }}
        </option>
    </select> -->
  <div class="relative inline-block text-left">
    <div>
      <button
        type="button"
        @click="isOpen = !isOpen"
        class="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        id="language-menu"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <span class="flex items-center">
          <span v-if="flags[$i18n.locale]" class="mr-2">{{ flags[$i18n.locale] }}</span>
          {{ languages[$i18n.locale] || $i18n.locale }}
        </span>
        <svg
          class="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </button>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <div
        v-if="isOpen"
        class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="language-menu"
      >
        <div class="py-1" role="none">
          <a
            v-for="locale in $i18n.availableLocales"
            :key="`locale-${locale}`"
            @click="changeLanguage(locale)"
            class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 cursor-pointer"
            role="menuitem"
          >
            <span v-if="flags[locale]" class="mr-2">{{ flags[locale] }}</span>
            {{ languages[locale] || locale }}
          </a>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const isOpen = ref(false)

const flags = {
  en: '🇺🇸',
  es: '🇪🇸',
  fr: '🇫🇷'
}

const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
}

const changeLanguage = (newLocale) => {
  locale.value = newLocale
  isOpen.value = false
}
</script>

<style lang="scss" scoped></style>
