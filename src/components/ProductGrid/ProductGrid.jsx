import { useContext } from 'react'
import FilterContext from '../../contexts/FilterContext'
import ProductCard from '../ProductCard/ProductCard'
import Button from '../Button/Button'
import IconFrown from '../Icons/IconFrown'
import products from '../../data/products'
import filterProducts from '../../utils/filterProducts'

// Grid of product cards (Bootstrap row / cols), filtered with the FilterContext
function ProductGrid() {
  const { search, category, tag, price, resetFilters } = useContext(FilterContext)

  const visibleProducts = filterProducts(products, { search, category, tag, price })

  // No result: clear message + a way to start again
  if (visibleProducts.length === 0) {
    return (
      <div className="text-center bg-white rounded-4 shadow-sm py-16 px-4" role="status">
        <div className="text-secondary mb-3">
          <IconFrown />
        </div>
        <h3 className="fs-4 fw-bold mb-2">Aucun plat ne correspond à vos filtres</h3>
        <p className="text-secondary mb-4">Essayez un autre mot-clé, ou réinitialisez les filtres pour revoir toute la carte.</p>
        <Button variant="primary" onClick={resetFilters}>
          Réinitialiser les filtres
        </Button>
      </div>
    )
  }

  return (
    <div>
      <p className="d-flex align-items-center gap-2 text-secondary mb-4" role="status">
        <span className="fs-5 fw-bold text-poke-navy">{visibleProducts.length}</span>
        {visibleProducts.length > 1 ? 'plats' : 'plat'}
        {visibleProducts.length < products.length && ` sur ${products.length}`}
      </p>
      <div className="row row-cols-1 row-cols-sm-2 row-cols-xl-3 g-4">
        {visibleProducts.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
