<template>
  <div
    class="bg-white dark:bg-dark-card rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-800 h-full flex flex-col justify-center"
  >
    <div class="mb-8">
      <h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ $t('contact.formTitle') || 'Send a Message' }}
      </h3>
      <p class="text-gray-500 dark:text-gray-400">
        Got a project? Drop me a line. I usually respond within 24 hours.
      </p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex flex-col gap-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name Input -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
            {{ $t('contact.name') || 'Your Name' }}
          </label>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400 hover:bg-white dark:hover:bg-dark-card"
            placeholder="John Doe"
            required
          />
        </div>

        <!-- Email Input -->
        <div class="group">
          <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
            {{ $t('contact.email') || 'Your Email' }}
          </label>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400 hover:bg-white dark:hover:bg-dark-card"
            placeholder="john@example.com"
            required
          />
        </div>
      </div>

      <!-- Message Input -->
      <div class="group">
        <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 ml-1">
          {{ $t('contact.message') || 'How can I help you?' }}
        </label>
        <textarea
          v-model="form.message"
          class="w-full px-5 py-4 rounded-2xl bg-gray-100 dark:bg-dark-bg/50 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none placeholder-gray-400 min-h-[150px] hover:bg-white dark:hover:bg-dark-card"
          placeholder="Tell me about your project..."
          required
        ></textarea>
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

const toast = useToast()
const isSending = ref(false)

const form = reactive({
  name: '',
  email: '',
  message: ''
})

const handleSubmit = async () => {
  isSending.value = true

  // Simulate API call
  await new Promise((resolve) => setTimeout(resolve, 1500))

  isSending.value = false
  toast.success('Message sent successfully!')

  // Reset form
  form.name = ''
  form.email = ''
  form.message = ''
}
</script>
