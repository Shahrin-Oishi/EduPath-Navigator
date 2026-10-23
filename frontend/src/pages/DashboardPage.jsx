import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import DashboardLayout from '../layouts/DashboardLayout'
import StatsCard from '../components/StatsCard'
import ProgressBar from '../components/ProgressBar'
import CareerCard from '../components/CareerCard'
import StatsDetailModal from '../components/StatsDetailModal'
import { careerPaths } from '../data/careerPaths'
import {
  CheckCircle, BookOpen, Target, Zap, ArrowRight,
  Wand2, Brain, MessageSquare, TrendingUp, Map
} from 'lucide-react'

export default function DashboardPage() {
  const { user } = useAuth()
  const { progressMap, fetchAllProgress, getTotalStats } = useProgress()
  const [activeStat, setActiveStat] = useState(null)

  useEffect(() => {
    fetchAllProgress()
  }, [fetchAllProgress])

  const { totalCompleted, totalSkills, roadmapsStarted } = getTotalStats()
  const overallPct = totalSkills > 0 ? Math.round((totalCompleted / totalSkills) * 100) : 0

  // Current/active roadmap
  const activeRoadmap = user?.selectedCareerPath
    ? careerPaths.find(cp => cp.id === user.selectedCareerPath)
    : null
  const activeProgress = activeRoadmap ? progressMap[activeRoadmap.id] : null

  // Recently started roadmaps
  const startedRoadmaps = careerPaths.filter(cp => progressMap[cp.id]?.completedSkills?.length > 0)

  const quickActions = [
    { to: '/ai/generate', icon: Wand2, label: 'Generate AI Roadmap', desc: 'Get a custom learning path', gradient: 'from-indigo-500 to-purple-600' },
    { to: '/ai/analyze', icon: Brain, label: 'Analyze My Skills', desc: 'Find what jobs you qualify for', gradient: 'from-cyan-500 to-blue-600' },
    { to: '/ai/chat', icon: MessageSquare, label: 'Ask AI Mentor', desc: 'Get instant career guidance', gradient: 'from-emerald-500 to-teal-600' },
    { to: '/career-paths', icon: Map, label: 'Browse Roadmaps', desc: 'Explore all 8 career paths', gradient: 'from-amber-500 to-orange-600' },
  ]

  const firstName = user?.name?.split(' ')[0] || 'Learner'
  const hour = new Date().getHours()
  const greeting =
    hour >= 5 && hour < 12 ? 'Good morning' :
    hour >= 12 && hour < 17 ? 'Good afternoon' :
    hour >= 17 && hour < 21 ? 'Good evening' :
    'Good night'

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in pb-20">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white">
              {greeting}, <span className="text-gradient">{firstName}!</span> 👋
            </h1>
            <p className="text-slate-400 mt-1">
              {totalCompleted > 0
                ? `You've completed ${totalCompleted} skills. Keep going!`
                : 'Ready to start your learning journey? Choose a career path below.'}
            </p>
          </div>
          <Link to="/career-paths" className="btn-primary flex items-center gap-2 whitespace-nowrap self-start sm:self-auto">
            Browse Paths
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatsCard
            icon={CheckCircle}
            label="Skills Completed"
            value={totalCompleted}
            subtitle="across all paths"
            gradient="from-emerald-500 to-teal-600"
            iconBg="bg-gradient-to-br from-emerald-500 to-teal-600"
            onClick={() => setActiveStat('completed')}
          />
          <StatsCard
            icon={BookOpen}
            label="Total Skills"
            value={totalSkills || '—'}
            subtitle="in active roadmaps"
            gradient="from-blue-500 to-indigo-600"
            iconBg="bg-gradient-to-br from-blue-500 to-indigo-600"
            onClick={() => setActiveStat('total')}
          />
          <StatsCard
            icon={Target}
            label="Paths Started"
            value={roadmapsStarted}
            subtitle="career tracks"
            gradient="from-purple-500 to-pink-600"
            iconBg="bg-gradient-to-br from-purple-500 to-pink-600"
            onClick={() => setActiveStat('paths')}
          />
          <StatsCard
            icon={TrendingUp}
            label="Overall Progress"
            value={`${overallPct}%`}
            subtitle="completion rate"
            gradient="from-amber-500 to-orange-600"
            iconBg="bg-gradient-to-br from-amber-500 to-orange-600"
            onClick={() => setActiveStat('overall')}
          />
        </div>

        {/* Active Roadmap */}
        {activeRoadmap && (
          <div className="glass-card p-6 border-indigo-500/20">
            <div className="flex items-start justify-between mb-4 flex-wrap gap-3">
              <div>
                <p className="text-xs text-indigo-400 font-medium mb-1">Continue Learning</p>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{activeRoadmap.icon}</span>
                  <div>
                    <h2 className="text-lg font-bold text-white">{activeRoadmap.title}</h2>
                    <p className="text-slate-400 text-sm">{activeProgress?.completedSkills?.length || 0} / {activeRoadmap.totalSkills} skills</p>
                  </div>
                </div>
              </div>
              <Link to={`/roadmap/${activeRoadmap.id}`} className="btn-primary flex items-center gap-2 text-sm">
                Continue <ArrowRight size={14} />
              </Link>
            </div>
            <ProgressBar percentage={activeProgress?.progressPercentage || 0} size="lg" />
          </div>
        )}

        {/* Quick Actions */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4">AI-Powered Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action) => (
              <Link key={action.to} to={action.to} className="glass-card-hover p-5 group">
                <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${action.gradient} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform`}>
                  <action.icon size={18} className="text-white" />
                </div>
                <p className="text-white font-semibold text-sm mb-1">{action.label}</p>
                <p className="text-slate-400 text-xs">{action.desc}</p>
              </Link>
            ))}
          </div>
        </div>

        {/* Active roadmaps */}
        {startedRoadmaps.length > 0 ? (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">Your Active Roadmaps</h2>
              <Link to="/career-paths" className="text-sm text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1">
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {startedRoadmaps.slice(0, 3).map(career => (
                <CareerCard key={career.id} career={career} progress={progressMap[career.id]} />
              ))}
            </div>
          </div>
        ) : (
          <div className="glass-card p-10 text-center border-dashed border-white/10">
            <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Map size={28} className="text-indigo-400" />
            </div>
            <h3 className="text-white font-semibold text-lg mb-2">No roadmaps started yet</h3>
            <p className="text-slate-400 mb-6">Choose a career path to begin your structured learning journey.</p>
            <Link to="/career-paths" className="btn-primary inline-flex items-center gap-2">
              Explore Career Paths <ArrowRight size={16} />
            </Link>
          </div>
        )}

        {/* All Career Paths preview */}
        {startedRoadmaps.length === 0 && (
          <div>
            <h2 className="text-lg font-semibold text-white mb-4">Explore Career Paths</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {careerPaths.slice(0, 3).map(career => (
                <CareerCard key={career.id} career={career} progress={progressMap[career.id]} />
              ))}
            </div>
          </div>
        )}
      </div>

      <StatsDetailModal
        type={activeStat}
        open={activeStat !== null}
        onClose={() => setActiveStat(null)}
      />
    </DashboardLayout>
  )
}
