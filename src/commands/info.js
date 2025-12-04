export const about = {
  name: 'about',
  description: 'Quick summary',
  execute: (args, { fileSystem }) => {
    return fileSystem['about.txt'].content
  }
}

export const contact = {
  name: 'contact',
  description: 'Get in touch',
  execute: (args, { fileSystem }) => {
    return fileSystem['contact.txt'].content
  }
}

export const skills = {
  name: 'skills',
  description: 'View technical skills',
  execute: (args, { fileSystem }) => {
    return fileSystem['skills.txt'].content
  }
}
