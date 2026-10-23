import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Briefcase, CheckCircle } from 'lucide-react'
import ProgressBar from './ProgressBar'

export default function CareerCard({ career, progress }) {
  const completedCount = progress?.completedSkills?.length || 0
  const percentage = progress?.progressPercentage || 0
  const isStarted = completedCount > 0

  return (
    <div className="glass-card-hover p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-lg flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${career.color}33, ${career.color}55)`, border: `1px solid ${career.color}44` }}
        >
          {career.icon}
        </div>
        {isStarted && (
          <span className="text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-2.5 py-1 rounded-full flex items-center gap-1">
            <CheckCircle size={12} />
            In Progress
          </span>
        )}
      </div>

      {/* Content */}
      <h3 className="text-lg font-bold text-white mb-2">{career.title}</h3>
      <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{career.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        {career.tags?.slice(0, 4).map(tag => (
          <span key={tag} className="text-xs text-slate-400 bg-white/5 border border-white/10 px-2 py-0.5 rounded-md">
            {tag}
          </span>
        ))}
      </div>

      {/* Meta info */}
      <div className="flex items-center gap-4 text-xs text-slate-400 mb-4">
        <span className="flex items-center gap-1">
          <Clock size={12} />
          {career.estimatedDuration}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase size={12} />
          {career.totalSkills} skills
        </span>
      </div>

      {/* Progress */}
      {isStarted && (
        <div className="mb-4">
          <ProgressBar percentage={percentage} size="sm" />
          <p className="text-xs text-slate-500 mt-1">{completedCount}/{career.totalSkills} skills completed</p>
        </div>
      )}

      {/* CTA */}
      <Link
        to={`/roadmap/${career.id}`}
        className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 group/btn"
        style={{
          background: `linear-gradient(135deg, ${career.color}cc, ${career.color}aa)`,
          color: 'white'
        }}
      >
        {isStarted ? 'Continue Learning' : 'Start Learning'}
        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
      </Link>
    </div>
  )
}
