import { useStats } from '@/features/simpsons/hooks/useSimpsons'
import Spinner from '@/components/ui/Spinner'
import './StatsPage.css'

const PALETTE = [
  '#FED90F', '#87CEEB', '#A5D6A7', '#FFCC80',
  '#F48FB1', '#CE93D8', '#80DEEA', '#BCAAA4',
  '#EF9A9A', '#FFE082',
]

export default function StatsPage() {
  const { stats, loading, error } = useStats()

  if (loading) {
    return (
      <div className="stats-page">
        <div className="page-header">
          <h1 className="page-title">📊 Estadísticas</h1>
        </div>
        <div className="page-loading"><Spinner label="Calculando datos de Springfield..." /></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="stats-page">
        <div className="error-box">😵 Error: {error}</div>
      </div>
    )
  }

  if (!stats) return null

  const maxCount = stats.topCharacters[0]?.count || 1

  return (
    <div className="stats-page">
      <div className="page-header">
        <h1 className="page-title">📊 Estadísticas de Springfield</h1>
        <p className="page-sub">Análisis completo de los datos de la API</p>
      </div>

      {/* Summary cards */}
      <div className="summary-grid">
        <SummaryCard emoji="💬" label="Total de citas" value={stats.totalQuotes} color="#FED90F" />
        <SummaryCard emoji="👥" label="Personajes únicos" value={stats.uniqueCharacters} color="#87CEEB" />
        <SummaryCard emoji="🏆" label="Personaje más citado" value={stats.topCharacters[0]?.name} color="#A5D6A7" />
        <SummaryCard
          emoji="📈"
          label="Promedio citas/personaje"
          value={(stats.totalQuotes / stats.uniqueCharacters).toFixed(1)}
          color="#FFCC80"
        />
      </div>

      <div className="stats-two-col">
        {/* Bar chart */}
        <div className="chart-card">
          <h2 className="chart-title">🎙️ Top 10 Personajes</h2>
          <div className="bar-chart">
            {stats.topCharacters.map((c, i) => (
              <div key={c.name} className="bar-row">
                <div className="bar-label" title={c.name}>{c.name}</div>
                <div className="bar-track">
                  <div
                    className="bar-fill"
                    style={{
                      width: `${(c.count / maxCount) * 100}%`,
                      background: PALETTE[i % PALETTE.length],
                    }}
                  >
                    <span className="bar-val">{c.count}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Donut / distribution */}
        <div className="chart-card">
          <h2 className="chart-title">🍩 Distribución de Citas</h2>
          <div className="donut-chart-wrap">
            <DonutChart data={stats.topCharacters} palette={PALETTE} total={stats.totalQuotes} />
          </div>
          <div className="donut-legend">
            {stats.topCharacters.map((c, i) => (
              <div key={c.name} className="legend-item">
                <span className="legend-dot" style={{ background: PALETTE[i % PALETTE.length] }} />
                <span className="legend-name">{c.name}</span>
                <span className="legend-pct">{((c.count / stats.totalQuotes) * 100).toFixed(0)}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent quotes table */}
      <div className="table-card">
        <h2 className="chart-title">📋 Últimas 20 citas cargadas</h2>
        <div className="table-wrap">
          <table className="quotes-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Personaje</th>
                <th>Cita</th>
              </tr>
            </thead>
            <tbody>
              {stats.allQuotes.slice(0, 20).map((q, i) => (
                <tr key={i}>
                  <td className="td-num">{i + 1}</td>
                  <td className="td-char">{q.character}</td>
                  <td className="td-quote">"{q.quote}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

/* ── Sub-components ── */
function SummaryCard({ emoji, label, value, color }) {
  return (
    <div className="summary-card" style={{ '--sc-color': color }}>
      <div className="sc-emoji">{emoji}</div>
      <div className="sc-value">{value}</div>
      <div className="sc-label">{label}</div>
    </div>
  )
}

function DonutChart({ data, palette, total }) {
  const size = 200
  const cx = size / 2
  const cy = size / 2
  const r = 70
  const gap = 0.02

  let cumulative = 0
  const slices = data.map((d, i) => {
    const frac = d.count / total
    const startAngle = cumulative * 2 * Math.PI - Math.PI / 2
    cumulative += frac
    const endAngle = cumulative * 2 * Math.PI - Math.PI / 2
    const x1 = cx + r * Math.cos(startAngle + gap)
    const y1 = cy + r * Math.sin(startAngle + gap)
    const x2 = cx + r * Math.cos(endAngle - gap)
    const y2 = cy + r * Math.sin(endAngle - gap)
    const large = frac > 0.5 ? 1 : 0
    return { path: `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${large} 1 ${x2} ${y2} Z`, color: palette[i % palette.length], name: d.name }
  })

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="donut-svg">
      {slices.map((s, i) => (
        <path key={i} d={s.path} fill={s.color} stroke="#1A1A1A" strokeWidth="2">
          <title>{s.name}</title>
        </path>
      ))}
      {/* Center hole */}
      <circle cx={cx} cy={cy} r={r * 0.52} fill="white" stroke="#1A1A1A" strokeWidth="3" />
      <text x={cx} y={cy - 6} textAnchor="middle" style={{ fontFamily: 'Bangers', fontSize: '22px', fill: '#1A1A1A' }}>
        {total}
      </text>
      <text x={cx} y={cy + 14} textAnchor="middle" style={{ fontFamily: 'Nunito', fontSize: '9px', fontWeight: 700, fill: '#666' }}>
        CITAS
      </text>
    </svg>
  )
}
