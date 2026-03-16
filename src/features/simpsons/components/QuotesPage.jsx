import { useState } from 'react'
import { useQuotes } from '@/features/simpsons/hooks/useSimpsons'
import Spinner from '@/components/ui/Spinner'
import QuoteCard from './QuoteCard'
import './Quotes.css'

const COUNTS = [6, 12, 24, 50]

export default function QuotesPage() {
  const [count, setCount] = useState(12)
  const [search, setSearch] = useState('')
  const { quotes, loading, error, reload } = useQuotes(count)

  const filtered = quotes.filter(
    (q) =>
      q.quote.toLowerCase().includes(search.toLowerCase()) ||
      q.character.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="quotes-page">
      <div className="page-header">
        <h1 className="page-title">💬 Citas de Springfield</h1>
        <p className="page-sub">Las frases más memorables de Los Simpson</p>
      </div>

      {/* Controls */}
      <div className="quotes-controls">
        <input
          className="search-input"
          placeholder="🔍 Buscar cita o personaje..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="count-pills">
          {COUNTS.map((c) => (
            <button
              key={c}
              className={`pill ${count === c ? 'active' : ''}`}
              onClick={() => { setCount(c); reload(c) }}
            >
              {c}
            </button>
          ))}
        </div>
        <button className="refresh-btn" onClick={() => reload(count)} disabled={loading}>
          🔄 Refrescar
        </button>
      </div>

      {loading && <div className="page-loading"><Spinner label="Trayendo citas de Springfield..." /></div>}
      {error && <div className="error-box">😵 Error: {error}</div>}

      {!loading && filtered.length > 0 && (
        <>
          <p className="results-count">{filtered.length} citas encontradas</p>
          <div className="quotes-grid">
            {filtered.map((q, i) => (
              <QuoteCard key={`${q.character}-${i}`} quote={q} delay={i * 0.04} />
            ))}
          </div>
        </>
      )}

      {!loading && filtered.length === 0 && search && (
        <div className="empty-state">
          <div className="empty-emoji">🤷</div>
          <p>No se encontraron resultados para <strong>"{search}"</strong></p>
        </div>
      )}
    </div>
  )
}
