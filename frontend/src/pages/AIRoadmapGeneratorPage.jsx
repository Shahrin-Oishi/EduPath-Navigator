import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import AIResponseDisplay from '../components/AIResponseDisplay'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'
import { Wand2, Send, Lightbulb, AlertCircle } from 'lucide-react'

const examples = [
  'I want to become a full-stack web developer',
  'I want to become a machine learning engineer',
  'I want to become a cybersecurity analyst',
  'I want to become a DevOps engineer',
  'I want to become a mobile app developer',
  'I want to become a data scientist',
]

export default function AIRoadmapGeneratorPage() {
  const [goal, setGoal] = useState('')
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleGenerate = async () => {
    if (!goal.trim() || goal.trim().length < 5) {
      setError('Please describe your career goal (at least 5 characters).')
      return
    }
    setError('')
    setLoading(true)
    setResult('')
    try {
      const res = await api.post('/api/ai/generate-roadmap', { goal: goal.trim() })
      setResult(res.data.roadmap)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to generate roadmap. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleGenerate()
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl shadow-lg shadow-indigo-500/30 mb-5">
            <Wand2 size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">AI Roadmap Generator</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Tell the AI your career goal and get a personalized, step-by-step learning roadmap tailored just for you.
          </p>
        </div>

        {/* Input Card */}
        <div className="glass-card p-6 border-indigo-500/20">
          <label className="label text-base mb-3">What's your career goal?</label>
          <textarea
            value={goal}
            onChange={(e) => { setGoal(e.target.value); setError('') }}
            onKeyDown={handleKeyDown}
            placeholder="e.g., I want to become a machine learning engineer who builds NLP systems..."
            rows={4}
            className="input-field resize-none w-full mb-4"
          />

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-500">Ctrl+Enter to generate</p>
            <button
              onClick={handleGenerate}
              disabled={loading || !goal.trim()}
              className="btn-primary flex items-center gap-2 self-end sm:self-auto"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 size={16} />
                  Generate Roadmap
                </>
              )}
            </button>
          </div>
        </div>

        {/* Example prompts */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-amber-400" />
            <p className="text-sm text-slate-400 font-medium">Try these examples:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {examples.map(ex => (
              <button
                key={ex}
                onClick={() => setGoal(ex)}
                className="text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 hover:border-indigo-500/30 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <div className="glass-card p-12 flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <p className="text-slate-400 mt-4">AI is creating your personalized roadmap...</p>
            <p className="text-slate-500 text-sm mt-1">This may take 10-20 seconds</p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="animate-slide-up">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Wand2 size={18} className="text-indigo-400" />
              Your Personalized Roadmap
            </h2>
            <AIResponseDisplay content={result} title={`Roadmap: ${goal.substring(0, 60)}...`} />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
