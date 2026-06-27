import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/utils/cn'

export function ChatInput({ onSend, disabled, hasDocuments }) {
  const [value, setValue] = useState('')
  const textareaRef = useRef(null)

  useEffect(() => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${Math.min(textarea.scrollHeight, 160)}px`
    }
  }, [value])

  const handleSubmit = () => {
    if (!value.trim() || disabled) return
    onSend(value)
    setValue('')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  return (
    <div className="border-t border-zinc-800/80 bg-zinc-950/80 backdrop-blur-xl p-4">
      <div className="mx-auto max-w-3xl">
        {!hasDocuments && (
          <p className="mb-2 text-center text-xs text-amber-500/80">
            Upload a PDF first to start asking questions
          </p>
        )}

        <motion.div
          layout
          className={cn(
            'relative flex items-end gap-2 rounded-2xl border bg-zinc-900/60 p-2 shadow-xl transition-colors',
            'border-zinc-800 focus-within:border-violet-500/40 focus-within:shadow-violet-500/5'
          )}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center">
            <Sparkles className="h-4 w-4 text-violet-400/60" />
          </div>

          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask a question about your documents..."
            disabled={disabled}
            rows={1}
            className="flex-1 resize-none bg-transparent py-2.5 text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none disabled:opacity-50 max-h-40"
          />

          <Button
            size="icon"
            disabled={disabled || !value.trim()}
            onClick={handleSubmit}
            className="h-10 w-10 shrink-0 rounded-xl"
            aria-label="Send message"
          >
            <Send className="h-4 w-4" />
          </Button>
        </motion.div>

        <p className="mt-2 text-center text-[11px] text-zinc-600">
          Press Enter to send · Shift+Enter for new line
        </p>
      </div>
    </div>
  )
}
