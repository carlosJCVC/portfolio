const escape = (value = '') => String(value).replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n')

export const buildVCard = ({ profile, websiteUrl }) => {
  const [firstName, ...lastNames] = profile.name.split(' ')
  const [city = '', country = ''] = profile.location.split(',').map((part) => part.trim())

  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `N:${escape(lastNames.join(' '))};${escape(firstName)};;;`,
    `FN:${escape(profile.name)}`,
    `TITLE:${escape(profile.role)}`,
    `EMAIL;TYPE=INTERNET,WORK:${profile.email}`,
    `URL:${websiteUrl}`,
    profile.social.linkedin && `URL;TYPE=LinkedIn:${profile.social.linkedin}`,
    profile.social.github && `URL;TYPE=GitHub:${profile.social.github}`,
    `ADR;TYPE=WORK:;;;${escape(city)};;;${escape(country)}`,
    'END:VCARD'
  ]
    .filter(Boolean)
    .join('\r\n')
}

export const downloadVCard = ({ profile, websiteUrl }) => {
  const blob = new Blob([buildVCard({ profile, websiteUrl })], { type: 'text/vcard;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const link = Object.assign(document.createElement('a'), {
    href: url,
    download: `${profile.name.replace(/\s+/g, '_')}.vcf`
  })
  link.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}
