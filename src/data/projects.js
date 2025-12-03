import ElfecImage from '@/assets/images/projects/elfec.png'
import Educertify from '@/assets/images/projects/educertify.webp'
import AnimeHeroChallenge from '@/assets/images/projects/Anime_Hero_Challenge_600x400.png'

export const projects = [
  {
    id: 1,
    title: 'MoxieCopywriting',
    description: 'Credit-based creative workflow platform integrating Shopify payments with a Laravel backend.',
    fullDescription: 'A comprehensive creative services platform where clients use purchased credits to request design and copywriting work. The system features a seamless integration with Shopify for credit purchases, triggering real-time API updates to the user\'s balance. It includes a robust role-based workflow where administrators process requests, upload deliverables, and manage iterative revision cycles with clients until approval.',
    image: 'https://placehold.co/600x400/4F46E5/FFFFFF?text=Moxie+Platform',
    technologies: ['Laravel', 'Shopify API', 'jQuery', 'Ajax', 'Bootstrap', 'Materialize', 'MySQL'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: true,
    features: [
      'Shopify Payment Integration',
      'Credit-Based System',
      'Revision Workflow',
      'Role-Based Access Control',
      'Real-time Notifications'
    ],
    gallery: [
      { src: 'https://placehold.co/800x600/4F46E5/FFFFFF?text=Request+Dashboard', caption: 'Client Request Dashboard' },
      { src: 'https://placehold.co/800x600/6366F1/FFFFFF?text=Revision+Cycle', caption: 'Iterative Revision Interface' }
    ]
  },
  {
    id: 2,
    title: 'NRG-WELLNESS',
    description: 'Gamified wellness PWA for video challenges and workout streaming.',
    fullDescription: 'A progressive web application (PWA) designed to engage users in wellness activities. Users upload and stream videos for challenges, workouts, and cooking, which are stored on an external platform to optimize performance. The system gamifies the experience by awarding points based on video engagement and views, fostering a competitive and motivating community.',
    image: 'https://placehold.co/600x400/10B981/FFFFFF?text=NRG+Wellness',
    technologies: ['Laravel', 'Vue.js', 'PWA', 'MySQL', 'JavaScript', 'jQuery'],
    category: 'Mobile App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: true,
    features: [
      'PWA Offline Capabilities',
      'Video Streaming Integration',
      'Gamification & Points System',
      'User Content Uploads',
      'Mobile-First Design'
    ],
    gallery: []
  },
  {
    id: 3,
    title: 'Cemetery ERP',
    description: 'Custom ERP solution for cemetery management, sales, and invoicing.',
    fullDescription: 'A specialized Enterprise Resource Planning (ERP) system built to manage the unique operations of a cemetery. The platform handles the sale of plots, flowers, and related products, complete with a custom invoicing module. It streamlines inventory management and provides administrative tools for tracking plot ownership and maintenance schedules.',
    image: 'https://placehold.co/600x400/64748B/FFFFFF?text=Cemetery+ERP',
    technologies: ['Laravel', 'Materialize CSS', 'PHP', 'MySQL'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Plot Sales Management',
      'Product Inventory & POS',
      'Custom Invoicing',
      'Map/Location Integration',
      'Administrative Dashboard'
    ],
    gallery: []
  },
  {
    id: 4,
    title: 'KNT Reporting',
    description: 'Automated evaluation and reporting system for performance metrics.',
    fullDescription: 'A data-driven web application focused on generating detailed performance reports. It automates the calculation of averages, percentages, and evaluation scores (similar to academic grading). The system visualizes these metrics and allows for the export of comprehensive reports, aiding in data analysis and decision-making.',
    image: 'https://placehold.co/600x400/F59E0B/FFFFFF?text=KNT+Reporting',
    technologies: ['CodeIgniter', 'Bootstrap', 'jQuery', 'PHP', 'MySQL'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Automated Calculations',
      'Report Export (PDF/Excel)',
      'Data Visualization',
      'Evaluation Metrics',
      'Legacy System Maintenance'
    ],
    gallery: []
  },
  {
    id: 5,
    title: 'USRacing',
    description: 'Real-time horse racing monitor with automated data scraping.',
    fullDescription: 'A WordPress-based monitoring system for horse racing news and events. The project involved building a custom Python scraping engine to mirror real-time race data, odds, and news from external sources, ensuring the site remained up-to-date with the latest industry information without manual input.',
    image: 'https://placehold.co/600x400/EF4444/FFFFFF?text=USRacing',
    technologies: ['WordPress', 'Python', 'Scrapy', 'PHP', 'MySQL'],
    category: 'Backend',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Automated Data Scraping',
      'Real-time Odds Updates',
      'News Aggregation',
      'WordPress Customization',
      'Backend Optimization'
    ],
    gallery: []
  },
  {
    id: 6,
    title: 'JaysWideShoes',
    description: 'Security recovery and optimization for a Magento e-commerce platform.',
    fullDescription: 'A critical recovery project for a Magento-based e-commerce store that suffered a cyberattack. The work involved cleaning malicious code, restoring database integrity, and scrubbing "dirty" data from Google search indices. Enhanced security measures were implemented to prevent future breaches and restore customer trust.',
    image: 'https://placehold.co/600x400/8B5CF6/FFFFFF?text=JaysWideShoes',
    technologies: ['Magento', 'PHP', 'MySQL', 'Security', 'SEO Recovery'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Malware Removal',
      'Database Restoration',
      'SEO Index Cleaning',
      'Security Hardening',
      'Legacy Code Maintenance'
    ],
    gallery: []
  },
  {
    id: 7,
    title: 'ELFEC CMS',
    description: 'Corporate content management system for a major electrical utility.',
    fullDescription: 'A robust Drupal-based CMS designed for ELFEC to manage their corporate web presence. The system handles complex user roles, public information dissemination, and internal content workflows, providing a stable and scalable platform for the utility company.',
    image: ElfecImage,
    technologies: ['Drupal', 'PHP', 'MySQL', 'JavaScript', 'jQuery', 'Bootstrap'],
    category: 'Web App',
    liveUrl: 'https://www.elfec.bo',
    githubUrl: '',
    displayLiveUrl: true,
    displayGithubUrl: false,
    featured: false,
    features: [
      'User Role Management',
      'Content Workflow',
      'Public Portal',
      'Reporting Modules',
      'System Integration'
    ],
    gallery: []
  }
]
