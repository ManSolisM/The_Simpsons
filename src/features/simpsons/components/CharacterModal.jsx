import { useEffect } from 'react'
import { useCharacterQuotes } from '@/features/simpsons/hooks/useSimpsons'
import Spinner from '@/components/ui/Spinner'
import './CharacterModal.css'

export default function CharacterModal({ character, onClose }) {
  const { quotes, loading } = useCharacterQuotes(character.name)

  // Close on Escape
  useEffect(() => {
    const handler = (e) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent scroll on body
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-box"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Perfil de ${character.name}`}
      >
        {/* Header */}
        <div className="modal-header">
          <div className="modal-avatar-wrap">
            {character.image ? (
              <img
                src={character.image}
                alt={character.name}
                className={`modal-avatar ${character.direction === 'Right' ? 'flip' : ''}`}
              />
            ) : (
              <span style={{ fontSize: '4rem' }}>🧑</span>
            )}
          </div>
          <div className="modal-title-wrap">
            <h2 className="modal-char-name">{character.name}</h2>
            <p className="modal-char-sub">
              {quotes.length > 0 ? `${quotes.length} citas encontradas` : 'Cargando citas...'}
            </p>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>
        </div>

        {/* Body */}
        <div className="modal-body">
          {loading && (
            <div className="modal-loading">
              <Spinner label="Trayendo citas..." />
            </div>
          )}

          {!loading && quotes.length === 0 && (
            <div className="empty-state">
              <div className="empty-emoji">🤐</div>
              <p>{character.name} no dijo nada esta vez... ¡intenta de nuevo!</p>
            </div>
          )}

          <div className="modal-quotes-list">
            {quotes.map((q, i) => (
              <div key={i} className="modal-quote-item">
                <span className="modal-quote-num">{i + 1}</span>
                <p className="modal-quote-text">"{q.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
