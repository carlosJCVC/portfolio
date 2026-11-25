const OCR_LANGUAGES = { es: 'spa', en: 'eng' }

export const recognizeText = async (image, { locale = 'en', onProgress = () => {} } = {}) => {
  const { createWorker } = await import('tesseract.js')
  const worker = await createWorker(OCR_LANGUAGES[locale] ?? 'eng', 1, {
    logger: ({ status, progress }) => status === 'recognizing text' && onProgress(progress)
  })
  try {
    const { data } = await worker.recognize(image)
    return data.text.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim()
  } finally {
    await worker.terminate()
  }
}
