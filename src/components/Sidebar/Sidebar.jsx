import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import SearchBlock from './SearchBlock'
import CategoryBlock from './CategoryBlock'
import TagBlock from './TagBlock'
import PriceBlock from './PriceBlock'
import Button from '../Button/Button'
import IconFilter from '../Icons/IconFilter'

// The sidebar groups all the filter blocks and the reset button
function Sidebar() {
  const { resetFilters, activeFiltersCount } = useContext(FilterContext)

  return (
    <aside id="categories" aria-label="Filtres du menu" className="bg-white rounded-4 shadow-sm p-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="d-flex align-items-center gap-2 fs-5 fw-bold mb-0">
          <IconFilter />
          Filtrer
        </h2>
        {activeFiltersCount > 0 && (
          <span className="badge rounded-pill bg-poke-yellow text-poke-navy">
            {activeFiltersCount} actif{activeFiltersCount > 1 ? 's' : ''}
          </span>
        )}
      </div>

      <SearchBlock />
      <CategoryBlock />
      <TagBlock />
      <PriceBlock />

      <Button
        variant="outline-danger"
        className="w-100 mt-5"
        onClick={resetFilters}
        disabled={activeFiltersCount === 0}
      >
        Réinitialiser les filtres
      </Button>
    </aside>
  )
}

export default Sidebar
