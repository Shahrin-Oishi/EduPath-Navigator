export default function ProgressBar({ percentage = 0, showLabel = true, size = 'md', color = 'indigo' }) {
  const heights = { sm: 'h-1.5', md: 'h-2.5', lg: 'h-4' }
  const gradients = {
    indigo: 'from-indigo-500 to-purple-600',
    emerald: 'from-emerald-500 to-teal-600',
    amber: 'from-amber-500 to-orange-600',
    pink: 'from-pink-500 to-rose-600'
  }

  const clamped = Math.min(100, Math.max(0, percentage))

  return (
    <div className="w-full">
      {showLabel && (
        <div className="flex justify-between items-center mb-1.5">
          <span className="text-xs text-slate-400">Progress</span>
          <span className="text-xs font-semibold text-white">{clamped}%</span>
        </div>
      )}
      <div className={`w-full bg-white/10 rounded-full ${heights[size]} overflow-hidden`}>
        <div
          className={`${heights[size]} rounded-full bg-gradient-to-r ${gradients[color]} transition-all duration-700 ease-out relative`}
          style={{ width: `${clamped}%` }}
        >
          {size === 'lg' && clamped > 10 && (
            <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse-slow" />
          )}
        </div>
      </div>
    </div>
  )
}
