import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import DashboardLayout from '../layouts/DashboardLayout'
import RoadmapTree from '../components/RoadmapTree'
import ProgressBar from '../components/ProgressBar'
import LoadingSpinner from '../components/LoadingSpinner'
import { useProgress } from '../context/ProgressContext'
import { useAuth } from '../context/AuthContext'
import api from '../services/api'
import { ArrowLeft, Clock, Briefcase, RotateCcw, CheckCircle, AlertCircle } from 'lucide-react'

export default function RoadmapDetailPage() {
  const { id } = useParams()
  const [roadmap, setRoadmap] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [resetting, setResetting] = useState(false)
  const { fetchAllProgress, getProgressForRoadmap, resetRoadmapProgress } = useProgress()
  const { updateUser } = useAuth()

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true)
        const [roadmapRes] = await Promise.all([
          api.get(`/api/roadmaps/${id}`),
          fetchAllProgress()
        ])
        setRoadmap(roadmapRes.data.roadmap)
        updateUser({ selectedCareerPath: id })
      } catch (err) {
        setError('Failed to load roadmap. Please try again.')
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [id])

  const handleReset = async () => {
    if (!window.confirm('Reset all progress for this roadmap? This cannot be undone.')) return
    setResetting(true)
    try {
      await resetRoadmapProgress(id)
    } catch {
      setError('Failed to reset progress.')
    } finally {
      setResetting(false)
    }
  }

  const progress = getProgressForRoadmap(id)
  const completedCount = progress?.completedSkills?.length || 0
  const totalSkills = roadmap?.levels?.reduce((sum, l) => sum + l.skills.length, 0) || 0
  const pct = progress?.progressPercentage || 0

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center py-32">
          <LoadingSpinner size="lg" text="Loading roadmap..." />
        </div>
      </DashboardLayout>
    )
  }

  if (error || !roadmap) {
    return (
      <DashboardLayout>
        <div className="text-center py-32">
          <AlertCircle size={48} className="text-red-400 mx-auto mb-4" />
          <p className="text-red-400 text-lg">{error || 'Roadmap not found'}</p>
          <Link to="/career-paths" className="btn-secondary mt-4 inline-flex items-center gap-2">
            <ArrowLeft size={16} /> Back to Paths
          </Link>
        </div>
      </DashboardLayout>
    )
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto space-y-8 animate-fade-in pb-20">
        {/* Breadcrumb */}
        <Link to="/career-paths" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors text-sm group w-fit">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Career Paths
        </Link>

        {/* Header */}
        <div className="glass-card p-6 sm:p-8 overflow-hidden relative"
          style={{ borderColor: `${roadmap.color}33` }}>
          <div className="absolute inset-0 opacity-5"
            style={{ background: `radial-gradient(ellipse at top right, ${roadmap.color}, transparent 70%)` }} />

          <div className="relative flex flex-col sm:flex-row sm:items-start gap-6">
            {/* Icon + Title */}
            <div
              className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl flex-shrink-0 shadow-xl"
              style={{ background: `linear-gradient(135deg, ${roadmap.color}33, ${roadmap.color}55)`, border: `1px solid ${roadmap.color}44` }}
            >
              {roadmap.icon}
            </div>

            <div className="flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">{roadmap.title}</h1>
              <p className="text-slate-400 leading-relaxed mb-4">{roadmap.description}</p>

              <div className="flex flex-wrap gap-4 text-sm text-slate-400">
                <span className="flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-400" />
                  {roadmap.estimatedDuration}
                </span>
                <span className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-indigo-400" />
                  {roadmap.jobRoles?.slice(0, 2).join(' · ')}
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle size={14} className="text-emerald-400" />
                  {completedCount}/{totalSkills} skills done
                </span>
              </div>
            </div>

            {/* Reset button */}
            {completedCount > 0 && (
              <button
                onClick={handleReset}
                disabled={resetting}
                className="btn-danger flex items-center gap-2 text-sm self-start"
              >
                <RotateCcw size={14} className={resetting ? 'animate-spin' : ''} />
                Reset
              </button>
            )}
          </div>

          {/* Progress bar */}
          <div className="mt-6 relative">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-slate-400">Overall Progress</span>
              <span className="font-bold text-white">{pct}%</span>
            </div>
            <ProgressBar percentage={pct} showLabel={false} size="lg" />
          </div>
        </div>

        {/* Roadmap Tree */}
        <div>
          <h2 className="text-xl font-bold text-white mb-6">Learning Path</h2>
          <RoadmapTree roadmap={roadmap} />
        </div>

        {/* Projects Section */}
        {roadmap.projects?.length > 0 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Suggested Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {roadmap.projects.map((project, i) => (
                <div key={i} className="glass-card-hover p-5">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-white font-semibold">{project.name}</h3>
                    <span className={`text-xs px-2 py-0.5 rounded-full border flex-shrink-0 ml-2
                      ${project.difficulty === 'beginner' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                        project.difficulty === 'intermediate' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20' :
                        'bg-red-500/10 text-red-400 border-red-500/20'}`}>
                      {project.difficulty}
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm mb-3">{project.description}</p>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills?.map(skill => (
                      <span key={skill} className="text-xs bg-white/5 border border-white/10 text-slate-400 px-2 py-0.5 rounded-md">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Job roles */}
        {roadmap.jobRoles?.length > 0 && (
          <div className="glass-card p-6">
            <h2 className="text-lg font-bold text-white mb-4">Career Outcomes</h2>
            <div className="flex flex-wrap gap-3">
              {roadmap.jobRoles.map(role => (
                <span key={role} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
                  <Briefcase size={14} />
                  {role}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
