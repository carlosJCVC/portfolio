export const initialMessages = [
  { text: 'Hi there! Thanks for visiting my portfolio OS.', isMe: false, time: '10:00 AM' },
  {
    text: 'I am currently open to new opportunities. Feel free to leave a message!',
    isMe: false,
    time: '10:01 AM'
  }
]

export const contacts = [
  {
    id: 'me',
    name: 'Carlos Veizaga',
    status: 'Typing...',
    avatar: '@/assets/images/avatar.jpg', // Note: This path handling might need adjustment in component
    isOnline: true
  },
  {
    id: 'bot',
    name: 'Recruiter Bot',
    status: 'Offline',
    avatar: null,
    icon: 'fas fa-robot',
    isOnline: false
  }
]
