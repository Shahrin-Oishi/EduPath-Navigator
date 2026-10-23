import { useEffect, useState } from 'react'
import { useProgress } from '../context/ProgressContext'
import DashboardLayout from '../layouts/DashboardLayout'
import CareerCard from '../components/CareerCard'
import { careerPaths } from '../data/careerPaths'
import { Search, Filter } from 'lucide-react'
import { useSearchParams } from 'react-router-dom'
import api from '../services/api'

const categories = ['All', 'Web', 'AI/Data', 'Infrastructure', 'Design', 'Mobile', 'Security', 'Engineering']

export default function CareerPathsPage() {
  const { progressMap, fetchAllProgress } = useProgress()
  const [searchParams, setSearchParams] = useSearchParams()
  const search = searchParams.get('q') || ''
  const setSearch = value => setSearchParams(value ? { q: value } : {}, { replace: true })
  const [activeCategory, setActiveCategory] = useState('All')
  const [matches, setMatches] = useState({ query: '', ids: [] })
  const [searchError, setSearchError] = useState('')

  useEffect(() => {
    const controller = new AbortController()
    setSearchError('')
    if (search.trim()) {
      api.get('/api/roadmaps', { params: { q: search.trim() }, signal: controller.signal })
        .then(res => setMatches({ query: search, ids: res.data.roadmaps.map(item => item.id) }))
        .catch(() => { if (!controller.signal.aborted) setSearchError('Unable to search skills. Please check your connection and try again.') })
    }
    return () => controller.abort()
  }, [search])

  useEffect(() => {
    fetchAllProgress()
  }, [fetchAllProgress])

  const filtered = careerPaths.filter(cp => {
    const matchesSearch = !search.trim() || (matches.query === search ? matches.ids.includes(cp.id) : cp.title.toLowerCase().includes(search.toLowerCase()) ||
      cp.description.toLowerCase().includes(search.toLowerCase()) ||
      cp.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())))

    const matchesCategory = activeCategory === 'All' || (
      activeCategory === 'Web' && cp.id === 'web-development' ||
      activeCategory === 'AI/Data' && (cp.id === 'machine-learning' || cp.id === 'data-science') ||
      activeCategory === 'Infrastructure' && cp.id === 'devops' ||
      activeCategory === 'Design' && cp.id === 'ui-ux-design' ||
      activeCategory === 'Mobile' && cp.id === 'mobile-development' ||
      activeCategory === 'Security' && cp.id === 'cybersecurity' ||
      activeCategory === 'Engineering' && cp.id === 'software-engineering'
    )

    return matchesSearch && matchesCategory
  })

  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in pb-20">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">Career Paths</h1>
          <p className="text-slate-400">Choose your tech career and follow a structured, AI-curated learning roadmap.</p>
        </div>

        {/* Search and filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search career paths or skills..."
              className="input-field pl-10"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 flex-shrink-0
                  ${activeCategory === cat
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'bg-white/5 text-slate-400 border border-white/10 hover:text-white hover:bg-white/10'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {searchError && <p role="alert" className="text-red-400 text-sm">{searchError}</p>}
        {/* Results count */}
        <p className="text-slate-400 text-sm">
          Showing <span className="text-white font-medium">{filtered.length}</span> career path{filtered.length !== 1 ? 's' : ''}
        </p>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(career => (
              <CareerCard key={career.id} career={career} progress={progressMap[career.id]} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <Search size={40} className="text-slate-600 mx-auto mb-4" />
            <p className="text-slate-400 text-lg">No career paths found</p>
            <p className="text-slate-500 text-sm mt-2">Try a different search term or category</p>
            <button onClick={() => { setSearch(''); setActiveCategory('All') }} className="btn-secondary mt-4">
              Clear filters
            </button>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
