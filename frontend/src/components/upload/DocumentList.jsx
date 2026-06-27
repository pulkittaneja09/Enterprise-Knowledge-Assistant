import { motion } from 'framer-motion'
import { FileText, X } from 'lucide-react'
import { formatUploadDate } from '@/utils/storage'

export function DocumentList({ documents, onRemove }) {
  if (documents.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-[#1e1e22] px-4 py-6 text-center">
        <FileText className="mx-auto h-4 w-4 text-[#3a3a42] mb-2" strokeWidth={1.5} />
        <p className="text-[11px] text-[#5c5c66]">No documents yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-0.5">
      {documents.map((doc, index) => (
        <motion.div
          key={doc.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.04, duration: 0.2 }}
          className="group flex items-center gap-2.5 rounded-lg px-2 py-2 hover:bg-white/[0.03] transition-colors"
        >
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-[#141416] border border-[#1e1e22]">
            <FileText className="h-3.5 w-3.5 text-[#5c5c66]" strokeWidth={1.5} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-[13px] text-[#c8c8d0] leading-tight">
              {doc.filename}
            </p>
            <p className="text-[10px] text-[#5c5c66] mt-0.5">
              {doc.pages} pg · {formatUploadDate(doc.uploadedAt)}
            </p>
          </div>
          <button
            onClick={() => onRemove(doc.id)}
            className="opacity-0 group-hover:opacity-100 rounded p-1 text-[#5c5c66] hover:text-[#ececee] hover:bg-white/[0.06] transition-all"
            aria-label={`Remove ${doc.filename}`}
          >
            <X className="h-3 w-3" />
          </button>
        </motion.div>
      ))}
    </div>
  )
}
