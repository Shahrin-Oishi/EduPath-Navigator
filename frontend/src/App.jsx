import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { ProgressProvider } from './context/ProgressContext'
import ProtectedRoute from './components/ProtectedRoute'

import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import DashboardPage from './pages/DashboardPage'
import CareerPathsPage from './pages/CareerPathsPage'
import RoadmapDetailPage from './pages/RoadmapDetailPage'
import AIRoadmapGeneratorPage from './pages/AIRoadmapGeneratorPage'
import AISkillAnalyzerPage from './pages/AISkillAnalyzerPage'
import AIChatPage from './pages/AIChatPage'
import ProfilePage from './pages/ProfilePage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <AuthProvider>
      <ProgressProvider>
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />

            {/* Protected routes */}
            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/career-paths" element={<ProtectedRoute><CareerPathsPage /></ProtectedRoute>} />
            <Route path="/roadmap/:id" element={<ProtectedRoute><RoadmapDetailPage /></ProtectedRoute>} />
            <Route path="/ai/generate" element={<ProtectedRoute><AIRoadmapGeneratorPage /></ProtectedRoute>} />
            <Route path="/ai/analyze" element={<ProtectedRoute><AISkillAnalyzerPage /></ProtectedRoute>} />
            <Route path="/ai/chat" element={<ProtectedRoute><AIChatPage /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

            <Route path="/404" element={<NotFoundPage />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ProgressProvider>
    </AuthProvider>
  )
}
