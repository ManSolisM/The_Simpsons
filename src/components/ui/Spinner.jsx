import './Spinner.css'

export default function Spinner({ label = 'Cargando...' }) {
  return (
    <div className="spinner-wrap" role="status" aria-label={label}>
      <div className="spinner-donuts">
        <span className="s-donut s1">🍩</span>
        <span className="s-donut s2">🍩</span>
        <span className="s-donut s3">🍩</span>
      </div>
      <p className="spinner-label">{label}</p>
    </div>
  )
}
