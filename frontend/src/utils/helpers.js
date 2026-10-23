export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export const getLevelColor = (level) => {
  const colors = {
    beginner: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
    intermediate: { bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
    advanced: { bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
  }
  return colors[level] || colors.beginner
}

export const getDifficultyLabel = (level) => {
  const labels = { beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced' }
  return labels[level] || 'Beginner'
}

export const truncate = (str, n) => {
  return str?.length > n ? str.slice(0, n - 1) + '…' : str
}

export const getInitials = (name) => {
  if (!name) return 'U'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export const parseMarkdown = (text) => {
  if (!text) return ''
  const codeBlocks = []
  const escaped = String(text)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;')
    .replace(/```[^\n]*\n([\s\S]*?)```/g, (_, code) => {
      codeBlocks.push(`<pre><code>${code}</code></pre>`)
      return `\u0000${codeBlocks.length - 1}\u0000`
    })
  return escaped
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code>$1</code>')
    .replace(/^&gt; (.*$)/gim, '<blockquote>$1</blockquote>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/^\d+\. (.*$)/gim, '<li>$1</li>')
    .replace(/\n\n/g, '</p><p>')
    .replace(/\n/g, '<br/>')
    .replace(/\u0000(\d+)\u0000/g, (_, index) => codeBlocks[Number(index)] || '')
}

export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))
