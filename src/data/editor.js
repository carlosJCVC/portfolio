import { profile } from '@/data/profile'

export const getInitialFiles = () => [
  {
    name: 'about.js',
    icon: 'fab fa-js',
    color: '#f7df1e',
    content: `<span class="text-purple-400">class</span> <span class="text-yellow-300">Developer</span> <span class="text-white">{</span>
  <span class="text-blue-400">constructor</span>() <span class="text-white">{</span>
    <span class="text-blue-300">this</span>.<span class="text-blue-300">name</span> = <span class="text-green-300">'${profile.name}'</span>;
    <span class="text-blue-300">this</span>.<span class="text-blue-300">role</span> = <span class="text-green-300">'${profile.role}'</span>;
    <span class="text-blue-300">this</span>.<span class="text-blue-300">location</span> = <span class="text-green-300">'${profile.location}'</span>;
  <span class="text-white">}</span>

  <span class="text-yellow-300">getSkills</span>() <span class="text-white">{</span>
    <span class="text-purple-400">return</span> [
      ${Object.values(profile.skills)
        .flatMap((cat) => cat.items)
        .map((s) => `<span class="text-green-300">'${s}'</span>`)
        .join(', ')}
    ];
  <span class="text-white">}</span>
<span class="text-white">}</span>

<span class="text-purple-400">export default</span> <span class="text-yellow-300">Developer</span>;`
  },
  {
    name: 'contact.json',
    icon: 'fas fa-code',
    color: '#e34c26',
    content: `<span class="text-white">{</span>
  <span class="text-blue-300">"email"</span>: <span class="text-green-300">"${profile.email}"</span>,
  <span class="text-blue-300">"github"</span>: <span class="text-green-300">"${profile.social.github.replace('https://', '')}"</span>,
  <span class="text-blue-300">"linkedin"</span>: <span class="text-green-300">"${profile.social.linkedin.replace('https://', '')}"</span>,
  <span class="text-blue-300">"availableForHire"</span>: <span class="text-purple-400">${profile.openToWork}</span>
<span class="text-white">}</span>`
  },
  {
    name: 'README.md',
    icon: 'fas fa-info-circle',
    color: '#42b883',
    content: `<span class="text-blue-400"># Welcome to DevOS</span>

This portfolio is built as a functional Operating System simulation.
It demonstrates advanced <strong>Vue 3</strong> concepts, state management with <strong>Pinia</strong>,
and styling with <strong>Tailwind CSS</strong>.

## Features
- Window Management (Drag, Resize, Minimize)
- Functional Terminal & File System
- Real-time Clock & Taskbar
- VS Code-style Editor (You are here!)

Feel free to explore the source code on GitHub.`
  }
]
