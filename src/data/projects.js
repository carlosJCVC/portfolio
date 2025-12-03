import ElfecImage from '@/assets/images/projects/elfec.png'
import Educertify from '@/assets/images/projects/educertify.webp'
import AnimeHeroChallenge from '@/assets/images/projects/Anime_Hero_Challenge_600x400.png'

export const projects = [
  {
    id: 1,
    title: 'ELFEC',
    descriptionKey: 'projects.list.elfec.short_description',
    fullDescriptionKey: 'projects.list.elfec.full_description',
    image: ElfecImage,
    technologies: ['PHP', 'CSS', 'Drupal', 'MySQL', 'JavaScript', 'JQuery', 'Bootstrap'],
    category: 'Web App',
    liveUrl: 'https://www.elfec.bo',
    githubUrl: '',
    displayLiveUrl: true,
    displayGithubUrl: false,
    featured: false,
    featuresKeys: [
      'projects.list.elfec.features.user_management',
      'projects.list.elfec.features.billing',
      'projects.list.elfec.features.reporting',
      'projects.list.elfec.features.notifications',
      'projects.list.elfec.features.analytics',
      'projects.list.elfec.features.support',
      'projects.list.elfec.features.mobile_access'
    ],
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'preview.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'link.url', type: 'link', icon: 'fas fa-globe', color: 'text-blue-400' }
    ]
  },
  {
    id: 2,
    title: 'EduCertify',
    descriptionKey: 'projects.list.educertify.short_description',
    fullDescriptionKey: 'projects.list.educertify.full_description',
    image: Educertify,
    technologies: ['PHP', 'CSS', 'Laravel', 'MySQL', 'JavaScript', 'JQuery', 'Bootstrap', 'Vite'],
    category: 'Web App',
    liveUrl: 'https://example-ecommerce.com',
    githubUrl: 'https://github.com/carlosJCVC/EduCertify',
    displayLiveUrl: false,
    displayGithubUrl: true,
    featured: true,
    featuresKeys: [
      'projects.list.educertify.features.template',
      'projects.list.educertify.features.signature',
      'projects.list.educertify.features.customization',
      'projects.list.educertify.features.management',
      'projects.list.educertify.features.delivery',
      'projects.list.educertify.features.authentication',
      'projects.list.educertify.features.dashboard'
    ],
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'preview.webp', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'source_code.url', type: 'link', icon: 'fab fa-github', color: 'text-gray-300' }
    ],
    gallery: [
      { src: 'https://placehold.co/800x600/1e293b/ffffff?text=Admin+Dashboard', caption: 'Admin Dashboard' },
      { src: 'https://placehold.co/800x600/3b82f6/ffffff?text=Certificate+Editor', caption: 'Certificate Editor' },
      { src: 'https://placehold.co/800x600/10b981/ffffff?text=Mobile+View', caption: 'Responsive Mobile View' }
    ]
  },
  {
    id: 3,
    title: 'Anime Hero Challengue',
    descriptionKey: 'projects.list.animehero.short_description',
    fullDescriptionKey: 'projects.list.animehero.full_description',
    image: AnimeHeroChallenge,
    technologies: ['JavaScript', 'Vue', 'Vite', 'Tailwind CSS', 'Api Integration', 'Vite'],
    category: 'Web App',
    liveUrl: 'https://calm-beijinho-4007d3.netlify.app',
    githubUrl: 'https://github.com/carlosJCVC/pokemon-game',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    featuresKeys: [
      'projects.list.animehero.features.selection',
      'projects.list.animehero.features.silhouette',
      'projects.list.animehero.features.multiple',
      'projects.list.animehero.features.scoring',
      'projects.list.animehero.features.reset',
      'projects.list.animehero.features.series',
      'projects.list.animehero.features.api',
      'projects.list.animehero.features.progress',
      'projects.list.animehero.features.responsive',
      'projects.list.animehero.features.expansion'
    ],
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'gameplay.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' },
      { name: 'play_now.url', type: 'link', icon: 'fas fa-gamepad', color: 'text-green-400' }
    ]
  },
  {
    id: 4,
    title: 'TaskMaster AI',
    description: 'A smart productivity app that uses AI to prioritize tasks and schedule meetings automatically.',
    fullDescription: "TaskMaster AI revolutionizes personal productivity by integrating OpenAI's GPT-4 to analyze your workload. It automatically categorizes tasks, suggests optimal scheduling based on your energy levels, and even drafts email responses. Built with React and Node.js, it features real-time synchronization across devices.",
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=TaskMaster+AI',
    technologies: ['React', 'Node.js', 'OpenAI API', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
    category: 'AI App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: true,
    features: [
      'AI Task Prioritization',
      'Smart Scheduling',
      'Email Drafting',
      'Real-time Sync',
      'Voice Commands'
    ],
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'demo.mp4', type: 'video', icon: 'fas fa-file-video', color: 'text-red-400' }
    ]
  },
  {
    id: 5,
    title: 'CryptoDash',
    description: 'Real-time cryptocurrency dashboard featuring advanced charting and portfolio tracking.',
    fullDescription: 'CryptoDash provides investors with a comprehensive view of the crypto market. It aggregates data from multiple exchanges via WebSockets to offer millisecond-latency price updates. Users can track their portfolio performance with interactive D3.js charts and set custom alerts for price movements.',
    image: 'https://placehold.co/600x400/10B981/FFFFFF?text=CryptoDash',
    technologies: ['Vue.js', 'D3.js', 'Firebase', 'WebSockets', 'Netlify Functions'],
    category: 'Finance',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: [
      'Real-time Data',
      'Interactive Charts',
      'Portfolio Tracking',
      'Price Alerts',
      'News Feed'
    ],
    files: [
      { name: 'README.md', type: 'file', icon: 'fas fa-file-alt', color: 'text-gray-400' },
      { name: 'chart.png', type: 'image', icon: 'fas fa-file-image', color: 'text-purple-400' }
    ]
  },
  {
    id: 6,
    title: 'TravelLog',
    description: 'A social platform for travelers to share journals, photos, and interactive maps of their journeys.',
    fullDescription: 'TravelLog connects wanderlusts around the globe. It allows users to create rich-text travel journals embedded with photos and interactive maps. The platform uses geolocation to suggest nearby hidden gems and connects travelers visiting the same destination.',
    image: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=TravelLog',
    technologies: ['Flutter', 'Firebase', 'Google Maps API', 'Dart', 'Cloud Functions'],
    category: 'Mobile App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Interactive Maps', 'Photo Galleries', 'Social Feed', 'Geolocation', 'Offline Mode'],
    files: []
  },
  {
    id: 7,
    title: 'EcoTrack IoT',
    description: 'IoT dashboard for monitoring energy consumption in smart homes with predictive analytics.',
    fullDescription: 'EcoTrack IoT helps homeowners reduce their carbon footprint. By connecting to smart meters and IoT devices, it visualizes energy consumption patterns in real-time. The system uses machine learning to predict future usage and suggests actionable tips to save energy and money.',
    image: 'https://placehold.co/600x400/3B82F6/FFFFFF?text=EcoTrack',
    technologies: ['Angular', 'AWS IoT', 'Lambda', 'DynamoDB', 'Chart.js'],
    category: 'IoT',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: [
      'Real-time Monitoring',
      'Predictive Analytics',
      'Device Control',
      'Cost Estimation',
      'Sustainability Reports'
    ],
    files: []
  },
  {
    id: 8,
    title: 'Project Alpha',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    fullDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    image: 'https://placehold.co/600x400/6366F1/FFFFFF?text=Project+Alpha',
    technologies: ['React', 'Redux', 'Sass', 'Webpack'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Feature One', 'Feature Two', 'Feature Three', 'Feature Four'],
    files: []
  },
  {
    id: 9,
    title: 'Beta Dashboard',
    description: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    fullDescription: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit.',
    image: 'https://placehold.co/600x400/EC4899/FFFFFF?text=Beta+Dashboard',
    technologies: ['Vue.js', 'Vuex', 'Chart.js', 'Firebase'],
    category: 'Finance',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Analytics', 'Real-time Updates', 'User Management', 'Reporting'],
    files: []
  },
  {
    id: 10,
    title: 'Gamma Mobile',
    description: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    fullDescription: 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga.',
    image: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=Gamma+Mobile',
    technologies: ['React Native', 'Expo', 'Redux', 'Node.js'],
    category: 'Mobile App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: true,
    displayGithubUrl: true,
    featured: false,
    features: ['Push Notifications', 'Offline Support', 'Camera Integration', 'Maps'],
    files: []
  }
]
