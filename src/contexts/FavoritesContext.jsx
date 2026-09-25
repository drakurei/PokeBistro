import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productsById } from '../data/products'
import { readJSON, writeJSON, isPositiveInt } from '../utils/storage'

const STORAGE_KEY = 'favorites'
const FavoritesContext = createContext(null)

const isValidList = (value) =>
  Array.isArray(value) && value.length <= 100 && value.every((id) => isPositiveInt(id) && productsById[id])

export function FavoritesProvider({ children }) {
  // Empty on the first render (it must match the pre-rendered HTML), read from storage right after
  const [ids, setIds] = useState([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    const stored = readJSON(STORAGE_KEY, isValidList)
    // oxlint-disable-next-line react/set-state-in-effect -- localStorage is an external system, read once after mount
    if (stored) setIds(stored)
    // oxlint-disable-next-line react/set-state-in-effect -- localStorage is an external system, read once after mount
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) writeJSON(STORAGE_KEY, ids)
  }, [ids, hydrated])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])
  const toggle = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }, [])

  const value = useMemo(
    () => ({ ids, count: ids.length, isFavorite, toggle, hydrated }),
    [ids, isFavorite, toggle, hydrated],
  )

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

// oxlint-disable-next-line react/only-export-components -- provider and hook belong together
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return context
}
