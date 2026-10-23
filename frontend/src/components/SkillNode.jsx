import { CheckCircle, Circle, Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'
import { getLevelColor, getDifficultyLabel } from '../utils/helpers'

export default function SkillNode({ skill, isCompleted, onToggle, loading }) {
  const [expanded, setExpanded] = useState(false)
  const levelColors = getLevelColor(skill.level)

  return (
    <div className={`
      rounded-2xl border transition-all duration-300 overflow-hidden
      ${isCompleted
        ? 'bg-emerald-500/10 border-emerald-500/30 shadow-emerald-500/10 shadow-lg'
        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
      }
    `}>
      <div className="p-4">
        <div className="flex items-start gap-3">
          {/* Checkbox */}
          <button
            onClick={() => onToggle(skill.id, !isCompleted)}
            disabled={loading}
            className="flex-shrink-0 mt-0.5 transition-all duration-200 hover:scale-110 disabled:opacity-50"
            title={isCompleted ? 'Mark as incomplete' : 'Mark as complete'}
          >
            {isCompleted ? (
              <CheckCircle size={22} className="text-emerald-400" />
            ) : (
              <Circle size={22} className="text-slate-500 hover:text-indigo-400" />
            )}
          </button>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h4 className={`font-semibold text-sm ${isCompleted ? 'text-emerald-300 line-through decoration-emerald-500/50' : 'text-white'}`}>
                {skill.name}
              </h4>
              <span className={`text-xs px-2 py-0.5 rounded-full border ${levelColors.bg} ${levelColors.text} ${levelColors.border}`}>
                {getDifficultyLabel(skill.level)}
              </span>
            </div>

            <p className="text-slate-400 text-xs mt-1 leading-relaxed line-clamp-2">
              {skill.description}
            </p>

            {/* Meta */}
            <div className="flex items-center gap-3 mt-2">
              <span className="flex items-center gap-1 text-xs text-slate-500">
                <Clock size={11} />
                {skill.estimatedTime}
              </span>
              <button
                onClick={() => setExpanded(!expanded)}
                className="flex items-center gap-1 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                {expanded ? 'Less' : 'More'}
              </button>
            </div>
          </div>
        </div>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-white/10 animate-fade-in">
            <p className="text-slate-300 text-xs leading-relaxed mb-3">{skill.description}</p>
            {skill.resources?.length > 0 && (
              <div>
                <p className="text-xs text-slate-400 font-medium mb-2">Resources:</p>
                <div className="space-y-1">
                  {skill.resources.map((r, i) => (
                    <a
                      key={i}
                      href={r.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors"
                    >
                      <span className="w-1 h-1 bg-indigo-400 rounded-full flex-shrink-0" />
                      {r.title}
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
