import { useState } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import AIResponseDisplay from '../components/AIResponseDisplay'
import LoadingSpinner from '../components/LoadingSpinner'
import api from '../services/api'
import { Brain, Lightbulb, AlertCircle, Plus, X } from 'lucide-react'

const exampleSkills = [
  'HTML, CSS, JavaScript, basic React',
  'Python, NumPy, Pandas, basic machine learning',
  'SQL, Excel, Tableau, basic statistics',
  'Linux, Docker, basic networking, Git',
  'Java, Spring Boot, REST APIs, MySQL',
]

const popularSkills = [
  'HTML', 'CSS', 'JavaScript', 'React', 'Vue', 'Python', 'Node.js',
  'SQL', 'MongoDB', 'Docker', 'Git', 'TypeScript', 'Java', 'PHP',
  'AWS', 'Linux', 'Figma', 'Swift', 'Kotlin', 'C++', 'Go', 'Rust'
]

export default function AISkillAnalyzerPage() {
  const [skills, setSkills] = useState('')
  const [selectedTags, setSelectedTags] = useState([])
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const toggleTag = (skill) => {
    setSelectedTags(prev =>
      prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill]
    )
  }

  const fullSkillsText = [skills, ...selectedTags].filter(Boolean).join(', ')

  const handleAnalyze = async () => {
    if (!fullSkillsText.trim() || fullSkillsText.trim().length < 5) {
      setError('Please describe your skills or select some from the list.')
      return
    }
    setError('')
    setLoading(true)
    setResult('')
    try {
      const res = await api.post('/api/ai/skill-analyze', { skills: fullSkillsText })
      setResult(res.data.analysis)
    } catch (err) {
      setError(err.response?.data?.message || 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl shadow-lg shadow-cyan-500/30 mb-5">
            <Brain size={28} className="text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-3">AI Skill Analyzer</h1>
          <p className="text-slate-400 max-w-xl mx-auto">
            Enter your current skills and the AI will identify suitable career paths, job roles, skill gaps, and your next learning steps.
          </p>
        </div>

        {/* Input Card */}
        <div className="glass-card p-6 border-cyan-500/20">
          <label className="label text-base mb-3">Describe your current skills</label>
          <textarea
            value={skills}
            onChange={(e) => { setSkills(e.target.value); setError('') }}
            placeholder="e.g., I know HTML, CSS, JavaScript, basic React and I've built a few small projects..."
            rows={3}
            className="input-field resize-none w-full mb-4"
          />

          {/* Quick-add skill tags */}
          <div className="mb-4">
            <p className="text-sm text-slate-400 mb-2 flex items-center gap-2">
              <Plus size={14} />
              Quick add skills:
            </p>
            <div className="flex flex-wrap gap-2">
              {popularSkills.map(skill => (
                <button
                  key={skill}
                  onClick={() => toggleTag(skill)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all duration-200
                    ${selectedTags.includes(skill)
                      ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
                      : 'bg-white/5 border-white/10 text-slate-400 hover:text-white hover:bg-white/10'
                    }`}
                >
                  {selectedTags.includes(skill) ? <span className="mr-1">✓</span> : ''}
                  {skill}
                </button>
              ))}
            </div>
          </div>

          {/* Selected tags preview */}
          {selectedTags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4 p-3 rounded-xl bg-white/5 border border-white/10">
              <span className="text-xs text-slate-400 self-center">Selected:</span>
              {selectedTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className="flex items-center gap-1 text-xs bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 px-2.5 py-1 rounded-full hover:bg-red-500/20 hover:border-red-500/30 hover:text-red-400 transition-all"
                >
                  {tag}
                  <X size={11} />
                </button>
              ))}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm mb-4">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end">
            <button
              onClick={handleAnalyze}
              disabled={loading || !fullSkillsText.trim()}
              className="btn-primary flex items-center gap-2"
              style={{ background: 'linear-gradient(135deg, #06b6d4, #3b82f6)' }}
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <Brain size={16} />
                  Analyze My Skills
                </>
              )}
            </button>
          </div>
        </div>

        {/* Examples */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb size={16} className="text-amber-400" />
            <p className="text-sm text-slate-400 font-medium">Example inputs:</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {exampleSkills.map(ex => (
              <button
                key={ex}
                onClick={() => setSkills(ex)}
                className="text-xs px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-all"
              >
                {ex}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="glass-card p-12 flex flex-col items-center">
            <LoadingSpinner size="lg" />
            <p className="text-slate-400 mt-4">AI is analyzing your skills...</p>
            <p className="text-slate-500 text-sm mt-1">Comparing with industry requirements</p>
          </div>
        )}

        {/* Result */}
        {result && !loading && (
          <div className="animate-slide-up">
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Brain size={18} className="text-cyan-400" />
              Your Skills Analysis
            </h2>
            <AIResponseDisplay content={result} title="AI Skill Analysis Report" />
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
