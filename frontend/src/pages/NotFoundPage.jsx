import { Link } from 'react-router-dom'
import { ArrowLeft, Home } from 'lucide-react'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-indigo-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="text-center relative animate-fade-in">
        <div className="text-8xl font-black text-gradient mb-4">404</div>
        <h1 className="text-3xl font-bold text-white mb-3">Page Not Found</h1>
        <p className="text-slate-400 mb-8 max-w-md mx-auto">
          Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => history.back()} className="btn-secondary flex items-center gap-2">
            <ArrowLeft size={16} />
            Go Back
          </button>
          <Link to="/dashboard" className="btn-primary flex items-center gap-2">
            <Home size={16} />
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}
