import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/utils/cn'

export function PromptCard({ prompt, index, onSelect, disabled }) {
  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.3 }}
      whileHover={disabled ? {} : { y: -1 }}
      whileTap={disabled ? {} : { scale: 0.99 }}
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        'group flex items-center justify-between gap-3 rounded-xl border px-4 py-3.5 text-left transition-all duration-200',
        disabled
          ? 'border-[#1e1e22] opacity-40 cursor-not-allowed'
          : 'border-[#1e1e22] bg-[#0f0f11] hover:border-[#2a2a30] hover:bg-[#111113] cursor-pointer'
      )}
    >
      <span className="text-[13px] text-[#c8c8d0] leading-snug">{prompt}</span>
      <ArrowUpRight
        className={cn(
          'h-3.5 w-3.5 shrink-0 transition-all duration-200',
          disabled
            ? 'text-[#3a3a42]'
            : 'text-[#5c5c66] group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5'
        )}
        strokeWidth={1.75}
      />
    </motion.button>
  )
}
