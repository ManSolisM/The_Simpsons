import { useState, useEffect, useCallback } from 'react'
import { fetchQuotes, fetchAllCharacters, fetchStats, fetchQuotesByCharacter } from '@/services/simpsonsApi'

export function useQuotes(initialCount = 12) {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async (count = initialCount) => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchQuotes(count)
      setQuotes(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [initialCount])

  useEffect(() => { load() }, [load])

  return { quotes, loading, error, reload: load }
}

export function useCharacters() {
  const [characters, setCharacters] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await fetchAllCharacters()
      setCharacters(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return { characters, loading, error, reload: load }
}

export function useStats() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchStats()
      .then(setStats)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return { stats, loading, error }
}

export function useCharacterQuotes(character) {
  const [quotes, setQuotes] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const load = useCallback(async () => {
    if (!character) return
    setLoading(true)
    setError(null)
    try {
      const data = await fetchQuotesByCharacter(character, 20)
      setQuotes(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }, [character])

  useEffect(() => { load() }, [load])

  return { quotes, loading, error, reload: load }
}
