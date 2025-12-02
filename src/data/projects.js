import ElfecImage from '@/assets/images/projects/elfec.png'
import Educertify from '@/assets/images/projects/educertify.webp'
import AnimeHeroChallenge from '@/assets/images/projects/Anime_Hero_Challenge_600x400.png'

export const projects = [
  {
    id: 1,
    title: 'ELFEC',
    description: 'Web Application for ELFEC',
    fullDescription: 'A comprehensive web application for ELFEC, featuring user management, billing, and reporting modules.',
    image: ElfecImage,
    technologies: ['PHP', 'CSS', 'Drupal', 'MySQL', 'JavaScript', 'JQuery', 'Bootstrap'],
    category: 'Web App',
    liveUrl: 'https://www.elfec.bo',
    githubUrl: '',
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'preview.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'link.url', type: 'link', icon: 'fas fa-globe', color: 'text-blue-400' }
    ]
  },
  {
    id: 2,
    title: 'EduCertify',
    description: 'Certificate Management System',
    fullDescription: 'A platform for managing and verifying educational certificates using blockchain technology.',
    image: Educertify,
    technologies: ['PHP', 'Laravel', 'MySQL', 'Vue.js'],
    category: 'Web App',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/carlosJCVC/EduCertify',
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'preview.webp', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'source_code.url', type: 'link', icon: 'fab fa-github', color: 'text-gray-300' }
    ]
  },
  {
    id: 3,
    title: 'Anime Hero',
    description: 'Interactive Anime Quiz Game',
    fullDescription: 'Test your anime knowledge with this interactive quiz game featuring silhouette challenges.',
    image: AnimeHeroChallenge,
    technologies: ['Vue.js', 'Tailwind CSS', 'API'],
    category: 'Web App',
    liveUrl: 'https://calm-beijinho-4007d3.netlify.app',
    githubUrl: 'https://github.com/carlosJCVC/pokemon-game',
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'gameplay.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'play_now.url', type: 'link', icon: 'fas fa-gamepad', color: 'text-green-400' }
    ]
  },
  {
    id: 4,
    title: 'TaskMaster AI',
    description: 'AI Productivity Tool',
    fullDescription: 'Smart task prioritization using OpenAI GPT-4.',
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=TaskMaster+AI',
    technologies: ['React', 'Node.js', 'OpenAI'],
    category: 'AI App',
    liveUrl: '#',
    githubUrl: '#',
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'demo.mp4', type: 'video', icon: 'fas fa-file-video', color: 'text-red-400' }
    ]
  },
  {
    id: 5,
    title: 'CryptoDash',
    description: 'Crypto Portfolio Tracker',
    fullDescription: 'Real-time cryptocurrency dashboard with live price updates.',
    image: 'https://placehold.co/600x400/10B981/FFFFFF?text=CryptoDash',
    technologies: ['Vue.js', 'D3.js', 'Firebase'],
    category: 'Finance',
    liveUrl: '#',
    githubUrl: '#',
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'chart.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' }
    ]
  }
]
