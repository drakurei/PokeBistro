import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { productsById } from '../data/products'
import { readJSON, writeJSON, isPositiveInt } from '../utils/storage'

const STORAGE_KEY = 'favorites'
const FavoritesContext = createContext(null)

const isValidList = (value) =>
  Array.isArray(value) && value.length <= 100 && value.every((id) => isPositiveInt(id) && productsById[id])

export function FavoritesProvider({ children }) {
  const [ids, setIds] = useState(() => readJSON(STORAGE_KEY, isValidList) ?? [])

  useEffect(() => {
    writeJSON(STORAGE_KEY, ids)
  }, [ids])

  const isFavorite = useCallback((id) => ids.includes(id), [ids])
  const toggle = useCallback((id) => {
    setIds((current) => (current.includes(id) ? current.filter((item) => item !== id) : [...current, id]))
  }, [])

  const value = useMemo(() => ({ ids, count: ids.length, isFavorite, toggle }), [ids, isFavorite, toggle])

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>
}

// oxlint-disable-next-line react/only-export-components -- provider and hook belong together
export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (!context) throw new Error('useFavorites must be used inside <FavoritesProvider>')
  return context
}
