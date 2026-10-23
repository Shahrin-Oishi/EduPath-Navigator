import { Link } from 'react-router-dom'
import { ArrowRight, BookOpen, Brain, Map, CheckCircle, Zap, Star, ChevronRight, Code, Database, Shield } from 'lucide-react'

const features = [
  { icon: Map, title: 'AI Roadmaps', desc: 'Get personalized learning paths tailored to your career goals.', color: 'from-indigo-500 to-purple-600' },
  { icon: Brain, title: 'Skill Analyzer', desc: 'Input your skills and discover what jobs you qualify for.', color: 'from-cyan-500 to-blue-600' },
  { icon: CheckCircle, title: 'Progress Tracking', desc: 'Track completed skills and visualize your learning journey.', color: 'from-emerald-500 to-teal-600' },
  { icon: Zap, title: 'AI Chat Assistant', desc: 'Get instant answers and career guidance from your AI mentor.', color: 'from-amber-500 to-orange-600' },
]

const paths = [
  { icon: '🌐', title: 'Web Development', skills: '20+ Skills', time: '8-12 months', color: '#6366f1' },
  { icon: '🤖', title: 'Machine Learning', skills: '19+ Skills', time: '10-14 months', color: '#f59e0b' },
  { icon: '📊', title: 'Data Science', skills: '15+ Skills', time: '8-12 months', color: '#06b6d4' },
  { icon: '🔐', title: 'Cybersecurity', skills: '15+ Skills', time: '10-14 months', color: '#ef4444' },
  { icon: '⚙️', title: 'DevOps', skills: '15+ Skills', time: '8-12 months', color: '#10b981' },
  { icon: '🎨', title: 'UI/UX Design', skills: '14+ Skills', time: '6-10 months', color: '#ec4899' },
  { icon: '📱', title: 'Mobile Dev', skills: '13+ Skills', time: '8-12 months', color: '#8b5cf6' },
  { icon: '💻', title: 'Software Eng.', skills: '15+ Skills', time: '12-18 months', color: '#3b82f6' },
]

