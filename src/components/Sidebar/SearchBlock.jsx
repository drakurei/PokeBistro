import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import FilterBlock from '../FilterBlock/FilterBlock'
import IconSearch from '../Icons/IconSearch'

// Text search: name, category, keywords and tags of the products
function SearchBlock() {
  const { search, setSearch } = useContext(FilterContext)

  return (
    <FilterBlock title="Recherche">
      <label htmlFor="search-input" className="visually-hidden">
        Rechercher un plat, une catégorie ou un mot-clé
      </label>
      <div className="position-relative">
        <span className="position-absolute top-50 translate-middle-y ms-3 text-secondary" aria-hidden="true">
          <IconSearch />
        </span>
        <input
          id="search-input"
          type="search"
          className="form-control rounded-pill border-0 bg-light py-2 ps-11 pe-10"
          placeholder="Pikachu, burger, épicé…"
          autoComplete="off"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        {search !== '' && (
          <button
            type="button"
            className="btn btn-link btn-sm position-absolute top-50 end-0 translate-middle-y me-2 p-1 text-secondary text-decoration-none"
            onClick={() => setSearch('')}
            aria-label="Effacer la recherche"
          >
            ✕
          </button>
        )}
      </div>
    </FilterBlock>
  )
}

export default SearchBlock
