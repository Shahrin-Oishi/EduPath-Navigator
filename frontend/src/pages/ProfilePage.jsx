import { useState, useEffect } from 'react'
import DashboardLayout from '../layouts/DashboardLayout'
import ProgressBar from '../components/ProgressBar'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import { careerPaths } from '../data/careerPaths'
import api from '../services/api'
import { getInitials, formatDate } from '../utils/helpers'
import { User, Mail, Calendar, Briefcase, Save, CheckCircle, Edit2, TrendingUp, BookOpen } from 'lucide-react'

export default function ProfilePage() {
  const { user, updateUser } = useAuth()
  const { progressMap, fetchAllProgress, getTotalStats } = useProgress()
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({ name: '', bio: '', selectedCareerPath: '' })
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchAllProgress()
  }, [fetchAllProgress])

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || '',
        bio: user.bio || '',
        selectedCareerPath: user.selectedCareerPath || ''
      })
    }
  }, [user])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      const res = await api.put('/api/user/profile', form)
      updateUser(res.data.user)
      setEditing(false)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save changes')
    } finally {
      setSaving(false)
    }
  }

  const { totalCompleted, totalSkills, roadmapsStarted } = getTotalStats()
  const overallPct = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0
  const startedPaths = careerPaths.filter(cp => progressMap[cp.id]?.completedSkills?.length > 0)

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <h1 className="text-2xl sm:text-3xl font-bold text-white">My Profile</h1>

        {/* Profile Card */}
        <div className="glass-card p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl flex items-center justify-center text-2xl font-bold text-white shadow-xl shadow-indigo-500/30 flex-shrink-0">
              {getInitials(user?.name)}
            </div>

            <div className="flex-1 min-w-0">
              {editing ? (
                <div className="space-y-4">
                  <div>
                    <label className="label">Full Name</label>
                    <div className="relative">
                      <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="input-field pl-9"
                        placeholder="Your full name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="label">Bio</label>
                    <textarea
                      value={form.bio}
                      onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                      className="input-field resize-none"
                      rows={2}
                      maxLength={200}
                      placeholder="Tell us about yourself..."
                    />
                    <p className="text-xs text-slate-500 mt-1 text-right">{form.bio.length}/200</p>
                  </div>

                  <div>
                    <label className="label">Career Path</label>
                    <select
                      value={form.selectedCareerPath}
                      onChange={e => setForm(p => ({ ...p, selectedCareerPath: e.target.value }))}
                      className="input-field"
                    >
                      <option value="">Not selected</option>
                      {careerPaths.map(cp => (
                        <option key={cp.id} value={cp.id}>{cp.icon} {cp.title}</option>
                      ))}
                    </select>
                  </div>

                  {error && <p className="text-red-400 text-sm">{error}</p>}

                  <div className="flex gap-3">
                    <button onClick={handleSave} disabled={saving} className="btn-primary flex items-center gap-2">
                      {saving ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Save size={15} />}
                      Save Changes
                    </button>
                    <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h2 className="text-xl font-bold text-white">{user?.name}</h2>
                      <p className="text-slate-400 text-sm mt-0.5">{user?.bio || 'No bio yet — click Edit to add one.'}</p>
                    </div>
                    <button onClick={() => setEditing(true)} className="btn-secondary flex items-center gap-2 text-sm flex-shrink-0">
                      <Edit2 size={14} />
                      Edit
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Mail size={14} className="text-indigo-400" />
                      {user?.email}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} className="text-indigo-400" />
                      Joined {formatDate(user?.createdAt)}
                    </span>
                    {user?.selectedCareerPath && (
                      <span className="flex items-center gap-1.5">
                        <Briefcase size={14} className="text-indigo-400" />
                        {careerPaths.find(cp => cp.id === user.selectedCareerPath)?.title || user.selectedCareerPath}
                      </span>
                    )}
                  </div>

                  {saved && (
                    <div className="flex items-center gap-2 mt-3 text-emerald-400 text-sm">
                      <CheckCircle size={14} />
                      Profile saved successfully!
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats */}
        <div>
          <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
            <TrendingUp size={18} className="text-indigo-400" />
            Learning Statistics
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Skills Completed', value: totalCompleted, color: 'text-emerald-400' },
              { label: 'Paths Started', value: roadmapsStarted, color: 'text-indigo-400' },
              { label: 'Overall Progress', value: `${overallPct}%`, color: 'text-amber-400' }
            ].map(stat => (
              <div key={stat.label} className="glass-card p-4 text-center">
                <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-slate-400 text-xs mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Overall progress bar */}
          <div className="glass-card p-5">
            <div className="flex justify-between mb-2">
              <span className="text-slate-400 text-sm">Overall Learning Progress</span>
              <span className="text-white font-bold">{overallPct}%</span>
            </div>
            <ProgressBar percentage={overallPct} showLabel={false} size="lg" />
            <p className="text-slate-500 text-xs mt-2">{totalCompleted} of {totalSkills} total skills completed</p>
          </div>
        </div>

        {/* Active roadmaps */}
        {startedPaths.length > 0 && (
          <div>
            <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <BookOpen size={18} className="text-indigo-400" />
              Your Roadmaps
            </h2>
            <div className="space-y-3">
              {startedPaths.map(path => {
                const prog = progressMap[path.id]
                return (
                  <div key={path.id} className="glass-card p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-xl">{path.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center">
                          <p className="text-white font-medium">{path.title}</p>
                          <span className="text-sm font-bold text-white">{prog.progressPercentage || 0}%</span>
                        </div>
                        <p className="text-slate-400 text-xs">{prog.completedSkills?.length || 0} / {path.totalSkills} skills</p>
                      </div>
                    </div>
                    <ProgressBar percentage={prog.progressPercentage || 0} showLabel={false} size="sm" />
                  </div>
                )
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
