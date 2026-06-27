import { useRef, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { MessageBubble } from '@/components/chat/MessageBubble'
import { LoadingStages } from '@/components/chat/LoadingStages'
import { WelcomeScreen } from '@/components/chat/WelcomeScreen'

export function ChatMessages({
  messages,
  isLoading,
  error,
  onClearError,
  onSelectPrompt,
  hasDocuments,
}) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isLoading])

  const isEmpty = messages.length === 0 && !isLoading

  if (isEmpty) {
    return (
      <WelcomeScreen
        onSelectPrompt={onSelectPrompt}
        hasDocuments={hasDocuments}
      />
    )
  }

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 py-8 space-y-8">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}
        </AnimatePresence>

        {isLoading && <LoadingStages key="loading" />}

        {error && (
          <div className="rounded-xl border border-red-500/20 bg-red-500/[0.04] px-4 py-3 flex items-center justify-between gap-4">
            <p className="text-sm text-red-400/90">{error}</p>
            <button
              onClick={onClearError}
              className="text-xs text-red-400/70 hover:text-red-400 shrink-0 transition-colors"
            >
              Dismiss
            </button>
          </div>
        )}

        <div ref={bottomRef} className="h-1" />
      </div>
    </div>
  )
}
