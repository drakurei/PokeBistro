import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import FilterBlock from '../FilterBlock/FilterBlock'
import { priceRanges } from '../../data/filters'

// Price ranges as radio buttons (only one range at a time)
function PriceBlock() {
  const { price, setPrice } = useContext(FilterContext)

  return (
    <FilterBlock title="Prix">
      <div className="d-flex flex-column gap-2">
        {priceRanges.map((range) => {
          const isChecked = price === range.id

          return (
            <div key={range.id} className="form-check d-flex align-items-center gap-2 m-0 ps-0">
              <input
                id={`price-${range.id}`}
                type="radio"
                name="price"
                className="form-check-input m-0 flex-shrink-0"
                value={range.id}
                checked={isChecked}
                onChange={() => setPrice(range.id)}
              />
              <label htmlFor={`price-${range.id}`} className={isChecked ? 'form-check-label fw-bold' : 'form-check-label'}>
                {range.label}
              </label>
            </div>
          )
        })}
      </div>
    </FilterBlock>
  )
}

export default PriceBlock
