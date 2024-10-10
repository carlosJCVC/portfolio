<template>
  <h2 class="text-3xl font-bold mb-8 text-gray-800 dark:text-white">{{ $t('contact.title') }}</h2>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-for="field in formFields" :key="field.name" class="relative">
      <input
        v-if="field.type !== 'textarea'"
        @input="validateField(field.name)"
        :type="field.type"
        :id="field.name"
        v-model="form[field.name]"
        :placeholder="field.placeholder.value"
        :class="{ 'border-red-500': v$[field.name].$error }"
        class="w-full p-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-800 dark:text-white transition duration-300"
      />
      <textarea
        v-else
        :id="field.name"
        v-model="form[field.name]"
        @input="validateField(field.name)"
        :placeholder="field.placeholder.value"
        :class="{ 'border-red-500': v$[field.name].$error }"
        class="w-full p-4 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:border-indigo-500 dark:focus:border-indigo-400 text-gray-800 dark:text-white transition duration-300"
        rows="4"
      ></textarea>
      <label
        :for="field.name"
        class="absolute left-4 -top-3 text-sm font-medium text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 px-2 transition-all duration-300"
      >
        {{ field.label }}
      </label>
      <p v-if="v$[field.name].$error" class="mt-1 text-sm text-red-600">
        {{ v$[field.name].$errors[0].$message }}
      </p>
    </div>

    <div class="flex items-center">
      <input
        id="terms"
        type="checkbox"
        v-model="form.terms"
        class="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
      />
      <label for="terms" class="ml-2 block text-sm text-gray-700 dark:text-gray-300">
        {{ $t('contact.terms') }}
      </label>
    </div>
    <p v-if="v$.terms.$error" class="mt-1 text-sm text-red-600">
      {{ v$.terms.$errors[0].$message }}
    </p>

    <button
      type="submit"
      :disabled="v$.$invalid || isSubmitting"
      :class="{ 'opacity-50 cursor-not-allowed': v$.$invalid || isSubmitting }"
      class="w-full py-3 px-4 border border-transparent rounded-lg shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 transform hover:-translate-y-1"
    >
      <span v-if="isSubmitting" class="flex items-center justify-center">
        <svg
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        {{ $t('contact.sending') }}...
      </span>
      <span v-else> {{ $t('contact.send') }}</span>
    </button>
  </form>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import axios from 'axios'
import { useToast } from 'vue-toastification'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const toast = useToast()

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: '',
  terms: false
})

const formFields = computed(() => [
  {
    name: 'name',
    type: 'text',
    label: computed(() => t('contact.form.name.label')),
    placeholder: computed(() => t('contact.form.name.placeholder'))
  },
  {
    name: 'email',
    type: 'email',
    label: computed(() => t('contact.form.email.label')),
    placeholder: 'your.email@example.com'
  },
  {
    name: 'subject',
    type: 'text',
    label: computed(() => t('contact.form.subject.label')),
    placeholder: computed(() => t('contact.form.subject.placeholder'))
  },
  {
    name: 'message',
    type: 'textarea',
    label: computed(() => t('contact.form.message.label')),
    placeholder: computed(() => t('contact.form.message.placeholder'))
  }
])

const rules = {
  name: { required, minLength: minLength(3) },
  email: { required, email },
  subject: { required },
  message: { required, minLength: minLength(10) },
  terms: { required }
}

const v$ = useVuelidate(rules, form)

const isSubmitting = ref(false)
const showSuccessMessage = ref(false)
const showErrorMessage = ref(false)

const validateField = (fieldName) => {
  v$.value[fieldName].$touch()
}

const sendFormToFormspree = async (formData) => {
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xyzygzlb'

  try {
    const response = await axios.post(FORMSPREE_ENDPOINT, formData, {
      headers: {
        Accept: 'application/json'
      }
    })

    return response.data
  } catch (error) {
    console.error('Error sending form:', error)
    throw error
  }
}

const handleSubmit = async () => {
  const isFormCorrect = await v$.value.$validate()
  if (!isFormCorrect) return

  isSubmitting.value = true
  showSuccessMessage.value = false
  showErrorMessage.value = false

  try {
    await sendFormToFormspree(form)
    showSuccessMessage.value = true
    toast.success('Your message has been sent successfully!', {
      timeout: 5000
    })

    // Reset form
    Object.keys(form).forEach((key) => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
    v$.value.$reset()
  } catch (error) {
    console.error('Error submitting form:', error)
    showErrorMessage.value = true
    toast.error('There was an error sending your message. Please try again later.', {
      timeout: 5000
    })
  } finally {
    isSubmitting.value = false
  }
}
</script>

<style lang="scss" scoped></style>
