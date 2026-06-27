import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '',
  timeout: 120000,
})

/**
 * @param {File} file
 * @param {(progress: number) => void} [onProgress]
 * @returns {Promise<import('../types').UploadResponse>}
 */
export async function uploadPdf(file, onProgress) {
  const formData = new FormData()
  formData.append('file', file)

  const { data } = await api.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    onUploadProgress: (event) => {
      if (onProgress && event.total) {
        onProgress(Math.round((event.loaded * 100) / event.total))
      }
    },
  })

  return data
}

/**
 * @param {string} question
 * @returns {Promise<import('../types').QueryResponse>}
 */
export async function askQuestion(question) {
  const { data } = await api.post('/query', null, {
    params: { question },
  })
  return data
}

export default api
