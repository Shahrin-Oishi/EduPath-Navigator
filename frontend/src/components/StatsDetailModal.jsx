import { useProgress } from '../context/ProgressContext'
import { careerPaths } from '../data/careerPaths'
import Modal from './Modal'
import ProgressBar from './ProgressBar'
import CircularProgress from './CircularProgress'

const CONFIG = {
  completed: { title: 'Skills Completed', gradientFrom: '#10b981', gradientTo: '#0d9488' },
  total: { title: 'Total Skills', gradientFrom: '#3b82f6', gradientTo: '#4f46e5' },
  paths: { title: 'Paths Started', gradientFrom: '#a855f7', gradientTo: '#db2777' },
  overall: { title: 'Overall Progress', gradientFrom: '#f59e0b', gradientTo: '#ea580c' }
}

export default function StatsDetailModal({ type, open, onClose }) {
  const { progressMap } = useProgress()

  if (!type) return null
  const config = CONFIG[type]

  const startedPaths = careerPaths
    .filter(cp => progressMap[cp.id]?.completedSkills?.length > 0)
    .map(cp => ({
      ...cp,
      completed: progressMap[cp.id]?.completedSkills?.length || 0,
      percentage: progressMap[cp.id]?.progressPercentage || 0
    }))

  const totalCompleted = startedPaths.reduce((sum, p) => sum + p.completed, 0)
  const totalSkills = startedPaths.reduce((sum, p) => sum + p.totalSkills, 0)
  const overallPct = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0
  const maxSkills = Math.max(1, ...startedPaths.map(p => p.totalSkills))

  return (
    <Modal open={open} onClose={onClose} title={config.title}>
      <div className="flex flex-col items-center gap-6">
        {/* Enlarged headline visual */}
        {(type === 'completed' || type === 'overall') && (
          <CircularProgress
            percentage={overallPct}
            size={180}
            strokeWidth={14}
            gradientFrom={config.gradientFrom}
            gradientTo={config.gradientTo}
            label={type === 'completed' ? totalCompleted : `${overallPct}%`}
            sublabel={type === 'completed' ? `of ${totalSkills} total skills` : `${totalCompleted}/${totalSkills} skills completed`}
          />
        )}
        {type === 'total' && (
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{totalSkills}</p>
            <p className="text-sm text-slate-400 mt-2">skills across {startedPaths.length} started {startedPaths.length === 1 ? 'path' : 'paths'}</p>
          </div>
        )}
        {type === 'paths' && (
          <div className="text-center">
            <p className="text-5xl font-bold text-white">{startedPaths.length}</p>
            <p className="text-sm text-slate-400 mt-2">career {startedPaths.length === 1 ? 'track' : 'tracks'} in progress</p>
          </div>
        )}

        {/* Breakdown by career path */}
        <div className="w-full">
          <h3 className="text-sm font-semibold text-slate-300 mb-3">Breakdown by career path</h3>
          {startedPaths.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-6">No roadmaps started yet.</p>
          ) : (
            <div className="space-y-4">
              {startedPaths.map(path => (
                <div key={path.id} className="glass-card p-4">
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className="w-9 h-9 rounded-xl flex items-center justify-center text-lg flex-shrink-0"
                      style={{ background: `linear-gradient(135deg, ${path.color}33, ${path.color}55)`, border: `1px solid ${path.color}44` }}
                    >
                      {path.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-medium text-sm truncate">{path.title}</p>
                      <p className="text-xs text-slate-500">{path.completed} / {path.totalSkills} skills</p>
                    </div>
                    {type === 'total' && (
                      <span className="text-xs text-slate-400 flex-shrink-0">{path.totalSkills} skills</span>
                    )}
                  </div>
                  {type === 'total' ? (
                    <div className="w-full bg-white/10 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="h-2.5 rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${(path.totalSkills / maxSkills) * 100}%`, background: `linear-gradient(90deg, ${path.color}cc, ${path.color}aa)` }}
                      />
                    </div>
                  ) : (
                    <ProgressBar percentage={path.percentage} showLabel={false} size="md" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}
