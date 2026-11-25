import DOMPurify from 'dompurify'

const escapeHtml = (text) =>
  text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

const SAFE_URL = /^(https?:\/\/|mailto:)/i

const renderInline = (text) =>
  escapeHtml(text)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[^*])\*([^*\s][^*]*)\*/g, '$1<em>$2</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (match, label, url) =>
      SAFE_URL.test(url) ? `<a href="${url}" target="_blank" rel="noopener noreferrer">${label}</a>` : label
    )

const LIST_ITEM = /^\s*([-*•]|\d+[.)])\s+(.*)$/

export const renderMarkdown = (source = '') => {
  const html = []
  let list = null

  const flushList = () => {
    if (!list) return
    html.push(`<${list.tag}>${list.items.map((item) => `<li>${item}</li>`).join('')}</${list.tag}>`)
    list = null
  }

  for (const block of source.split(/\n{2,}/)) {
    const lines = block.split('\n')
    let paragraph = []

    const flushParagraph = () => {
      if (paragraph.length) html.push(`<p>${paragraph.map(renderInline).join('<br>')}</p>`)
      paragraph = []
    }

    for (const line of lines) {
      const item = line.match(LIST_ITEM)
      if (item) {
        flushParagraph()
        const tag = /\d/.test(item[1]) ? 'ol' : 'ul'
        if (list && list.tag !== tag) flushList()
        list ??= { tag, items: [] }
        list.items.push(renderInline(item[2]))
      } else if (line.trim()) {
        flushList()
        paragraph.push(line.replace(/^#{1,6}\s+/, ''))
      }
    }
    flushParagraph()
    flushList()
  }

  return DOMPurify.sanitize(html.join(''), { ADD_ATTR: ['target'] })
}
