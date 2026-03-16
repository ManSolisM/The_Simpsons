import axios from 'axios'

const BASE_URL = 'https://thesimpsonsquoteapi.glitch.me'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000, // 15 segundos — da tiempo a que Glitch despierte
})

// ── Retry helper ─────────────────────────────────────────
// Glitch se duerme y la primera llamada falla; reintentamos hasta 3 veces
const withRetry = async (fn, retries = 3, delay = 2000) => {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn()
    } catch (err) {
      const isLast = i === retries - 1
      if (isLast) throw err
      // Espera antes del siguiente intento (2s, 4s, 6s...)
      await new Promise((res) => setTimeout(res, delay * (i + 1)))
    }
  }
}

// ── Quotes ───────────────────────────────────────────────
export const fetchQuotes = async (count = 10) => {
  return withRetry(async () => {
    const { data } = await api.get(`/quotes?count=${count}`)
    if (!Array.isArray(data)) throw new Error('Respuesta inesperada de la API')
    return data
  })
}

export const fetchQuotesByCharacter = async (character, count = 10) => {
  return withRetry(async () => {
    const encoded = encodeURIComponent(character)
    const { data } = await api.get(`/quotes?character=${encoded}&count=${count}`)
    if (!Array.isArray(data)) throw new Error('Respuesta inesperada de la API')
    return data
  })
}

// ── Derived helpers ───────────────────────────────────────
export const fetchAllCharacters = async () => {
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
