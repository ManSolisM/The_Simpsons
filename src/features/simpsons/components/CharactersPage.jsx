import { useState } from 'react'
import { useCharacters } from '@/features/simpsons/hooks/useSimpsons'
import Spinner from '@/components/ui/Spinner'
import CharacterModal from './CharacterModal'
import './Characters.css'

export default function CharactersPage() {
  const { characters, loading, error, reload } = useCharacters()
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)

  const filtered = characters.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="characters-page">
      <div className="page-header">
        <h1 className="page-title">👥 Personajes de Springfield</h1>
        <p className="page-sub">{characters.length} personajes encontrados en la API</p>
      </div>

      <div className="char-controls">
        <input
          className="search-input"
          placeholder="🔍 Buscar personaje..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="refresh-btn" onClick={reload} disabled={loading}>
          🔄 Recargar
        </button>
      </div>

      {loading && <div className="page-loading"><Spinner label="Conociendo a los personajes..." /></div>}
      {error && <div className="error-box">😵 Error: {error}</div>}

      {!loading && filtered.length === 0 && search && (
        <div className="empty-state">
          <div className="empty-emoji">🕵️</div>
          <p>No encontré a <strong>"{search}"</strong> en Springfield</p>
        </div>
      )}

      <div className="characters-grid">
        {filtered.map((char, i) => (
          <button
            key={char.name}
            className="char-card"
            style={{ animationDelay: `${i * 0.04}s` }}
            onClick={() => setSelected(char)}
            title={`Ver citas de ${char.name}`}
          >
            <div className="char-avatar-wrap">
              {char.image ? (
                <img
                  src={char.image}
                  alt={char.name}
                  className={`char-avatar ${char.direction === 'Right' ? 'flip' : ''}`}
                  loading="lazy"
                />
              ) : (
                <div className="char-avatar-fallback">🧑</div>
              )}
            </div>
            <div className="char-info">
              <div className="char-name">{char.name}</div>
              <div className="char-quote-count">{char.quotes.length} cita{char.quotes.length !== 1 ? 's' : ''}</div>
            </div>
            <div className="char-preview">
              "{char.quotes[0]?.substring(0, 60)}{char.quotes[0]?.length > 60 ? '…' : ''}"
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <CharacterModal character={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  )
}
