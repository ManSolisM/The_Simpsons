import axios from 'axios'

const BASE_URL = 'https://thesimpsonsquoteapi.glitch.me'

const api = axios.create({ baseURL: BASE_URL })

// ── Quotes ──────────────────────────────────────────────
export const fetchQuotes = async (count = 10) => {
  const { data } = await api.get(`/quotes?count=${count}`)
  return data
}

export const fetchQuotesByCharacter = async (character, count = 10) => {
  const encoded = encodeURIComponent(character)
  const { data } = await api.get(`/quotes?character=${encoded}&count=${count}`)
  return data
}

// ── Derived helpers ──────────────────────────────────────
export const fetchAllCharacters = async () => {
  // Load a large batch and extract unique characters
  const quotes = await fetchQuotes(100)
  const map = new Map()
  quotes.forEach((q) => {
    if (!map.has(q.character)) {
      map.set(q.character, {
        name: q.character,
        image: q.image,
        direction: q.characterDirection,
        quotes: [],
      })
    }
    map.get(q.character).quotes.push(q.quote)
  })
  return Array.from(map.values())
}

export const fetchStats = async () => {
  const quotes = await fetchQuotes(100)
  const charCount = {}
  quotes.forEach((q) => {
    charCount[q.character] = (charCount[q.character] || 0) + 1
  })
  const top = Object.entries(charCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }))

  return {
    totalQuotes: quotes.length,
    uniqueCharacters: Object.keys(charCount).length,
    topCharacters: top,
    allQuotes: quotes,
  }
}

export default api
