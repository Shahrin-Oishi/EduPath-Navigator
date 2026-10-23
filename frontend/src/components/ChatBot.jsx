import { useState, useRef, useEffect } from 'react'
import { MessageSquare, X, Send, Bot, Trash2 } from 'lucide-react'
import api from '../services/api'
import { parseMarkdown } from '../utils/helpers'
import LoadingSpinner from './LoadingSpinner'

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! I'm EduBot 🤖 Your AI learning assistant. Ask me anything about tech careers, learning paths, or programming concepts!" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isOpen])

  const sendMessage = async () => {
    if (!input.trim() || loading) return

    const userMessage = { role: 'user', content: input.trim() }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post('/api/ai/chat', { message: userMessage.content })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error.response?.data?.message || 'Unable to reach the AI service. Please try again.'
      }])
    } finally {
      setLoading(false)
    }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: "Hi! I'm EduBot 🤖 How can I help you today?" }])
    api.delete('/api/ai/chat/history').catch(() => {})
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          fixed bottom-6 right-6 z-50 w-14 h-14 rounded-2xl shadow-2xl
          bg-gradient-to-br from-indigo-500 to-purple-600
          flex items-center justify-center transition-all duration-300
          hover:shadow-indigo-500/40 hover:scale-110 active:scale-95
          ${isOpen ? 'rotate-0' : ''}
        `}
        aria-label="Open AI Chat"
      >
        {isOpen ? <X size={22} className="text-white" /> : <MessageSquare size={22} className="text-white" />}
        {!isOpen && (
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-emerald-400 rounded-full border-2 border-slate-900 animate-bounce-slow" />
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-96 animate-slide-up">
          <div className="glass-card border border-indigo-500/20 shadow-2xl shadow-indigo-500/20 flex flex-col overflow-hidden"
            style={{ height: 'min(480px, calc(100dvh - 120px))' }}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-white/10 bg-gradient-to-r from-indigo-500/20 to-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <Bot size={18} className="text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">EduBot</p>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                    <p className="text-xs text-emerald-400">Online</p>
                  </div>
                </div>
              </div>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
                title="Clear chat"
              >
                <Trash2 size={15} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  {msg.role === 'assistant' && (
                    <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mr-2 mt-1">
                      <Bot size={12} className="text-white" />
                    </div>
                  )}
                  <div className={msg.role === 'user' ? 'chat-message-user' : 'chat-message-ai'}>
                    {msg.role === 'assistant' ? (
                      <div
                        className="text-xs leading-relaxed prose-dark"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                      />
                    ) : (
                      <p className="text-xs">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center mr-2">
                    <Bot size={12} className="text-white" />
                  </div>
                  <div className="chat-message-ai">
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <div className="w-1.5 h-1.5 bg-indigo-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                      <span className="text-xs text-slate-400">Thinking...</span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="p-3 border-t border-white/10">
              <div className="flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything..."
                  rows={1}
                  className="flex-1 input-field text-xs resize-none py-2.5 min-h-[38px] max-h-24"
                  style={{ lineHeight: '1.5' }}
                />
                <button
                  onClick={sendMessage}
                  disabled={!input.trim() || loading}
                  className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white transition-all hover:shadow-lg hover:shadow-indigo-500/30 disabled:opacity-40 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex-shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-xs text-slate-600 mt-1.5 text-center">Press Enter to send • Shift+Enter for new line</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
