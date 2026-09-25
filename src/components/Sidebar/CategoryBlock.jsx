import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import FilterBlock from '../FilterBlock/FilterBlock'
import { categories } from '../../data/filters'
import products from '../../data/products'

// Category list. Each line shows how many products belong to the category.
function CategoryBlock() {
  const { category, toggleCategory } = useContext(FilterContext)

  return (
    <FilterBlock title="Catégories">
      <div className="d-flex flex-column gap-1">
        <button
          type="button"
          className={category === '' ? 'filter-option is-active' : 'filter-option'}
          aria-pressed={category === ''}
          onClick={() => toggleCategory('')}
        >
          Tous les plats
          <span className="filter-count">{products.length}</span>
        </button>

        {categories.map((name) => {
          const count = products.filter((product) => product.category === name).length
          const isActive = category === name

          return (
            <button
              key={name}
              type="button"
              className={isActive ? 'filter-option is-active' : 'filter-option'}
              aria-pressed={isActive}
              onClick={() => toggleCategory(name)}
            >
              {name}
              <span className="filter-count">{count}</span>
            </button>
          )
        })}
      </div>
    </FilterBlock>
  )
}

export default CategoryBlock
