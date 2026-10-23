import { createContext, useContext, useState, useCallback, useEffect } from 'react'
import api from '../services/api'
import { useAuth } from './AuthContext'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const { user } = useAuth()
  const [progressMap, setProgressMap] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => { setProgressMap({}) }, [user?._id])

  const fetchAllProgress = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)
      const res = await api.get('/api/progress')
      const map = {}
      res.data.progress.forEach(p => {
        map[p.roadmapId] = p
      })
      setProgressMap(map)
    } catch (err) {
      console.error('Failed to fetch progress:', err)
    } finally {
      setLoading(false)
    }
  }, [user?._id])

  const updateSkillProgress = async (roadmapId, skillId, completed, totalSkills) => {
    try {
      const res = await api.post('/api/progress/update', {
        roadmapId,
        skillId,
        completed,
        totalSkills
      })
      const updatedProgress = res.data.progress
      setProgressMap(prev => ({
        ...prev,
        [roadmapId]: updatedProgress
      }))
      return updatedProgress
    } catch (err) {
      console.error('Failed to update progress:', err)
      throw err
    }
  }

  const resetRoadmapProgress = async (roadmapId) => {
    try {
      await api.delete('/api/progress/reset', { data: { roadmapId } })
      setProgressMap(prev => {
        const next = { ...prev }
        delete next[roadmapId]
        return next
      })
    } catch (err) {
      console.error('Failed to reset progress:', err)
      throw err
    }
  }

  const getProgressForRoadmap = (roadmapId) => {
    return progressMap[roadmapId] || { completedSkills: [], progressPercentage: 0, totalSkills: 0 }
  }

  const isSkillCompleted = (roadmapId, skillId) => {
    const progress = progressMap[roadmapId]
    return progress?.completedSkills?.includes(skillId) ?? false
  }

  const getTotalStats = () => {
    const allProgress = Object.values(progressMap)
    const totalCompleted = allProgress.reduce((sum, p) => sum + p.completedSkills.length, 0)
    const totalSkills = allProgress.reduce((sum, p) => sum + (p.totalSkills || 0), 0)
    return { totalCompleted, totalSkills, roadmapsStarted: allProgress.length }
  }

  return (
    <ProgressContext.Provider value={{
      progressMap,
      loading,
      fetchAllProgress,
      updateSkillProgress,
      resetRoadmapProgress,
      getProgressForRoadmap,
      isSkillCompleted,
      getTotalStats
    }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) throw new Error('useProgress must be used within ProgressProvider')
  return context
}
