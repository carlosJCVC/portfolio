import ResumeFile from '@/assets/Carlos_Veizaga_Resume.pdf'
import AvatarImage from '@/assets/images/avatar.jpg'

export const profile = {
  name: 'Carlos Veizaga',
  avatar: AvatarImage,
  role: 'Full Stack Developer',
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
  about: `I am a Senior Full-Stack Architect with 10+ years of experience. I specialize in building enterprise-grade platforms, cross-platform mobile apps, and high-performance web systems.

My expertise lies in architecting scalable solutions that solve complex business challenges while delivering a seamless user experience. From massive ERPs to engaging consumer apps, I deliver reliability and innovation.`,
  roles: ["Full Stack Developer", "UI/UX Enthusiast", "Problem Solver", "Tech Explorer"],
  skills: {
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
