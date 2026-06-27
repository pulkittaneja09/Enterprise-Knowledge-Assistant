import { useState } from 'react'
import { motion } from 'framer-motion'
import { FileText, ChevronDown } from 'lucide-react'
import { getDisplayFilename } from '@/utils/storage'
import { cn } from '@/utils/cn'

export function SourceCard({ source, index }) {
  const [expanded, setExpanded] = useState(false)
  const filename = getDisplayFilename(source.file)

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.25 }}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.985 }}
      onClick={() => setExpanded((prev) => !prev)}
      className={cn(
        'group w-full text-left rounded-xl border bg-[#0f0f11] transition-all duration-200',
        expanded
          ? 'border-blue-500/25 shadow-sm shadow-blue-500/5'
          : 'border-[#1e1e22] hover:border-[#2a2a30] hover:bg-[#111113]'
      )}
    >
      <div className="flex items-center gap-3 px-3.5 py-3">
        <div className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border transition-colors',
          expanded
            ? 'bg-blue-500/10 border-blue-500/20'
            : 'bg-[#141416] border-[#1e1e22] group-hover:border-[#2a2a30]'
        )}>
          <FileText className={cn('h-3.5 w-3.5', expanded ? 'text-blue-400' : 'text-[#5c5c66]')} strokeWidth={1.5} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-[13px] font-medium text-[#ececee]">{filename}</p>
          <p className="text-[11px] text-[#5c5c66] mt-0.5">Page {source.page}</p>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="text-[#5c5c66]"
        >
          <ChevronDown className="h-3.5 w-3.5" />
        </motion.div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: expanded ? 'auto' : 0, opacity: expanded ? 1 : 0 }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
        className="overflow-hidden"
      >
        <div className="border-t border-[#1e1e22] px-3.5 py-2.5">
          <p className="text-[10px] font-medium uppercase tracking-wider text-[#5c5c66] mb-1">Source path</p>
          <p className="text-[11px] text-[#8b8b96] break-all font-mono leading-relaxed">
            {source.file}
          </p>
        </div>
      </motion.div>
    </motion.button>
  )
}

export function SourceCards({ sources }) {
  if (!sources?.length) return null

  return (
    <div className="mt-4 pt-3 border-t border-[#1e1e22]/60">
      <p className="text-[10px] font-medium uppercase tracking-wider text-[#5c5c66] mb-2.5">
        {sources.length} source{sources.length !== 1 ? 's' : ''}
      </p>
      <div className="grid gap-2 sm:grid-cols-2">
        {sources.map((source, index) => (
          <SourceCard
            key={`${source.file}-${source.page}-${index}`}
            source={source}
            index={index}
          />
        ))}
      </div>
    </div>
  )
}
