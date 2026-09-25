import ProductCard from '../components/menu/ProductCard'
import Button from '../components/ui/Button'
import { IconHeart } from '../components/ui/Icons'
import { useFavorites } from '../contexts/FavoritesContext'
import { productsById } from '../data/products'
import { plural } from '../utils/text'

// The dishes marked with the heart, kept in this browser
export default function FavoritesPage() {
  const { ids } = useFavorites()
  const favorites = ids.map((id) => productsById[id]).filter(Boolean)

  return (
    <>
      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Vos favoris</p>
          <h1 className="mt-4 font-display text-display-lg text-balance">
            {favorites.length > 0
              ? `${plural(favorites.length, 'plat')} à ne pas oublier.`
              : 'Rien de gardé pour l’instant.'}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-ink-soft">
            {favorites.length > 0
              ? 'Ils restent ici, dans ce navigateur, jusqu’à votre prochaine visite.'
              : 'Le cœur sur un plat le garde ici, dans ce navigateur, sans compte à créer.'}
          </p>
        </div>

        <div className="container-pb py-12">
          {favorites.length > 0 ? (
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {favorites.map((product) => (
                <li key={product.id}>
                  <ProductCard product={product} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex flex-col items-start gap-6 rounded-(--radius-lg) bg-washi p-8 md:p-12">
              <span className="flex size-14 items-center justify-center rounded-full bg-porcelain text-lacquer">
                <IconHeart size={26} />
              </span>
              <p className="max-w-md text-ink-soft">
                Parcourez la carte, ouvrez un plat qui vous fait envie et touchez le cœur. Il apparaîtra ici.
              </p>
              <Button to="/menu">Voir la carte</Button>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
