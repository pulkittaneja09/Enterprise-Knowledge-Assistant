import { useState, useCallback } from 'react'
import { askQuestion } from '@/services/api'
import { generateId } from '@/utils/storage'

/**
 * @returns {{
 *   messages: import('../types').ChatMessage[],
 *   isLoading: boolean,
 *   error: string | null,
 *   sendMessage: (content: string) => Promise<void>,
 *   clearChat: () => void,
 *   clearError: () => void,
 * }}
 */
export function useChat() {
  const [messages, setMessages] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const sendMessage = useCallback(async (content) => {
    const trimmed = content.trim()
    if (!trimmed || isLoading) return

    const userMessage = {
      id: generateId(),
      role: 'user',
      content: trimmed,
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)
    setError(null)

    try {
      const response = await askQuestion(trimmed)

      const assistantMessage = {
        id: generateId(),
        role: 'assistant',
        content: response.answer,
        sources: response.sources,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (err) {
      const message =
        err.response?.data?.detail ||
        err.message ||
        'Failed to get a response. Please try again.'
      setError(typeof message === 'string' ? message : JSON.stringify(message))
    } finally {
      setIsLoading(false)
    }
  }, [isLoading])

  const clearChat = useCallback(() => {
    setMessages([])
    setError(null)
  }, [])

  const clearError = useCallback(() => setError(null), [])

  return { messages, isLoading, error, sendMessage, clearChat, clearError }
}
