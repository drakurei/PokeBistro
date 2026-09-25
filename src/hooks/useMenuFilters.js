import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router'
import { categoriesById, tagsById, priceRangesById } from '../data/filters'
import { typesById } from '../data/types'
import { emptyFilters } from '../utils/filterProducts'

// The menu filters live in the URL: /menu?q=bento&category=bento&type=feu,eau&tag=epice&price=10-15
// Shareable, back-button friendly, and the home page can open the menu already filtered.
// Unknown values are dropped silently.

const MAX_QUERY = 60

function parseList(value, dictionary) {
  if (!value) return []
  return [...new Set(value.split(',').filter((id) => dictionary[id]))]
}

export default function useMenuFilters() {
  const [params, setParams] = useSearchParams()

  const filters = useMemo(
    () => ({
      q: (params.get('q') ?? '').slice(0, MAX_QUERY),
      category: categoriesById[params.get('category')] ? params.get('category') : '',
      types: parseList(params.get('type'), typesById),
      tags: parseList(params.get('tag'), tagsById),
      price: priceRangesById[params.get('price')] ? params.get('price') : 'all',
    }),
    [params],
  )

  // Writes a partial update back to the URL, keeping other params and omitting defaults
  const update = useCallback(
    (patch) => {
      setParams(
        (current) => {
          const next = new URLSearchParams(current)
          const merged = { ...filters, ...patch }
          const set = (key, value) => (value ? next.set(key, value) : next.delete(key))
          set('q', merged.q.trim().slice(0, MAX_QUERY))
          set('category', merged.category)
          set('type', merged.types.join(','))
          set('tag', merged.tags.join(','))
          set('price', merged.price === 'all' ? '' : merged.price)
          return next
        },
        { replace: true, preventScrollReset: true },
      )
    },
    [filters, setParams],
  )

  const toggleIn = (list, id) => (list.includes(id) ? list.filter((item) => item !== id) : [...list, id])

  return {
    filters,
    setQuery: (q) => update({ q }),
    setCategory: (category) => update({ category: filters.category === category ? '' : category }),
    toggleType: (type) => update({ types: toggleIn(filters.types, type) }),
    toggleTag: (tag) => update({ tags: toggleIn(filters.tags, tag) }),
    setPrice: (price) => update({ price }),
    reset: () => update(emptyFilters),
  }
}
