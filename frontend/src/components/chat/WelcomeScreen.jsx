import { motion } from 'framer-motion'
import { LogoMark } from '@/components/brand/Logo'
import { PromptCard } from '@/components/chat/PromptCard'

const EXAMPLE_PROMPTS = [
  'Summarize this document',
  'Explain the leave policy',
  'Compare two documents',
  'What are the sales projections?',
]

export function WelcomeScreen({ onSelectPrompt, hasDocuments }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-6 py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="w-full max-w-2xl text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.4 }}
          className="mx-auto mb-8"
        >
          <LogoMark size="xl" className="mx-auto" />
        </motion.div>

        <h1 className="font-display text-[2rem] sm:text-[2.5rem] font-semibold tracking-tight text-[#ececee] leading-tight">
          KnowledgeHub AI
        </h1>

        <p className="mt-3 text-base sm:text-lg text-[#8b8b96] font-medium">
          Chat with enterprise documents
        </p>

        <p className="mt-2 text-sm text-[#5c5c66] leading-relaxed max-w-md mx-auto">
          Upload PDFs and ask intelligent questions using AI.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="mt-12 w-full max-w-2xl"
      >
        <p className="text-[11px] font-medium uppercase tracking-wider text-[#5c5c66] mb-3 text-center">
          Try asking
        </p>
        <div className="grid gap-2 sm:grid-cols-2">
          {EXAMPLE_PROMPTS.map((prompt, index) => (
            <PromptCard
              key={prompt}
              prompt={prompt}
              index={index}
              disabled={!hasDocuments}
              onSelect={() => onSelectPrompt(prompt)}
            />
          ))}
        </div>

        {!hasDocuments && (
          <p className="mt-4 text-center text-xs text-[#5c5c66]">
            Upload a document from the sidebar to get started
          </p>
        )}
      </motion.div>
    </div>
  )
}
