import { motion } from 'framer-motion'
import { Sparkles, Upload, MessageSquare, FileSearch } from 'lucide-react'

const features = [
  {
    icon: Upload,
    title: 'Upload Documents',
    description: 'Drop PDFs into the sidebar to index them instantly.',
  },
  {
    icon: MessageSquare,
    title: 'Natural Language Q&A',
    description: 'Ask questions in plain English and get precise answers.',
  },
  {
    icon: FileSearch,
    title: 'Source Citations',
    description: 'Every answer links back to the exact page in your PDFs.',
  },
]

export function WelcomeScreen() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
          className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-2xl shadow-violet-500/30"
        >
          <Sparkles className="h-8 w-8 text-white" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-3">
          KnowledgeHub{' '}
          <span className="bg-gradient-to-r from-violet-400 to-indigo-400 bg-clip-text text-transparent">
            AI
          </span>
        </h1>

        <p className="text-lg text-zinc-400 mb-2">
          Chat with your PDFs using AI.
        </p>

        <p className="text-sm text-zinc-500 leading-relaxed max-w-lg mx-auto">
          Upload enterprise documents, research papers, manuals or reports and
          ask natural language questions.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="mt-12 grid gap-4 sm:grid-cols-3 max-w-3xl w-full"
      >
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm p-4 text-center hover:border-zinc-700/80 transition-colors"
          >
            <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10">
              <feature.icon className="h-5 w-5 text-violet-400" />
            </div>
            <h3 className="text-sm font-medium text-zinc-200 mb-1">
              {feature.title}
            </h3>
            <p className="text-xs text-zinc-500 leading-relaxed">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}
