import { useEffect, useRef, useState } from 'react'
import { Menu, Bell, Search, Sparkles, Trophy, Map } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getInitials } from '../utils/helpers'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { careerPaths } from '../data/careerPaths'
import { buildNotifications } from '../utils/notifications'

export default function Navbar({ onMenuToggle }) {
  const { user } = useAuth()
  const { progressMap, fetchAllProgress } = useProgress()
  const notifications = buildNotifications(user, progressMap, careerPaths)
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const [query, setQuery] = useState(searchParams.get('q') || '')
  const [readIds, setReadIds] = useState([])
  const storageKey = `edupath_notifications_${user?._id}`
  const [isOpen, setIsOpen] = useState(false)
  const panelRef = useRef(null)

  const unreadCount = notifications.filter(n => !readIds.includes(n.id)).length

  useEffect(() => { fetchAllProgress() }, [user?._id, fetchAllProgress])
  useEffect(() => { setQuery(searchParams.get('q') || '') }, [searchParams])
  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || '[]')
      setReadIds(Array.isArray(saved) ? saved : [])
    } catch { setReadIds([]) }
  }, [storageKey])

  function search(event) {
    event.preventDefault()
    navigate(`/career-paths${query.trim() ? `?q=${encodeURIComponent(query.trim())}` : ''}`)
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function toggleOpen() {
    setIsOpen((prev) => {
      const next = !prev
      if (next) {
        const ids = notifications.map(n => n.id)
        setReadIds(ids)
        try { localStorage.setItem(storageKey, JSON.stringify(ids)) } catch { /* Storage may be disabled. */ }
      }
      return next
    })
  }

  return (
    <header className="sticky top-0 z-30 bg-slate-900/80 backdrop-blur-xl border-b border-white/10 px-4 lg:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Mobile menu toggle */}
        <button
          aria-label="Open navigation"
          onClick={onMenuToggle}
          className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <Menu size={20} />
        </button>

        {/* Search bar */}
        <form onSubmit={search} role="search" className="flex flex-1 min-w-0 max-w-md relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            aria-label="Search roadmaps and skills"
            value={query}
            onChange={event => setQuery(event.target.value)}
            placeholder="Search roadmaps, skills..."
            className="w-full bg-white/5 border border-white/10 text-white placeholder-slate-500 rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-indigo-500 transition-all"
          />
        </form>

        {/* Right side */}
        <div className="flex items-center gap-3 ml-auto">
          <div className="relative" ref={panelRef}>
            <button
              aria-label="Notifications"
              aria-expanded={isOpen}
              onClick={toggleOpen}
              className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-all relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-indigo-500 rounded-full" />
              )}
            </button>

            {isOpen && (
              <div className="fixed left-4 right-4 top-16 sm:absolute sm:left-auto sm:top-full sm:right-0 mt-2 sm:w-80 max-h-96 overflow-y-auto bg-slate-900 border border-white/10 rounded-xl shadow-2xl shadow-black/40 z-50">
                <div className="px-4 py-3 border-b border-white/10">
                  <p className="text-sm font-semibold text-white">Notifications</p>
                </div>
                {notifications.length === 0 ? (
                  <p className="px-4 py-6 text-sm text-slate-400 text-center">No notifications yet</p>
                ) : (
                  <ul className="divide-y divide-white/5">
                    {notifications.map((n) => {
                      const Icon = n.kind === 'complete' ? Trophy : n.kind === 'progress' ? Map : Sparkles
                      return (
                        <li key={n.id} className="flex gap-3 px-4 py-3 hover:bg-white/5 transition-colors">
                          <div className="w-8 h-8 shrink-0 rounded-lg bg-indigo-500/15 text-indigo-400 flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                          <Link to={n.to} onClick={() => setIsOpen(false)} className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-white leading-tight">{n.title}</p>
                            <p className="text-xs text-slate-400 mt-0.5">{n.message}</p>
                            {n.date && <p className="text-xs text-slate-500 mt-1">{new Date(n.date).toLocaleDateString()}</p>}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                )}
              </div>
            )}
          </div>

          <Link to="/profile" className="flex items-center gap-2.5 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              {getInitials(user?.name)}
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-white leading-tight">{user?.name}</p>
              <p className="text-xs text-slate-400 leading-tight">
                {user?.selectedCareerPath ? user.selectedCareerPath.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'No path selected'}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </header>
  )
}

