import { motion } from 'framer-motion'
import { MarkdownContent } from '@/components/chat/MarkdownContent'
import { SourceCards } from '@/components/chat/SourceCard'
import { cn } from '@/utils/cn'

export function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.article
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={cn('group', isUser ? 'flex justify-end' : 'flex justify-start')}
    >
      {isUser ? (
        <div className="max-w-[min(85%,36rem)]">
          <div className="rounded-2xl rounded-br-md bg-[#141416] border border-[#1e1e22] px-4 py-3">
            <p className="text-[15px] leading-relaxed text-[#ececee] whitespace-pre-wrap">
              {message.content}
            </p>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[min(100%,42rem)]">
          <div className="rounded-2xl rounded-bl-md bg-transparent px-1 py-1">
            <MarkdownContent>{message.content}</MarkdownContent>
            {message.sources && <SourceCards sources={message.sources} />}
          </div>
        </div>
      )}
    </motion.article>
  )
}
