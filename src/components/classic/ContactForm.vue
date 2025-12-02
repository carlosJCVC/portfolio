<template>
  <div
    class="col-span-1 md:col-span-2 row-span-2 bg-white dark:bg-dark-card rounded-3xl p-6 md:p-8 shadow-xl border border-gray-100 dark:border-gray-800 flex flex-col h-full relative overflow-hidden group"
  >
    <!-- Background Glow -->
    <div
      class="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none group-hover:bg-primary/10 transition-colors duration-500"
    ></div>

    <div class="relative z-10 mb-6">
      <div class="flex items-center gap-3 mb-2">
        <div
          class="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary"
        >
          <i class="fas fa-paper-plane"></i>
        </div>
        <h3 class="text-2xl font-bold text-gray-900 dark:text-white">
          {{ $t('contact.formTitle') || 'Send a Message' }}
        </h3>
      </div>
      <p class="text-sm text-gray-500 dark:text-gray-400 ml-13">Got a project? Drop me a line.</p>
    </div>

    <form @submit.prevent="handleSubmit" class="flex-grow flex flex-col gap-6 relative z-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Name Input -->
        <div>
          <input
            v-model="form.name"
            type="text"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400"
            :placeholder="$t('contact.name') || 'Your Name'"
            required
          />
        </div>

        <!-- Email Input -->
        <div>
          <input
            v-model="form.email"
            type="email"
            class="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none placeholder-gray-400"
            :placeholder="$t('contact.email') || 'Your Email'"
            required
          />
        </div>
      </div>

      <!-- Message Input -->
      <div class="flex-grow">
        <textarea
          v-model="form.message"
          class="w-full h-full min-h-[120px] px-4 py-3 rounded-xl bg-gray-50 dark:bg-dark-bg border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none resize-none placeholder-gray-400"
          :placeholder="$t('contact.message') || 'How can I help you?'"
          required
        ></textarea>
      </div>

      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="isSending"
        class="w-full py-3.5 rounded-xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed mt-auto"
      >
        <span v-if="!isSending">{{ $t('contact.send') || 'Send Message' }} 🚀</span>
        <span v-else class="flex items-center gap-2">
          <i class="fas fa-circle-notch fa-spin"></i>
          Sending...
        </span>
      </button>
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
