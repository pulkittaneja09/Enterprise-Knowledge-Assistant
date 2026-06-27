import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import { getDisplayFilename } from '@/utils/storage'

export function SourceCard({ source, index }) {
  const filename = getDisplayFilename(source.file)

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="flex items-center gap-3 rounded-xl border border-zinc-800/80 bg-zinc-900/60 backdrop-blur-sm px-3.5 py-2.5 hover:border-violet-500/30 hover:bg-zinc-900/80 transition-all duration-200"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500/20 to-indigo-500/20 border border-violet-500/20">
        <FileText className="h-4 w-4 text-violet-400" />
      </div>
      <div className="min-w-0">
        <p className="truncate text-sm font-medium text-zinc-200">{filename}</p>
        <p className="text-xs text-zinc-500">Page {source.page}</p>
      </div>
    </motion.div>
  )
}

export function SourceCards({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="mt-3 space-y-2">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-wider">
        Sources
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source, index) => (
          <SourceCard key={`${source.file}-${source.page}-${index}`} source={source} index={index} />
        ))}
      </div>
    </div>
  )
}
