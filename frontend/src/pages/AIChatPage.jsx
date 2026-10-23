import { useState, useRef, useEffect } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import api from '../services/api'
import { parseMarkdown } from '../utils/helpers'
import { MessageSquare, Send, Bot, Trash2, Lightbulb } from 'lucide-react'

const quickQuestions = [
  'How do I get started with web development?',
  'What skills do I need for a junior developer job?',
  'How long does it take to learn React?',
  'Should I learn frontend or backend first?',
  'How do I build my first portfolio project?',
  'What is the best way to practice coding daily?',
]

export default function AIChatPage() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! I'm **EduBot** 🤖, your AI learning assistant. I'm here to help you with:\n\n- Career guidance and roadmap questions\n- Explaining technical concepts\n- Study tips and learning strategies\n- Project ideas and recommendations\n- Interview preparation advice\n\nWhat would you like to know?" }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Load history
  useEffect(() => {
    api.get('/api/ai/chat/history')
      .then(res => {
        if (res.data.messages?.length > 0) {
          setMessages(res.data.messages)
        }
      })
      .catch(() => {})
  }, [])

  const sendMessage = async (text) => {
    const msg = text || input.trim()
    if (!msg || loading) return

    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setInput('')
    setLoading(true)

    try {
      const res = await api.post('/api/ai/chat', { message: msg })
      setMessages(prev => [...prev, { role: 'assistant', content: res.data.reply }])
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: error.response?.data?.message || 'Unable to reach the AI service. Please try again.'
      }])
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const clearChat = async () => {
    await api.delete('/api/ai/chat/history').catch(() => {})
    setMessages([{ role: 'assistant', content: "Chat cleared! How can I help you today?" }])
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto animate-fade-in pb-6" style={{ height: 'calc(100vh - 120px)' }}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4 flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <MessageSquare size={22} className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">AI Chat Assistant</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                  <p className="text-sm text-emerald-400">EduBot is online</p>
                </div>
              </div>
            </div>
            <button onClick={clearChat} className="flex items-center gap-2 text-sm text-slate-400 hover:text-white btn-secondary py-2 px-4">
              <Trash2 size={14} />
              Clear Chat
            </button>
          </div>

          {/* Quick questions */}
          <div className="flex gap-2 overflow-x-auto pb-2 mb-3 flex-shrink-0 scrollbar-none">
            {quickQuestions.map(q => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                disabled={loading}
                className="whitespace-nowrap text-xs px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all flex-shrink-0 flex items-center gap-1.5"
              >
                <Lightbulb size={11} className="text-amber-400" />
                {q}
              </button>
            ))}
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto glass-card p-5 space-y-5 mb-4">
            {messages.map((msg, i) => (
              <div key={i} className={`flex gap-3 animate-fade-in ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                {/* Avatar */}
                {msg.role === 'assistant' ? (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <Bot size={14} className="text-white" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-white text-xs font-bold">You</span>
                  </div>
                )}

                {/* Bubble */}
                <div className={`max-w-[75%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block rounded-2xl px-4 py-3 text-sm leading-relaxed
                    ${msg.role === 'user'
                      ? 'bg-gradient-to-br from-indigo-500 to-purple-600 text-white rounded-tr-sm'
                      : 'bg-white/8 text-slate-200 rounded-tl-sm border border-white/10'
                    }`}>
                    {msg.role === 'assistant' ? (
                      <div
                        className="prose-dark"
                        dangerouslySetInnerHTML={{ __html: parseMarkdown(msg.content) }}
                      />
                    ) : (
                      <p>{msg.content}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading bubble */}
            {loading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center flex-shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      {[0, 150, 300].map(delay => (
                        <div key={delay} className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: `${delay}ms` }} />
                      ))}
                    </div>
                    <span className="text-sm text-slate-400">EduBot is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="glass-card p-4 flex-shrink-0">
            <div className="flex gap-3 items-end">
              <textarea
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask EduBot anything about your learning journey..."
                rows={2}
                className="flex-1 input-field resize-none text-sm min-h-[52px] max-h-32 py-3"
              />
              <button
                onClick={() => sendMessage()}
                disabled={!input.trim() || loading}
                className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center text-white transition-all hover:shadow-lg hover:shadow-emerald-500/30 disabled:opacity-40 hover:scale-105 active:scale-95 flex-shrink-0"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-xs text-slate-600 mt-2">Press Enter to send · Shift+Enter for new line</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
