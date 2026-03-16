import { useAuth } from '@/store/AuthContext'
import { useStats } from '@/features/simpsons/hooks/useSimpsons'
import { NavLink } from 'react-router-dom'
import AnimatedBackground from '@/components/animated/AnimatedBackground'
import Spinner from '@/components/ui/Spinner'
import './Dashboard.css'

const QUICK_LINKS = [
  { to: '/quotes', emoji: '💬', label: 'Citas', desc: 'Frases icónicas de Springfield' },
  { to: '/characters', emoji: '👥', label: 'Personajes', desc: 'Conoce a los Simpsons' },
  { to: '/stats', emoji: '📊', label: 'Estadísticas', desc: 'Datos y rankings' },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { stats, loading } = useStats()

  return (
    <div className="dashboard-page">
      <AnimatedBackground />
      <div className="dashboard-inner">
        {/* Hero */}
        <div className="dashboard-hero">
          <div className="hero-text">
            <h1 className="hero-greeting">
              ¡Hola, <span className="hero-name">{user?.name}!</span>
            </h1>
            <p className="hero-sub">Bienvenido/a a Springfield. ¿Qué quieres explorar hoy?</p>
          </div>
          <div className="hero-character" title="Homer Simpson">🧔‍♂️</div>
        </div>

        {/* Stats row */}
        {loading ? (
          <div className="stats-loading">
            <Spinner label="Cargando datos de Springfield..." />
          </div>
        ) : stats ? (
          <div className="stats-row">
            <StatCard emoji="💬" value={stats.totalQuotes} label="Citas cargadas" color="yellow" />
            <StatCard emoji="👥" value={stats.uniqueCharacters} label="Personajes únicos" color="blue" />
            <StatCard emoji="⭐" value={stats.topCharacters[0]?.name || '—'} label="Personaje top" color="green" />
            <StatCard emoji="🎙️" value={stats.topCharacters[0]?.count || 0} label="Citas del top" color="orange" />
          </div>
        ) : null}

        {/* Quick links */}
        <h2 className="section-title">🗺️ Explora Springfield</h2>
        <div className="quick-links">
          {QUICK_LINKS.map((l) => (
            <NavLink key={l.to} to={l.to} className="quick-card">
              <span className="qcard-emoji">{l.emoji}</span>
              <div>
                <div className="qcard-label">{l.label}</div>
                <div className="qcard-desc">{l.desc}</div>
              </div>
              <span className="qcard-arrow">→</span>
            </NavLink>
          ))}
        </div>

        {/* Top characters */}
        {stats && (
          <div className="top-section">
            <h2 className="section-title">🏆 Top Personajes por Citas</h2>
            <div className="top-bar-list">
              {stats.topCharacters.map((c, i) => (
                <div key={c.name} className="top-bar-row">
                  <span className="top-rank">#{i + 1}</span>
                  <span className="top-char-name">{c.name}</span>
                  <div className="top-bar-track">
                    <div
                      className="top-bar-fill"
                      style={{
                        width: `${(c.count / stats.topCharacters[0].count) * 100}%`,
                        background: `hsl(${i * 36}, 80%, 55%)`,
                      }}
                    />
                  </div>
                  <span className="top-count">{c.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function StatCard({ emoji, value, label, color }) {
  return (
    <div className={`stat-card stat-${color}`}>
      <div className="stat-emoji">{emoji}</div>
      <div className="stat-value">{value}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}
