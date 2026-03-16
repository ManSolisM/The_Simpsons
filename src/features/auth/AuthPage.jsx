import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/store/AuthContext'
import toast from 'react-hot-toast'
import AnimatedBackground from '@/components/animated/AnimatedBackground'
import './Auth.css'

export default function AuthPage() {
  const [mode, setMode] = useState('login') // 'login' | 'register'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [loading, setLoading] = useState(false)
  const [shake, setShake] = useState(false)
  const { login, register } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  const triggerShake = () => {
    setShake(true)
    setTimeout(() => setShake(false), 500)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      if (mode === 'register') {
        if (!form.name.trim()) throw new Error('El nombre es obligatorio')
        if (form.password !== form.confirm) throw new Error('Las contraseñas no coinciden')
        if (form.password.length < 6) throw new Error('Mínimo 6 caracteres en la contraseña')
        await register({ name: form.name, email: form.email, password: form.password })
        toast.success(`¡D'oh! Bienvenido/a ${form.name}! 🍩`)
      } else {
        await login({ email: form.email, password: form.password })
        toast.success('¡Excellent! Has iniciado sesión 🎉')
      }
      navigate('/dashboard')
    } catch (err) {
      triggerShake()
      toast.error(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <AnimatedBackground />

      <div className={`auth-card ${shake ? 'shake' : ''}`}>
        {/* Logo */}
        <div className="auth-logo">
          <div className="auth-logo-icon">🏠</div>
          <h1 className="auth-title">The Simpsons<br />Explorer</h1>
          <p className="auth-subtitle">¡Ay caramba! Ingresa a Springfield</p>
        </div>

        {/* Tabs */}
        <div className="auth-tabs">
          <button
            className={`auth-tab ${mode === 'login' ? 'active' : ''}`}
            onClick={() => setMode('login')}
            type="button"
          >
            Ingresar
          </button>
          <button
            className={`auth-tab ${mode === 'register' ? 'active' : ''}`}
            onClick={() => setMode('register')}
            type="button"
          >
            Registrarse
          </button>
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleSubmit}>
          {mode === 'register' && (
            <div className="field">
              <label htmlFor="name">Tu nombre</label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Homer Simpson..."
                value={form.name}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <div className="field">
            <label htmlFor="email">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="homer@springfield.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="field">
            <label htmlFor="password">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="••••••••"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          {mode === 'register' && (
            <div className="field">
              <label htmlFor="confirm">Confirmar contraseña</label>
              <input
                id="confirm"
                name="confirm"
                type="password"
                placeholder="••••••••"
                value={form.confirm}
                onChange={handleChange}
                required
              />
            </div>
          )}

          <button
            type="submit"
            className="auth-btn"
            disabled={loading}
          >
            {loading ? (
              <span className="loading-dots">
                <span />
                <span />
                <span />
              </span>
            ) : mode === 'login' ? (
              "¡D'oh! Entrar"
            ) : (
              '¡Unirse a Springfield!'
            )}
          </button>
        </form>

        {mode === 'login' && (
          <p className="auth-hint">
            ¿No tienes cuenta?{' '}
            <button type="button" onClick={() => setMode('register')}>Regístrate gratis</button>
          </p>
        )}

        {/* Demo hint */}
        <div className="demo-hint">
          <span>🍩</span>
          <span>Usa cualquier correo para registrarte y explorar</span>
        </div>
      </div>
    </div>
  )
}
