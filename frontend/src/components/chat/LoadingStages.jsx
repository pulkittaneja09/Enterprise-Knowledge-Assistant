import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Search, Database, Sparkles } from 'lucide-react'
import { cn } from '@/utils/cn'

const STAGES = [
  { label: 'Searching documents...', icon: Search, duration: 2200 },
  { label: 'Retrieving context...', icon: Database, duration: 2200 },
  { label: 'Generating answer...', icon: Sparkles, duration: Infinity },
]

export function LoadingStages() {
  const [stageIndex, setStageIndex] = useState(0)

  useEffect(() => {
    if (stageIndex >= STAGES.length - 1) return

    const timer = setTimeout(() => {
      setStageIndex((prev) => Math.min(prev + 1, STAGES.length - 1))
    }, STAGES[stageIndex].duration)

    return () => clearTimeout(timer)
  }, [stageIndex])

  const current = STAGES[stageIndex]
  const Icon = current.icon
  const progress = ((stageIndex + 1) / STAGES.length) * 100

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex gap-4 py-2"
    >
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/15 mt-0.5">
        <Icon className="h-3.5 w-3.5 text-blue-400" />
      </div>

      <div className="flex-1 space-y-3 min-w-0">
        <div className="space-y-2">
          {STAGES.map((stage, i) => {
            const StageIcon = stage.icon
            const isActive = i === stageIndex
            const isDone = i < stageIndex

            return (
              <motion.div
                key={stage.label}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: isActive || isDone ? 1 : 0.35, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-2"
              >
                <StageIcon
                  className={cn(
                    'h-3 w-3 shrink-0',
                    isActive ? 'text-blue-400' : isDone ? 'text-emerald-500' : 'text-[#3a3a42]'
                  )}
                  strokeWidth={1.75}
                />
                <span
                  className={cn(
                    'text-sm',
                    isActive ? 'text-[#c8c8d0]' : isDone ? 'text-[#5c5c66] line-through' : 'text-[#3a3a42]'
                  )}
                >
                  {stage.label}
                </span>
                {isActive && (
                  <span className="flex gap-0.5 ml-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1 w-1 rounded-full bg-blue-400"
                        animate={{ opacity: [0.2, 1, 0.2] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </span>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="h-0.5 w-full max-w-xs rounded-full bg-[#1a1a1e] overflow-hidden">
          <motion.div
            className="h-full bg-blue-500 rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
          />
        </div>
      </div>
    </motion.div>
  )
}
