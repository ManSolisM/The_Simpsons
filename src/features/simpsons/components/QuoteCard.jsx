import './QuoteCard.css'

const CARD_COLORS = ['#FED90F', '#87CEEB', '#A5D6A7', '#FFCC80', '#F48FB1', '#CE93D8', '#80DEEA']

export default function QuoteCard({ quote, delay = 0 }) {
  const color = CARD_COLORS[quote.character.charCodeAt(0) % CARD_COLORS.length]

  return (
    <div
      className="quote-card"
      style={{ animationDelay: `${delay}s`, '--card-color': color }}
    >
      {/* Character image */}
      <div className="qcard-img-wrap">
        {quote.image ? (
          <img
            src={quote.image}
            alt={quote.character}
            className={`qcard-img ${quote.characterDirection === 'Right' ? 'flip' : ''}`}
            loading="lazy"
          />
        ) : (
          <div className="qcard-img-fallback">🧑</div>
        )}
      </div>

      {/* Quote bubble */}
      <div className="quote-bubble">
        <p className="quote-text">"{quote.quote}"</p>
      </div>

      {/* Character name */}
      <div className="quote-character" style={{ background: color }}>
        {quote.character}
      </div>
    </div>
  )
}
