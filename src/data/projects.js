import ElfecImage from '@/assets/images/projects/elfec.png'
import EducertifyMain from '@/assets/images/projects/educertify/educertify.webp'
import Educertify1 from '@/assets/images/projects/educertify/1.png'
import Educertify2 from '@/assets/images/projects/educertify/2.png'
import Educertify3 from '@/assets/images/projects/educertify/3.png'
import BtpMain from '@/assets/images/projects/btp/main.png'
import BtpOne from '@/assets/images/projects/btp/1.png'
import MoxieMain from '@/assets/images/projects/moxie/main.png'
import Moxie1 from '@/assets/images/projects/moxie/1.png'
import Moxie2 from '@/assets/images/projects/moxie/2.png'
import KtnMain from '@/assets/images/projects/ktn/main.png'
import Ktn1 from '@/assets/images/projects/ktn/1.png'
import Ktn2 from '@/assets/images/projects/ktn/2.png'
import UsRacingMain from '@/assets/images/projects/usracing/main.png'
import JaysMain from '@/assets/images/projects/jayswideshoes/main.png'
import Jays1 from '@/assets/images/projects/jayswideshoes/1.png'
import BrwMain from '@/assets/images/projects/brw/12.png'
import Brw1 from '@/assets/images/projects/brw/1.png'
import Brw2 from '@/assets/images/projects/brw/2.png'
import HypervisorMain from '@/assets/images/projects/hypervisor/main.png'
import Hypervisor1 from '@/assets/images/projects/hypervisor/1.png'
import Hypervisor2 from '@/assets/images/projects/hypervisor/2.png'

