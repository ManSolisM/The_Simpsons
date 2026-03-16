import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider } from '@/store/AuthContext'
import ProtectedRoute from '@/components/ui/ProtectedRoute'
import Layout from '@/components/layout/Layout'
import AnimatedBackground from '@/components/animated/AnimatedBackground'

// Pages
import AuthPage from '@/features/auth/AuthPage'
import Dashboard from '@/features/simpsons/components/Dashboard'
import QuotesPage from '@/features/simpsons/components/QuotesPage'
import CharactersPage from '@/features/simpsons/components/CharactersPage'
import StatsPage from '@/features/simpsons/components/StatsPage'

function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<AuthPage />} />

      {/* Protected */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Layout>
              <Dashboard />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/quotes"
        element={
          <ProtectedRoute>
            <Layout>
              <QuotesPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/characters"
        element={
          <ProtectedRoute>
            <Layout>
              <CharactersPage />
            </Layout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/stats"
        element={
          <ProtectedRoute>
            <Layout>
              <StatsPage />
            </Layout>
          </ProtectedRoute>
        }
      />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <AppRoutes />
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: '#FED90F',
              color: '#1A1A1A',
              border: '3px solid #1A1A1A',
              borderRadius: '12px',
              boxShadow: '4px 4px 0 #1A1A1A',
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
            },
            success: { iconTheme: { primary: '#1A1A1A', secondary: '#FED90F' } },
            error: {
              style: {
                background: '#E63946',
                color: 'white',
                border: '3px solid #1A1A1A',
                boxShadow: '4px 4px 0 #1A1A1A',
              },
            },
          }}
        />
      </BrowserRouter>
    </AuthProvider>
  )
}
