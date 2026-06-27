const STORAGE_KEY = 'knowledgehub_documents'

/**
 * @returns {import('../types').UploadedDocument[]}
 */
export function loadDocuments() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * @param {import('../types').UploadedDocument[]} documents
 */
export function saveDocuments(documents) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(documents))
}

/**
 * @param {import('../types').UploadResponse} response
 * @returns {import('../types').UploadedDocument}
 */
export function createDocumentFromUpload(response) {
  return {
    id: crypto.randomUUID(),
    filename: response.filename,
    pages: response.pages,
    chunks: response.chunks,
    uploadedAt: new Date().toISOString(),
  }
}

/**
 * @param {string} filepath
 * @returns {string}
 */
export function getDisplayFilename(filepath) {
  if (!filepath) return 'Unknown document'
  const parts = filepath.replace(/\\/g, '/').split('/')
  return parts[parts.length - 1]
}

/**
 * @param {string} isoDate
 * @returns {string}
 */
export function formatUploadDate(isoDate) {
  return new Date(isoDate).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export function generateId() {
  return crypto.randomUUID()
}
