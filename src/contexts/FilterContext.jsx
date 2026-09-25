import { createContext, useState } from 'react'

// Shared state of the filters (search, category, tag, price).
// Components read and update it with useContext(FilterContext),
// so we don't have to pass props from the page down to every block.
const FilterContext = createContext(null)

export function FilterProvider({ children }) {
  const [search, setSearch] = useState('')
  // '' means "all categories" / "all tags"
  const [category, setCategory] = useState('')
  const [tag, setTag] = useState('')
  // id of a range from data/filters.js ('all' = no price filter)
  const [price, setPrice] = useState('all')

  // Clicking the active category or tag a second time removes the filter
  const toggleCategory = (value) => setCategory(category === value ? '' : value)
  const toggleTag = (value) => setTag(tag === value ? '' : value)

  const resetFilters = () => {
    setSearch('')
    setCategory('')
    setTag('')
    setPrice('all')
  }

  // Number of filters currently active (shown on the mobile "Filtres" button)
  const activeFiltersCount = [search !== '', category !== '', tag !== '', price !== 'all'].filter(Boolean).length

  const value = {
    search,
    setSearch,
    category,
    toggleCategory,
    tag,
    toggleTag,
    price,
    setPrice,
    resetFilters,
    activeFiltersCount,
  }

  return <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
}

export default FilterContext
