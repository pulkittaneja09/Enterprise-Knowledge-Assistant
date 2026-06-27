import { motion, AnimatePresence } from 'framer-motion'
import { X, Info, FileText, Zap } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
import { Button } from '@/components/ui/button'

export function SettingsPanel({ open, onClose, documentCount }) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-[2px]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ type: 'spring', stiffness: 400, damping: 35 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-sm border-l border-[#1e1e22] bg-[#0c0c0e]/95 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between border-b border-[#1e1e22] px-5 py-4">
              <h2 className="font-display text-sm font-semibold text-[#ececee]">Settings</h2>
              <button
                onClick={onClose}
                className="rounded-md p-1.5 text-[#5c5c66] hover:text-[#ececee] hover:bg-white/[0.04] transition-colors"
                aria-label="Close settings"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="p-5 space-y-6">
              <div className="rounded-xl border border-[#1e1e22] bg-[#0f0f11] p-4">
                <Logo showTagline size="sm" />
                <p className="mt-3 text-xs text-[#5c5c66] leading-relaxed">
                  Enterprise Document Intelligence powered by Retrieval-Augmented Generation.
                </p>
              </div>

              <div className="space-y-2">
                <p className="text-[11px] font-medium uppercase tracking-wider text-[#5c5c66] px-1">
                  Status
                </p>
                <div className="rounded-xl border border-[#1e1e22] divide-y divide-[#1e1e22]">
                  <div className="flex items-center gap-3 px-4 py-3">
                    <FileText className="h-4 w-4 text-[#5c5c66]" />
                    <div className="flex-1">
                      <p className="text-xs text-[#8b8b96]">Indexed documents</p>
                      <p className="text-sm font-medium text-[#ececee]">{documentCount}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Zap className="h-4 w-4 text-blue-400" />
                    <div className="flex-1">
                      <p className="text-xs text-[#8b8b96]">Engine</p>
                      <p className="text-sm font-medium text-[#ececee]">RAG Pipeline</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 px-4 py-3">
                    <Info className="h-4 w-4 text-[#5c5c66]" />
                    <div className="flex-1">
                      <p className="text-xs text-[#8b8b96]">Version</p>
                      <p className="text-sm font-medium text-[#ececee]">1.0.0</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button variant="secondary" className="w-full" onClick={onClose}>
                Done
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
