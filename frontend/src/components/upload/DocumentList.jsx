import { motion } from 'framer-motion'
import { FileText, X } from 'lucide-react'
import { ScrollArea } from '@/components/ui/scroll-area'
import { formatUploadDate } from '@/utils/storage'

export function DocumentList({ documents, onRemove }) {
  if (documents.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-zinc-800 p-4 text-center">
        <FileText className="mx-auto h-5 w-5 text-zinc-600 mb-2" />
        <p className="text-xs text-zinc-500">No documents uploaded yet</p>
      </div>
    )
  }

  return (
    <ScrollArea className="max-h-48">
      <div className="space-y-1.5 pr-2">
        {documents.map((doc, index) => (
          <motion.div
            key={doc.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            className="group flex items-center gap-2.5 rounded-lg border border-zinc-800/80 bg-zinc-900/50 px-2.5 py-2 hover:border-zinc-700 transition-colors"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-violet-500/10">
              <FileText className="h-3.5 w-3.5 text-violet-400" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-xs font-medium text-zinc-300">
                {doc.filename}
              </p>
              <p className="text-[10px] text-zinc-500">
                {doc.pages} pages · {formatUploadDate(doc.uploadedAt)}
              </p>
            </div>
            <button
              onClick={() => onRemove(doc.id)}
              className="opacity-0 group-hover:opacity-100 p-1 rounded-md text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800 transition-all"
              aria-label={`Remove ${doc.filename}`}
            >
              <X className="h-3 w-3" />
            </button>
          </motion.div>
        ))}
      </div>
    </ScrollArea>
  )
}