export const projects = [
  {
    id: 11,
    title: 'EduCertify',
    description: 'Course management and bulk certificate generation platform.',
    fullDescription: 'An educational platform designed to streamline the certification process. Instructors can create courses, import student lists, and generate customizable certificates in bulk. The system allows for the personalization of certificate templates before distribution, ensuring a professional look for every graduate. It handles email delivery and record-keeping for all issued credentials.',
    image: EducertifyMain,
    technologies: ['Laravel', 'PostgreSQL', 'Bootstrap', 'jQuery', 'CSS'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Bulk Certificate Generation',
      'Customizable Templates',
      'Student Import/Management',
      'Automated Email Delivery',
      'Course Administration'
    ],
    gallery: [
      { src: Educertify1, caption: 'Certificate Generation Wizard' },
      { src: Educertify2, caption: 'Course Management Dashboard' },
      { src: Educertify3, caption: 'Student Import Interface' }
    ]
  },
  {
    id: 8,
    title: 'BTP Enterprise Platform',
    description: 'Massive workforce and resource management system with mobile integration.',
    fullDescription: 'A large-scale enterprise platform designed for comprehensive workforce and resource management. It features complex integrations with multiple payment gateways and e-invoicing services. The system handles agreement tracking with digital signatures, automated document generation (HTML/PDF/Word) with dynamic tag replacement, and organization management. It includes a time-tracking module with geolocation and PTO management, all governed by a granular role-based permission system. The platform is complemented by a React Native mobile app for iOS and Android, enabling push notifications and on-the-go access.',
    image: BtpMain,
    technologies: ['Laravel', 'React Native', 'Vue.js', 'jQuery', 'Bootstrap', 'Webpack', 'Payment APIs', 'E-Invoicing'],
    category: 'Enterprise',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: true,
    features: [
      'Multi-Gateway Payments',
      'Automated Invoicing',
      'Digital Agreements & Signatures',
      'Dynamic Document Generation',
      'Time Tracking & PTO',
      'Mobile App (iOS/Android)'
    ],
    gallery: [
      { src: BtpMain, caption: 'Main Dashboard & Resource Overview' },
      { src: BtpOne, caption: 'Detailed Management Interface' }
    ]
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
  },
  {
    id: 1,
    title: 'MoxieCopywriting',
    description: 'Credit-based creative workflow platform integrating Shopify payments with a Laravel backend.',
    fullDescription: 'A comprehensive creative services platform where clients use purchased credits to request design and copywriting work. The system features a seamless integration with Shopify for credit purchases, triggering real-time API updates to the user\'s balance. It includes a robust role-based workflow where administrators process requests, upload deliverables, and manage iterative revision cycles with clients until approval.',
    image: MoxieMain,
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
      { src: MoxieMain, caption: 'Main Platform Interface' },
      { src: Moxie1, caption: 'Client Request Flow' },
      { src: Moxie2, caption: 'Admin Dashboard' }
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
    id: 9,
    title: 'BR-WINS',
    description: 'Competitive gaming platform integrating RapidAPI for real-time match data.',
    fullDescription: 'A web-based gaming platform where users compete in skill-based games like chess to earn rewards. The application leverages RapidAPI to consume real-time match data and verify game outcomes. It features a secure wallet system for managing user earnings and a responsive interface for seamless gameplay across devices.',
    image: BrwMain,
    technologies: ['Laravel', 'jQuery', 'Bootstrap', 'MySQL', 'RapidAPI', 'CSS'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'Real-time API Integration',
      'Skill-Based Gaming',
      'Wallet & Rewards System',
      'Match Verification',
      'Responsive Design'
    ],
    gallery: [
      { src: BrwMain, caption: 'Game Lobby' },
      { src: Brw1, caption: 'Match Interface' },
      { src: Brw2, caption: 'User Wallet' }
    ]
  },
  {
    id: 10,
    title: 'BTP Hypervisor',
    description: 'Cloud resource monitoring and provisioning dashboard for BTP systems.',
    fullDescription: 'A specialized monitoring dashboard that allows users to subscribe to and oversee their BTP system status. It provides real-time visualization of resource usage and system health. The platform also facilitates the provisioning of additional resources, such as server instances and databases, through an intuitive web interface, streamlining infrastructure management.',
    image: HypervisorMain,
    technologies: ['Laravel', 'jQuery', 'Bootstrap', 'Chart.js', 'MySQL'],
    category: 'Web App',
    liveUrl: '#',
    githubUrl: '#',
    displayLiveUrl: false,
    displayGithubUrl: false,
    featured: false,
    features: [
      'System Health Monitoring',
      'Resource Provisioning',
      'Subscription Management',
      'Usage Analytics',
      'Intuitive Dashboard'
    ],
    gallery: [
      { src: HypervisorMain, caption: 'System Status Dashboard' },
      { src: Hypervisor1, caption: 'Resource Usage Charts' },
      { src: Hypervisor2, caption: 'Provisioning Interface' }
    ]
  },
  {
    id: 4,
    title: 'KNT Reporting',
    description: 'Automated evaluation and reporting system for performance metrics.',
    fullDescription: 'A data-driven web application focused on generating detailed performance reports. It automates the calculation of averages, percentages, and evaluation scores (similar to academic grading). The system visualizes these metrics and allows for the export of comprehensive reports, aiding in data analysis and decision-making.',
    image: KtnMain,
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
    gallery: [
      { src: KtnMain, caption: 'Reporting Dashboard' },
      { src: Ktn1, caption: 'Data Entry Form' },
      { src: Ktn2, caption: 'Export Options' }
    ]
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
    id: 5,
    title: 'USRacing',
    description: 'Real-time horse racing monitor with automated data scraping.',
    fullDescription: 'A WordPress-based monitoring system for horse racing news and events. The project involved building a custom Python scraping engine to mirror real-time race data, odds, and news from external sources, ensuring the site remained up-to-date with the latest industry information without manual input.',
    image: UsRacingMain,
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
    gallery: [
      { src: UsRacingMain, caption: 'Live Race Monitor' }
    ]
  },
  {
    id: 6,
    title: 'JaysWideShoes',
    description: 'Security recovery and optimization for a Magento e-commerce platform.',
    fullDescription: 'A critical recovery project for a Magento-based e-commerce store that suffered a cyberattack. The work involved cleaning malicious code, restoring database integrity, and scrubbing "dirty" data from Google search indices. Enhanced security measures were implemented to prevent future breaches and restore customer trust.',
    image: JaysMain,
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
    gallery: [
      { src: JaysMain, caption: 'Recovered Storefront' },
      { src: Jays1, caption: 'Security Dashboard' }
    ]
  }
]
