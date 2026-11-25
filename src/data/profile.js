import ResumeFile from '@/assets/Carlos_Veizaga_Resume.pdf'
import AvatarImage from '@/assets/images/avatar.jpg'

export const profile = {
  name: 'Carlos Veizaga',
  avatar: AvatarImage,
  role: 'Senior Full-Stack & AI Engineer',
  location: 'Cochabamba, Bolivia',
  email: 'carlosveizaga.jcvc@gmail.com',
  openToWork: true,
  social: {
    github: 'https://github.com/carlosJCVC',
    linkedin: 'https://www.linkedin.com/in/jcarlos-veizaga',
    twitter: null // Add if needed
  },
  resume: {
    filename: 'Carlos_Veizaga_Resume.pdf',
    downloadLabel: 'Download CV',
    url: ResumeFile
  },
  about: `I am a Senior Full-Stack & AI Engineer with 10+ years of experience building enterprise-grade platforms, cross-platform mobile apps, and high-performance web systems.

Today I focus on real-time AI products: I founded and built Interpreto, a live interpretation platform that turns a speaker's voice into every attendee's language as they speak. I architect scalable, well-tested solutions that solve complex business challenges while delivering a seamless user experience.`,
  roles: ['Senior Full-Stack & AI Engineer', 'Founder of Interpreto', 'Real-time AI Systems', 'Problem Solver'],
  skills: {
    ai: {
      title: 'AI & Real-time',
      items: ['LLM Agents & Tool Use', 'Speech-to-Text', 'Machine Translation', 'Text-to-Speech', 'WebSockets', 'Prompt Engineering']
    },
    backend: {
      title: 'Backend & Architecture',
      items: ['Laravel', 'Node.js', 'Python', 'MySQL', 'PostgreSQL', 'AWS', 'Docker', 'Redis']
    },
    frontend: {
      title: 'Frontend & UI',
      items: ['Vue.js', 'React', 'Angular', 'Tailwind CSS', 'Bootstrap', 'Sass', 'TypeScript']
    },
    mobile: {
      title: 'Mobile Development',
      items: ['React Native', 'Flutter', 'Expo', 'Android', 'iOS']
    },
    tools: {
      title: 'Tools & DevOps',
      items: ['Git', 'n8n', 'Linux', 'Agile/Scrum', 'CI/CD', 'Webpack']
    }
  }
}
