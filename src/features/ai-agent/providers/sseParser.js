export async function* parseSse(body) {
  const reader = body.getReader()
  const decoder = new TextDecoder()
  let buffer = ''

  const parseFrame = (frame) => {
    let event = 'message'
    const dataLines = []
    for (const line of frame.split('\n')) {
      if (line.startsWith('event:')) event = line.slice(6).trim()
      else if (line.startsWith('data:')) dataLines.push(line.slice(5).trimStart())
    }
    if (dataLines.length === 0) return null
    return { event, data: JSON.parse(dataLines.join('\n')) }
  }

  try {
    while (true) {
      const { value, done } = await reader.read()
      if (done) break
      buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, '\n')

      let boundary
      while ((boundary = buffer.indexOf('\n\n')) !== -1) {
        const frame = parseFrame(buffer.slice(0, boundary))
        buffer = buffer.slice(boundary + 2)
        if (frame) yield frame
      }
    }
    const tail = buffer.trim() && parseFrame(buffer)
    if (tail) yield tail
  } finally {
    reader.releaseLock()
  }
}
