import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, CheckCircle2 } from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/cn'

export function FileUpload({ onUpload, isUploading, uploadProgress }) {
  const [isDragging, setIsDragging] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const inputRef = useRef(null)

  const handleFile = useCallback(
    async (file) => {
      if (!file || isUploading) return
      try {
        await onUpload(file)
        setShowSuccess(true)
        setTimeout(() => setShowSuccess(false), 2500)
      } catch {
        // Error handled by parent
      }
    },
    [onUpload, isUploading]
  )

  const onDrop = useCallback(
    (e) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files?.[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  return (
    <div className="space-y-2">
      <div
        onDrop={onDrop}
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
        onDragLeave={(e) => { e.preventDefault(); setIsDragging(false) }}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={cn(
          'group relative flex flex-col items-center justify-center gap-2.5 rounded-xl border border-dashed px-4 py-5 transition-all duration-200 cursor-pointer overflow-hidden',
          isDragging
            ? 'border-blue-500/50 bg-blue-500/[0.04]'
            : 'border-[#2a2a30] bg-[#0f0f11] hover:border-[#3a3a42] hover:bg-[#111113]',
          isUploading && 'pointer-events-none',
          showSuccess && 'border-emerald-500/30 bg-emerald-500/[0.03]'
        )}
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf,.pdf"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFile(file)
            e.target.value = ''
          }}
        />

        <AnimatePresence mode="wait">
          {showSuccess ? (
            <motion.div
              key="success"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <CheckCircle2 className="h-6 w-6 text-emerald-400" />
              <p className="text-xs font-medium text-emerald-400">Indexed successfully</p>
            </motion.div>
          ) : isUploading ? (
            <motion.div
              key="uploading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2 w-full"
            >
              <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                <Upload className="h-4 w-4 text-blue-400 animate-pulse" />
              </div>
              <p className="text-xs font-medium text-[#c8c8d0]">Processing document</p>
              <div className="w-full space-y-1.5 px-2">
                <div className="flex justify-between text-[10px] text-[#5c5c66]">
                  <span>Uploading & indexing</span>
                  <span>{uploadProgress}%</span>
                </div>
                <Progress value={uploadProgress} />
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="idle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-[#1a1a1e] flex items-center justify-center group-hover:bg-blue-500/10 transition-colors">
                <Upload className="h-4 w-4 text-[#5c5c66] group-hover:text-blue-400 transition-colors" />
              </div>
              <div className="text-center">
                <p className="text-xs font-medium text-[#c8c8d0]">Drop PDF here</p>
                <p className="text-[10px] text-[#5c5c66] mt-0.5">or click to browse</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
