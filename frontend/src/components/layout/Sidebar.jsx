import { motion } from 'framer-motion'
import { Plus, Sparkles, PanelLeftClose, PanelLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { FileUpload } from '@/components/upload/FileUpload'
import { DocumentList } from '@/components/upload/DocumentList'
import { cn } from '@/utils/cn'

export function Sidebar({
  documents,
  isUploading,
  uploadProgress,
  onUpload,
  onRemoveDocument,
  onNewChat,
  isOpen,
  onToggle,
}) {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-zinc-800/80 bg-zinc-950/95 backdrop-blur-xl transition-transform duration-300 ease-out',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 shadow-lg shadow-violet-500/20">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-zinc-100">KnowledgeHub AI</h2>
              <p className="text-[10px] text-zinc-500 leading-tight max-w-[160px]">
                RAG-powered document chat
              </p>
            </div>
          </div>

          <button
            onClick={onToggle}
            className="lg:hidden p-1.5 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={onNewChat}
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>

          <div>
            <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Upload PDF
            </h3>
            <FileUpload
              onUpload={onUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          </div>

          <div>
            <h3 className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-3">
              Documents ({documents.length})
            </h3>
            <DocumentList documents={documents} onRemove={onRemoveDocument} />
          </div>
        </div>

        <div className="border-t border-zinc-800/80 p-4">
          <p className="text-[10px] text-zinc-600 text-center leading-relaxed">
            Chat with your documents using AI-powered Retrieval-Augmented Generation.
          </p>
        </div>
      </aside>
    </>
  )
}

export function SidebarToggle({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="lg:hidden p-2 rounded-lg text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/80 transition-colors"
      aria-label="Open sidebar"
    >
      <PanelLeft className="h-5 w-5" />
    </button>
  )
}
