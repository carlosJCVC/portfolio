<template>
  <div
    class="bg-white dark:bg-dark-card rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 h-full flex flex-col justify-center relative overflow-hidden"
  >
    <!-- Success View -->
    <transition
      enter-active-class="transition duration-500 ease-out"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition duration-300 ease-in"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="sent"
        class="absolute inset-0 z-20 bg-white dark:bg-dark-card flex flex-col items-center justify-center text-center p-8"
      >
        <div
          class="w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/20 flex items-center justify-center text-green-500 mb-6 animate-bounce"
        >
          <i class="fas fa-check text-3xl"></i>
        </div>
        <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">Message Sent!</h3>
        <p class="text-gray-500 dark:text-gray-400 mb-8 max-w-xs mx-auto">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          @click="resetForm"
          class="px-8 py-3 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          Send Another
        </button>
      </div>
    </transition>

    <!-- Form View -->
    <div class="mb-8 transition-opacity duration-300" :class="{ 'opacity-0': sent }">
      <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('contact.formTitle') || 'Send a Message' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Got a project? Drop me a line. I usually respond within 24 hours.
      </p>
    </div>

    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-6 transition-opacity duration-300"
      :class="{ 'opacity-0': sent }"
      ref="formRef"
    >
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name Input -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
            {{ $t('contact.name') || 'Your Name' }}
          </label>
          <input
            v-model="form.name"
            type="text"
            name="user_name"
            @blur="validateField('name')"
            @input="clearError('name')"
            class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400 hover:bg-white dark:hover:bg-dark-card"
            :class="errors.name ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700'"
            placeholder="John Doe"
          />
          <span v-if="errors.name" class="text-red-500 text-xs ml-1 mt-1 block">
            {{ errors.name }}
          </span>
        </div>

        <!-- Email Input -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
            {{ $t('contact.email') || 'Your Email' }}
          </label>
          <input
            v-model="form.email"
            type="email"
            name="user_email"
            @blur="validateField('email')"
            @input="clearError('email')"
            class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400 hover:bg-white dark:hover:bg-dark-card"
            :class="errors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700'"
            placeholder="john@example.com"
          />
          <span v-if="errors.email" class="text-red-500 text-xs ml-1 mt-1 block">
            {{ errors.email }}
          </span>
        </div>
      </div>

      <!-- Message Input -->
      <div class="group">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
          {{ $t('contact.message') || 'How can I help you?' }}
        </label>
        <textarea
          v-model="form.message"
          name="message"
          @blur="validateField('message')"
          @input="clearError('message')"
          class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none placeholder-gray-400 min-h-[150px] hover:bg-white dark:hover:bg-dark-card"
          :class="errors.message ? 'border-red-500 focus:border-red-500' : 'border-gray-200 dark:border-gray-700'"
          placeholder="Tell me about your project..."
        ></textarea>
        <span v-if="errors.message" class="text-red-500 text-xs ml-1 mt-1 block">
          {{ errors.message }}
        </span>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          type="submit"
          :disabled="isSending"
          class="px-8 py-3 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold shadow-lg hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          <span v-if="!isSending">{{ $t('contact.send') || 'Send Message' }}</span>
          <i v-if="!isSending" class="fas fa-paper-plane text-sm"></i>
          <span v-else class="flex items-center gap-2">
            <i class="fas fa-circle-notch fa-spin"></i>
            Sending...
          </span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useToast } from 'vue-toastification'
import emailjs from '@emailjs/browser'

const toast = useToast()
const isSending = ref(false)
const sent = ref(false)
const formRef = ref(null)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const errors = reactive({
  name: '',
  email: '',
  message: ''
})

// Validation Logic
const validateField = (field) => {
  if (field === 'name') {
    errors.name = form.name.trim() ? '' : 'Name is required'
  }
  if (field === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!form.email.trim()) {
      errors.email = 'Email is required'
    } else if (!emailRegex.test(form.email)) {
      errors.email = 'Please enter a valid email'
    } else {
      errors.email = ''
    }
  }
  if (field === 'message') {
    errors.message = form.message.trim() ? '' : 'Message is required'
  }
}

const clearError = (field) => {
  errors[field] = ''
}

const validateAll = () => {
  validateField('name')
  validateField('email')
  validateField('message')
  return !errors.name && !errors.email && !errors.message
}

const handleSubmit = async () => {
  if (!validateAll()) {
    toast.error('Please fix the errors before sending.')
    return
  }

  isSending.value = true

  try {
    // Replace these with your actual EmailJS credentials
    // You can get them from https://dashboard.emailjs.com/admin
    const SERVICE_ID = 'service_0slku7m'
    const TEMPLATE_ID = 'template_nugk5rq'
    const PUBLIC_KEY = 'EV9PLsB_yNSVnrQ79'

    // If credentials are not set, simulate success for demo purposes
    if (SERVICE_ID === 'YOUR_SERVICE_ID') {
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.warn('EmailJS credentials not set. Simulating success.')
    } else {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.value, PUBLIC_KEY)
    }

    sent.value = true
    toast.success('Message sent successfully!')
  } catch (error) {
    console.error('EmailJS Error:', error)
    toast.error('Failed to send message. Please try again.')
  } finally {
    isSending.value = false
  }
}

const resetForm = () => {
  sent.value = false
  form.name = ''
  form.email = ''
  form.message = ''
  errors.name = ''
  errors.email = ''
  errors.message = ''
}
</script>
