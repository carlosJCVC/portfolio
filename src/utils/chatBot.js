import { profile } from '@/data/profile'
import { projects } from '@/data/projects'

const normalize = (text) => text.toLowerCase().trim()

export const processMessage = (text) => {
  const msg = normalize(text)

  // Greetings
  if (['hi', 'hello', 'hey', 'hola', 'start'].some(w => msg.includes(w))) {
    return `Hello! I'm the Recruiter Bot. I can answer questions about Carlos's **skills**, **projects**, **experience**, or **contact** info. What would you like to know?`
  }

  // Skills
  if (msg.includes('skill') || msg.includes('stack') || msg.includes('tech')) {
    const allSkills = Object.values(profile.skills)
      .flatMap(cat => cat.items)
      .join(', ')
    return `Carlos is proficient in: ${allSkills}. He specializes in **Vue.js**, **React**, and **Node.js**.`
  }

  // Projects
  if (msg.includes('project') || msg.includes('work') || msg.includes('portfolio')) {
    const projectNames = projects.map(p => p.title).join(', ')
    return `Carlos has worked on several impressive projects, including: **${projectNames}**. You can view details in the **Explorer** or **Terminal** apps.`
  }

  // Experience / Resume
  if (msg.includes('experience') || msg.includes('resume') || msg.includes('cv') || msg.includes('background')) {
    return `Carlos is a **${profile.role}** based in **${profile.location}**. He is currently **${profile.openToWork ? 'Open to Work' : 'Not looking for new opportunities'}**. You can download his full resume from the Start Menu.`
  }

  // Contact
  if (msg.includes('contact') || msg.includes('email') || msg.includes('reach')) {
    return `You can reach Carlos at **${profile.email}**. He is also active on [LinkedIn](${profile.social.linkedin}) and [GitHub](${profile.social.github}).`
  }

  // Default
  return `I'm not sure about that. Try asking about **skills**, **projects**, or **contact** info. Or just say **hello**!`
}
