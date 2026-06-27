import { useCallback, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Upload, FileText, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/utils/cn'

export function FileUpload({ onUpload, isUploading, uploadProgress }) {
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef(null)

  const handleFile = useCallback(
    async (file) => {
      if (!file || isUploading) return
      try {
        await onUpload(file)
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

  const onDragOver = useCallback((e) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const onDragLeave = useCallback((e) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  return (
    <div className="space-y-3">
      <div
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => !isUploading && inputRef.current?.click()}
        className={cn(
          'relative flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4 transition-all duration-200 cursor-pointer',
          isDragging
            ? 'border-violet-500 bg-violet-500/10'
            : 'border-zinc-700/80 bg-zinc-900/40 hover:border-zinc-600 hover:bg-zinc-800/40',
          isUploading && 'pointer-events-none opacity-70'
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

        {isUploading ? (
          <Loader2 className="h-6 w-6 text-violet-400 animate-spin" />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/15">
            <Upload className="h-5 w-5 text-violet-400" />
          </div>
        )}

        <div className="text-center">
          <p className="text-xs font-medium text-zinc-300">
            {isUploading ? 'Processing PDF...' : 'Drop PDF here'}
          </p>
          <p className="text-[11px] text-zinc-500 mt-0.5">
            {isUploading ? 'Embedding & indexing' : 'or click to browse'}
          </p>
        </div>
      </div>

      <AnimatePresence>
        {isUploading && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-1.5 overflow-hidden"
          >
            <div className="flex justify-between text-[11px] text-zinc-500">
              <span>Uploading</span>
              <span>{uploadProgress}%</span>
            </div>
            <Progress value={uploadProgress} />
          </motion.div>
        )}
      </AnimatePresence>

      <Button
        variant="secondary"
        size="sm"
        className="w-full"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
      >
        <FileText className="h-3.5 w-3.5" />
        Upload PDF
      </Button>
    </div>
  )
}
