import { useState } from 'react'
import SkillNode from './SkillNode'
import ProgressBar from './ProgressBar'
import { useProgress } from '../context/ProgressContext'
import { CheckCircle, Layers } from 'lucide-react'

export default function RoadmapTree({ roadmap }) {
  const { updateSkillProgress, isSkillCompleted, getProgressForRoadmap } = useProgress()
  const [loadingSkill, setLoadingSkill] = useState(null)

  const progress = getProgressForRoadmap(roadmap.id)
  const totalSkills = roadmap.levels.reduce((sum, l) => sum + l.skills.length, 0)
  const completedCount = progress.completedSkills?.length || 0

  const handleToggleSkill = async (skillId, completed) => {
    setLoadingSkill(skillId)
    try {
      await updateSkillProgress(roadmap.id, skillId, completed, totalSkills)
    } catch (err) {
      console.error('Failed to update skill:', err)
    } finally {
      setLoadingSkill(null)
    }
  }

  const getLevelCompletionCount = (level) => {
    return level.skills.filter(s => isSkillCompleted(roadmap.id, s.id)).length
  }

  return (
    <div className="space-y-2">
      {/* Overall Progress */}
      <div className="glass-card p-5 mb-8">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-white font-semibold">{roadmap.title} Progress</h3>
            <p className="text-slate-400 text-sm">{completedCount} of {totalSkills} skills completed</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-gradient">{progress.progressPercentage || 0}%</span>
          </div>
        </div>
        <ProgressBar percentage={progress.progressPercentage || 0} showLabel={false} size="lg" />
      </div>

      {/* Phases / Levels */}
      {roadmap.levels.map((level, levelIndex) => {
        const levelCompleted = getLevelCompletionCount(level)
        const levelTotal = level.skills.length
        const levelPct = Math.round((levelCompleted / levelTotal) * 100)
        const allDone = levelCompleted === levelTotal

        return (
          <div key={levelIndex} className="relative">
            {/* Level Header */}
            <div className={`
              flex items-center gap-4 p-4 rounded-2xl mb-4 border transition-all duration-300
              ${allDone
                ? 'bg-emerald-500/10 border-emerald-500/30'
                : 'bg-white/5 border-white/10'
              }
            `}>
              {/* Phase number badge */}
              <div className={`
                w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold flex-shrink-0
                ${allDone ? 'bg-emerald-500 text-white' : 'bg-indigo-500/30 text-indigo-300 border border-indigo-500/40'}
              `}>
                {allDone ? <CheckCircle size={18} /> : levelIndex + 1}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-white text-sm">{level.name}</h3>
                  {allDone && (
                    <span className="text-xs text-emerald-400 font-medium bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                      Complete!
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-white/10 rounded-full h-1.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${allDone ? 'bg-emerald-500' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}
                      style={{ width: `${levelPct}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 whitespace-nowrap">{levelCompleted}/{levelTotal}</span>
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-slate-500">
                <Layers size={14} />
                <span className="text-xs">{levelTotal} skills</span>
              </div>
            </div>

            {/* Skills Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-4 mb-6">
              {level.skills.map((skill) => (
                <SkillNode
                  key={skill.id}
                  skill={skill}
                  isCompleted={isSkillCompleted(roadmap.id, skill.id)}
                  onToggle={handleToggleSkill}
                  loading={loadingSkill === skill.id}
                />
              ))}
            </div>

            {/* Connector line between levels */}
            {levelIndex < roadmap.levels.length - 1 && (
              <div className="tree-line mb-2" />
            )}
          </div>
        )
      })}
    </div>
  )
}