const steps = [
  { step: '01', title: 'Create Account', desc: 'Sign up for free in under 60 seconds.' },
  { step: '02', title: 'Choose Your Path', desc: 'Select from 8+ professional tech career tracks.' },
  { step: '03', title: 'Follow the Roadmap', desc: 'Learn skills step-by-step with AI guidance.' },
  { step: '04', title: 'Track & Grow', desc: 'Mark skills complete and watch your progress soar.' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-dark text-white overflow-x-hidden">
      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <BookOpen size={16} className="text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">EduPath <span className="text-indigo-400">Navigator</span></span>
          </div>
          <div className="flex items-center gap-3">
            <Link to="/login" className="text-sm text-slate-300 hover:text-white transition-colors px-3 py-1.5">
              Sign In
            </Link>
            <Link to="/signup" className="btn-primary text-sm py-2 px-4">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-40 left-1/4 w-64 h-64 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-64 h-64 bg-cyan-600/10 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm mb-8">
            <Zap size={14} className="text-indigo-400" />
            AI-powered career guidance for tech learners
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold leading-tight mb-6">
            Your AI-Powered
            <br />
            <span className="text-gradient">Learning Roadmap</span>
          </h1>

          <p className="text-lg sm:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Navigate your tech career with AI-generated roadmaps, skill analysis, and a personal AI mentor.
            From beginner to professional — step by step.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/signup" className="btn-primary flex items-center gap-2 text-base px-8 py-3.5 w-full sm:w-auto justify-center">
              Start Learning Free
              <ArrowRight size={18} />
            </Link>
            <Link to="/login" className="btn-secondary flex items-center gap-2 text-base px-8 py-3.5 w-full sm:w-auto justify-center">
              Sign In
              <ChevronRight size={16} />
            </Link>
          </div>

          {/* Social proof */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-12 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => <Star key={i} size={14} className="text-amber-400 fill-amber-400" />)}
              </div>
              <span>Loved by learners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle size={14} className="text-emerald-400" />
              <span>8+ Career Paths</span>
            </div>
            <div className="flex items-center gap-2">
              <Brain size={14} className="text-indigo-400" />
              <span>AI-Powered Guidance</span>
            </div>
          </div>
        </div>

        {/* Hero visual */}
        <div className="max-w-4xl mx-auto mt-16 relative">
          <div className="glass-card p-6 border-indigo-500/20">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-amber-400" />
              <div className="w-3 h-3 rounded-full bg-emerald-400" />
              <div className="flex-1 bg-white/5 rounded-md h-5 ml-2" />
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Completed Skills', value: '12', color: 'text-emerald-400' },
                { label: 'Total Skills', value: '20', color: 'text-white' },
                { label: 'Progress', value: '60%', color: 'text-indigo-400' },
              ].map(item => (
                <div key={item.label} className="bg-white/5 rounded-xl p-3 text-center">
                  <p className={`text-2xl font-bold ${item.color}`}>{item.value}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { label: 'HTML5 & CSS3', done: true },
                { label: 'JavaScript ES6+', done: true },
                { label: 'React.js', done: false },
              ].map(item => (
                <div key={item.label} className={`flex items-center gap-3 p-2.5 rounded-lg ${item.done ? 'bg-emerald-500/10 border border-emerald-500/20' : 'bg-white/5'}`}>
                  <div className={`w-4 h-4 rounded-full ${item.done ? 'bg-emerald-500' : 'bg-white/10'} flex items-center justify-center`}>
                    {item.done && <CheckCircle size={10} className="text-white" />}
                  </div>
                  <span className={`text-sm ${item.done ? 'text-emerald-300 line-through' : 'text-slate-300'}`}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Everything You Need to Succeed</h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">Powered by AI to give you the most effective learning experience in tech.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <div key={feature.title} className="glass-card-hover p-6 text-center group">
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mx-auto mb-5 shadow-lg group-hover:scale-110 transition-transform`}>
                  <feature.icon size={26} className="text-white" />
                </div>
                <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Career Paths */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/2">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Career Path</h2>
            <p className="text-slate-400 text-lg">8 professional tracks with structured, step-by-step roadmaps.</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {paths.map((path) => (
              <div
                key={path.title}
                className="glass-card-hover p-5 text-center cursor-pointer"
              >
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3 text-2xl"
                  style={{ background: `${path.color}22`, border: `1px solid ${path.color}44` }}
                >
                  {path.icon}
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{path.title}</h3>
                <p className="text-xs text-slate-400">{path.skills}</p>
                <p className="text-xs text-slate-500 mt-0.5">{path.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white mb-4">How It Works</h2>
            <p className="text-slate-400 text-lg">Get started in minutes. No experience required.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={step.step} className="relative">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-indigo-500/40 to-transparent z-0" />
                )}
                <div className="glass-card p-6 relative z-10">
                  <div className="text-3xl font-black text-gradient mb-4">{step.step}</div>
                  <h3 className="text-white font-semibold text-base mb-2">{step.title}</h3>
                  <p className="text-slate-400 text-sm">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <div className="glass-card p-10 border-indigo-500/20 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 to-purple-500/10" />
            <div className="relative">
              <h2 className="text-4xl font-bold text-white mb-4">Ready to Start Your Journey?</h2>
              <p className="text-slate-400 text-lg mb-8">Join thousands of learners who are building their tech careers with EduPath Navigator.</p>
              <Link to="/signup" className="btn-primary inline-flex items-center gap-2 text-lg px-10 py-4">
                Get Started — It's Free
                <ArrowRight size={20} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-md flex items-center justify-center">
              <BookOpen size={12} className="text-white" />
            </div>
            <span className="text-slate-400 text-sm">EduPath Navigator</span>
          </div>
          <p className="text-slate-500 text-sm">© 2024 EduPath Navigator. AI-powered tech career guidance.</p>
        </div>
      </footer>
    </div>
  )
}
