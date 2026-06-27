import { ChatPage } from '@/pages/ChatPage'
import { ToastContextProvider } from '@/hooks/useToast.jsx'

function App() {
  return (
    <ToastContextProvider>
      <ChatPage />
    </ToastContextProvider>
  )
}

export default App
