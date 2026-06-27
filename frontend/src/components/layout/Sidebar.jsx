import { motion } from 'framer-motion'
import { Plus, Settings, PanelLeftClose } from 'lucide-react'
import { Logo } from '@/components/brand/Logo'
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
  onOpenSettings,
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
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-[2px] lg:hidden"
          onClick={onToggle}
        />
      )}

      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 flex w-[272px] flex-col border-r border-[#1e1e22] bg-[#0c0c0e] transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]',
          'lg:static lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        )}
      >
        {/* Brand */}
        <div className="flex items-center justify-between px-4 pt-5 pb-4">
          <Logo showTagline size="md" />
          <button
            onClick={onToggle}
            className="lg:hidden rounded-md p-1.5 text-[#5c5c66] hover:text-[#ececee] hover:bg-white/[0.04] transition-colors"
            aria-label="Close sidebar"
          >
            <PanelLeftClose className="h-4 w-4" />
          </button>
        </div>

        {/* Actions */}
        <div className="px-3 pb-3 space-y-1">
          <Button
            variant="secondary"
            className="w-full justify-start h-9 font-normal"
            onClick={onNewChat}
          >
            <Plus className="h-3.5 w-3.5 text-[#5c5c66]" />
            New Chat
          </Button>
        </div>

        <div className="mx-3 h-px bg-[#1e1e22]" />

        {/* Scrollable content */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          <section>
            <h3 className="mb-2.5 px-2 text-[11px] font-medium uppercase tracking-wider text-[#5c5c66]">
              Documents
            </h3>
            <FileUpload
              onUpload={onUpload}
              isUploading={isUploading}
              uploadProgress={uploadProgress}
            />
          </section>

          <section>
            <h3 className="mb-2.5 px-2 text-[11px] font-medium uppercase tracking-wider text-[#5c5c66]">
              Recent Documents
            </h3>
            <DocumentList documents={documents} onRemove={onRemoveDocument} />
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-[#1e1e22] p-3">
          <button
            onClick={onOpenSettings}
            className="flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-[#8b8b96] hover:text-[#ececee] hover:bg-white/[0.04] transition-colors"
          >
            <Settings className="h-4 w-4" />
            Settings
          </button>
        </div>
      </aside>
    </>
  )
}
