import { parseMarkdown } from '../utils/helpers'
import { Copy, Check } from 'lucide-react'
import { useState } from 'react'

export default function AIResponseDisplay({ content, title }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="glass-card overflow-hidden animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-white/3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          <span className="text-sm font-medium text-slate-300">{title || 'AI Generated Response'}</span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 rounded-lg hover:bg-white/10"
        >
          {copied ? <Check size={13} className="text-emerald-400" /> : <Copy size={13} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Content */}
      <div className="p-5 max-h-[600px] overflow-y-auto">
        <div
          className="prose-dark text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: parseMarkdown(content) }}
        />
      </div>
    </div>
  )
}
