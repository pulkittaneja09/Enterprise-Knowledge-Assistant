import { useState, useCallback } from 'react'
import { useChat } from '@/hooks/useChat'
import { useDocuments } from '@/hooks/useDocuments'
import { useToast } from '@/hooks/useToast'
import { Sidebar } from '@/components/layout/Sidebar'
import { AppHeader } from '@/components/layout/AppHeader'
import { SettingsPanel } from '@/components/layout/SettingsPanel'
import { ChatMessages } from '@/components/chat/ChatMessages'
import { ChatInput } from '@/components/chat/ChatInput'

export function ChatPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [draft, setDraft] = useState('')
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
          title: 'Document indexed',
          description: `${file.name} is ready for questions.`,
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

  const handleSend = useCallback(
    async (text) => {
      setDraft('')
      await sendMessage(text)
    },
    [sendMessage]
  )

  const handleSelectPrompt = useCallback((prompt) => {
    if (documents.length === 0) return
    setDraft(prompt)
  }, [documents.length])

  const handleNewChat = () => {
    clearChat()
    setDraft('')
    setSidebarOpen(false)
  }

  return (
    <div className="flex h-[100dvh] overflow-hidden bg-[#09090b]">
      <div className="pointer-events-none fixed inset-0 bg-grid opacity-50" aria-hidden />
      <div
        className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(59,130,246,0.07),transparent)]"
        aria-hidden
      />

      <Sidebar
        documents={documents}
        isUploading={isUploading}
        uploadProgress={uploadProgress}
        onUpload={handleUpload}
        onRemoveDocument={removeDocument}
        onNewChat={handleNewChat}
        onOpenSettings={() => setSettingsOpen(true)}
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((prev) => !prev)}
      />

      <main className="relative flex flex-1 flex-col min-w-0">
        <AppHeader
          onOpenSidebar={() => setSidebarOpen(true)}
          documentCount={documents.length}
          hasMessages={messages.length > 0}
          onOpenSettings={() => setSettingsOpen(true)}
        />

        <ChatMessages
          messages={messages}
          isLoading={isLoading}
          error={error}
          onClearError={clearError}
          onSelectPrompt={handleSelectPrompt}
          hasDocuments={documents.length > 0}
        />

        <ChatInput
          value={draft}
          onChange={setDraft}
          onSend={handleSend}
          disabled={isLoading || documents.length === 0}
          hasDocuments={documents.length > 0}
        />
      </main>

      <SettingsPanel
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        documentCount={documents.length}
      />
    </div>
  )
}
