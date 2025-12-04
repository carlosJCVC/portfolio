<template>
  <div class="h-full flex bg-[#1e1e1e] text-gray-200 font-sans">
    <!-- Sidebar (Contacts) -->
    <div class="w-64 border-r border-gray-700 flex flex-col bg-[#252526]">
      <div class="p-4 border-b border-gray-700">
        <input
          type="text"
          placeholder="Search"
          class="w-full bg-[#1e1e1e] rounded-lg px-3 py-2 text-sm border border-gray-700 focus:border-blue-500 outline-none"
        />
      </div>
      <div class="flex-grow overflow-auto">
        <div class="p-2 space-y-1">
          <div
            v-for="contact in contacts"
            :key="contact.id"
            class="flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors"
            :class="contact.id === 'me' ? 'bg-blue-600/20 border border-blue-600/30' : 'hover:bg-[#2a2d2e] opacity-50'"
          >
            <div class="relative">
              <img
                v-if="contact.avatar"
                src="@/assets/images/avatar.jpg"
                :alt="contact.name"
                class="w-10 h-10 rounded-full object-cover"
              />
              <div
                v-else
                class="w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center"
              >
                <i :class="contact.icon"></i>
              </div>
              <div
                v-if="contact.isOnline"
                class="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-[#252526]"
              ></div>
            </div>
            <div>
              <div class="font-bold text-sm">{{ contact.name }}</div>
              <div class="text-xs" :class="contact.id === 'me' ? 'text-blue-400' : 'text-gray-500'">
                {{ contact.status }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Chat Area -->
    <div class="flex-grow flex flex-col bg-[#1e1e1e]">
      <!-- Header -->
      <div
        class="h-14 border-b border-gray-700 flex items-center justify-between px-6 bg-[#252526]"
      >
        <div class="flex items-center gap-3">
          <span class="font-bold">Carlos Veizaga</span>
          <span
            class="px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 text-xs border border-green-500/30"
            >Available for Hire</span
          >
        </div>
        <div class="flex gap-4 text-gray-400">
          <i class="fas fa-phone hover:text-white cursor-pointer"></i>
          <i class="fas fa-video hover:text-white cursor-pointer"></i>
          <i class="fas fa-info-circle hover:text-white cursor-pointer"></i>
        </div>
      </div>

      <!-- Messages -->
      <div class="flex-grow p-6 overflow-auto space-y-4" ref="messagesContainer">
        <div
          v-for="(msg, index) in messages"
          :key="index"
          class="flex flex-col"
          :class="msg.isMe ? 'items-end' : 'items-start'"
        >
          <div
            class="max-w-[70%] px-4 py-2 rounded-2xl text-sm shadow-sm"
            :class="
              msg.isMe
                ? 'bg-blue-600 text-white rounded-br-none'
                : 'bg-[#2d2d2d] text-gray-200 rounded-bl-none'
            "
          >
            {{ msg.text }}
          </div>
          <span class="text-[10px] text-gray-500 mt-1 px-1">{{ msg.time }}</span>
        </div>
      </div>

      <!-- Input Area -->
      <div class="p-4 bg-[#252526] border-t border-gray-700">
        <form @submit.prevent="sendMessage" class="flex gap-2">
          <button
            type="button"
            class="w-10 h-10 rounded-full hover:bg-gray-700 text-gray-400 transition-colors"
          >
            <i class="fas fa-plus"></i>
          </button>
          <input
            v-model="newMessage"
            type="text"
            placeholder="Type a message..."
            class="flex-grow bg-[#1e1e1e] rounded-full px-4 text-sm border border-gray-700 focus:border-blue-500 outline-none"
          />
          <button
            type="submit"
            class="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!newMessage.trim()"
          >
            <i class="fas fa-paper-plane"></i>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from 'vue'
import { initialMessages, contacts } from '@/data/messenger'

const messages = ref([...initialMessages])
const newMessage = ref('')
const messagesContainer = ref(null)

const sendMessage = async () => {
  if (!newMessage.value.trim()) return

  // User Message
  messages.value.push({
    text: newMessage.value,
    isMe: true,
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })

  const userText = newMessage.value
  newMessage.value = ''
  scrollToBottom()

  // Auto-Reply Simulation
  setTimeout(() => {
    messages.value.push({
      text: `Thanks for the message: "${userText}". I'll get back to you shortly via email!`,
      isMe: false,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })
    scrollToBottom()
  }, 1500)
}

const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}
</script>
