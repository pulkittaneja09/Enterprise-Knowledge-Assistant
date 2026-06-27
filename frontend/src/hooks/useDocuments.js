import { useState, useCallback, useEffect } from 'react'
import { uploadPdf } from '@/services/api'
import {
  loadDocuments,
  saveDocuments,
  createDocumentFromUpload,
} from '@/utils/storage'

/**
 * @returns {{
 *   documents: import('../types').UploadedDocument[],
 *   isUploading: boolean,
 *   uploadProgress: number,
 *   uploadFile: (file: File) => Promise<boolean>,
 *   removeDocument: (id: string) => void,
 * }}
 */
export function useDocuments() {
  const [documents, setDocuments] = useState([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)

  useEffect(() => {
    setDocuments(loadDocuments())
  }, [])

  const uploadFile = useCallback(async (file) => {
    if (!file || file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed.')
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      const response = await uploadPdf(file, setUploadProgress)
      const doc = createDocumentFromUpload(response)

      setDocuments((prev) => {
        const filtered = prev.filter((d) => d.filename !== doc.filename)
        const updated = [doc, ...filtered]
        saveDocuments(updated)
        return updated
      })

      return true
    } finally {
      setIsUploading(false)
      setUploadProgress(0)
    }
  }, [])

  const removeDocument = useCallback((id) => {
    setDocuments((prev) => {
      const updated = prev.filter((d) => d.id !== id)
      saveDocuments(updated)
      return updated
    })
  }, [])

  return {
    documents,
    isUploading,
    uploadProgress,
    uploadFile,
    removeDocument,
  }
}
