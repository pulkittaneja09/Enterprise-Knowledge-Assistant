import { useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowUp } from 'lucide-react'
import { cn } from '@/utils/cn'

export function ChatInput({
  value,
  onChange,
  onSend,
  disabled,
  hasDocuments,
}) {
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    }
  }, [value])

  useEffect(() => {
    if (value) {
      textareaRef.current?.focus()
    }
  }, [value])

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="shrink-0 border-t border-[#1e1e22] bg-[#09090b]/90 backdrop-blur-xl">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-4">
        {!hasDocuments && (
          <p className="mb-2.5 text-center text-[11px] text-[#5c5c66]">
            Upload a PDF to start asking questions
          </p>
        )}

        <motion.div
          layout
          className={cn(
            'relative flex items-end gap-2 rounded-2xl border bg-[#0f0f11] p-2 transition-all duration-200',
            'border-[#1e1e22] focus-within:border-[#2a2a30] focus-within:shadow-[0_0_0_1px_rgba(59,130,246,0.08)]'
          )}
        >
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything about your documents..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent px-2 py-2.5 text-[15px] text-[#ececee] placeholder:text-[#3a3a42] focus:outline-none disabled:opacity-40 max-h-40 leading-relaxed"
          />

          <button
            type="button"
            disabled={disabled || !value.trim()}
            onClick={handleSubmit}
            aria-label="Send message"
            className={cn(
              'flex h-8 w-8 shrink-0 items-center justify-center rounded-xl transition-all duration-150 mb-0.5',
              value.trim() && !disabled
                ? 'bg-blue-600 text-white hover:bg-blue-500 active:scale-95'
                : 'bg-[#1a1a1e] text-[#3a3a42] cursor-not-allowed'
            )}
          >
            <ArrowUp className="h-4 w-4" strokeWidth={2} />
          </button>
        </motion.div>

        <p className="mt-2 text-center text-[10px] text-[#3a3a42]">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
