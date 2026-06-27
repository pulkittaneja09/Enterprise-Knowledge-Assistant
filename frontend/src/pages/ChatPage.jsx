import { useState, useCallback } from 'react'
import { useChat } from '@/hooks/useChat'
import { useDocuments } from '@/hooks/useDocuments'
import { useToast } from '@/hooks/useToast'
import { Sidebar, SidebarToggle } from '@/components/layout/Sidebar'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

export function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { toast } = useToast()
  const {
    documents,
    isUploading,
    uploadProgress,
    uploadFile,
    removeDocument,
  } = useDocuments()
  const { messages, isLoading, error, sendMessage, clearChat, clearError } =
    useChat()

  const handleUpload = useCallback(
    async (file) => {
      try {
        await uploadFile(file)
        toast({
          title: 'Upload successful',
          description: `${file.name} has been indexed and is ready for questions.`,
          variant: 'success',
        })
      } catch (err) {
        const message =
          err.response?.data?.detail ||
          err.message ||
          'Failed to upload PDF. Please try again.'
        toast({
          title: 'Upload failed',
          description: typeof message === 'string' ? message : 'An error occurred.',
          variant: 'error',
        })
        throw err
      }
    },
    [uploadFile, toast]
  )

  const handleNewChat = () => {
    clearChat()
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-violet-900/20 via-zinc-950 to-zinc-950"
        aria-hidden
      />

      <Sidebar
        documents={documents}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onUpload={handleUpload}
        onRemoveDocument={removeDocument}
        onNewChat={handleNewChat}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <main className="relative flex flex-1 flex-col min-w-0">
        <header className="flex items-center gap-3 border-b border-zinc-800/60 bg-zinc-950/50 backdrop-blur-xl px-4 py-3 lg:px-6">
          <SidebarToggle onClick={() => setSidebarOpen(true)} />
          <div className="flex-1 min-w-0">
            <h1 className="text-sm font-medium text-zinc-300 truncate">
              {messages.length > 0 ? 'Conversation' : 'KnowledgeHub AI'}
            </h1>
          </div>
          {documents.length > 0 && (
            <span className="hidden sm:inline-flex items-center rounded-full bg-violet-500/10 border border-violet-500/20 px-2.5 py-0.5 text-[11px] font-medium text-violet-400">
              {documents.length} document{documents.length !== 1 ? 's' : ''} indexed
            </span>
          )}
        </header>

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
          onClearError={clearError}
        />

        <ChatInput
          onSend={sendMessage}
          disabled={isLoading || documents.length === 0}
          hasDocuments={documents.length > 0}
        />
      </main>
    </div>
  )
}
