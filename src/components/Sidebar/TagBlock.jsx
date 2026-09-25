import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import FilterBlock from '../FilterBlock/FilterBlock'
import { tags } from '../../data/filters'

// Tag chips (populaire, épicé, végétarien...). One tag active at a time.
function TagBlock() {
  const { tag, toggleTag } = useContext(FilterContext)

  return (
    <FilterBlock title="Tags">
      <div className="d-flex flex-wrap gap-2">
        {tags.map((name) => {
          const isActive = tag === name

          return (
            <button
              key={name}
              type="button"
              className={isActive ? 'chip is-active' : 'chip'}
              aria-pressed={isActive}
              onClick={() => toggleTag(name)}
            >
              {name}
            </button>
          )
        })}
      </div>
    </FilterBlock>
  )
}

export default TagBlock
