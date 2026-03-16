import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import toast from 'react-hot-toast'
import './Layout.css'

const NAV_ITEMS = [
  { to: '/dashboard', label: '🏠 Inicio', title: 'Dashboard' },
  { to: '/quotes', label: '💬 Citas', title: 'Citas' },
  { to: '/characters', label: '👥 Personajes', title: 'Personajes' },
  { to: '/stats', label: '📊 Estadísticas', title: 'Estadísticas' },
]

export default function Layout({ children }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleLogout = () => {
    logout()
    toast('¡Hasta la vista, Springfield! 👋', { icon: '🍩' })
    navigate('/')
  }

  return (
    <div className="layout">
      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-inner">
          <NavLink to="/dashboard" className="nav-brand">
            <span className="nav-brand-icon">🍩</span>
            <span className="nav-brand-text">Simpsons<br />Explorer</span>
          </NavLink>

          {/* Desktop nav */}
          <div className="nav-links">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* User */}
          <div className="nav-user">
            <div className="user-badge">
              <span className="user-avatar">
                {user?.name?.[0]?.toUpperCase() || '?'}
              </span>
              <span className="user-name">{user?.name}</span>
            </div>
            <button className="logout-btn" onClick={handleLogout} title="Cerrar sesión">
              🚪
            </button>
          </div>

          {/* Mobile toggle */}
          <button
            className="hamburger"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menú"
          >
            {menuOpen ? '✕' : '☰'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => `mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <button className="mobile-logout" onClick={handleLogout}>
              🚪 Cerrar sesión
            </button>
          </div>
        )}
      </nav>

      {/* Page content */}
      <main className="main-content">{children}</main>
    </div>
  )
}
