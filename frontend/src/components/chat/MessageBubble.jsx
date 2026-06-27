import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { Bot, User } from 'lucide-react'
import { SourceCards } from '@/components/chat/SourceCard'
import { cn } from '@/utils/cn'

export function MessageBubble({ message }) {
  const isUser = message.role === 'user'

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={cn('flex gap-3', isUser ? 'flex-row-reverse' : 'flex-row')}
    >
      <div
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-lg',
          isUser
            ? 'bg-zinc-800 border border-zinc-700'
            : 'bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20'
        )}
      >
        {isUser ? (
          <User className="h-4 w-4 text-zinc-300" />
        ) : (
          <Bot className="h-4 w-4 text-white" />
        )}
      </div>

      <div className={cn('flex flex-col gap-1 max-w-[85%] sm:max-w-[75%]', isUser && 'items-end')}>
        <div
          className={cn(
            'rounded-2xl px-4 py-3',
            isUser
              ? 'bg-zinc-800 border border-zinc-700/80 text-zinc-100 rounded-tr-md'
              : 'bg-zinc-900/80 border border-zinc-800/80 backdrop-blur-sm text-zinc-200 rounded-tl-md'
          )}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <div className="prose-chat">
              <ReactMarkdown>{message.content}</ReactMarkdown>
            </div>
          )}
        </div>

        {!isUser && message.sources && (
          <div className="w-full">
            <SourceCards sources={message.sources} />
          </div>
        )}
      </div>
    </motion.div>
  )
}
