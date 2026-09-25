import { Link, useParams } from 'react-router'
import Seo, { JsonLd, SITE_URL } from '../components/layout/Seo'
import ProductDetail from '../components/menu/ProductDetail'
import ProductCard from '../components/menu/ProductCard'
import Button from '../components/ui/Button'
import { IconChevronLeft } from '../components/ui/Icons'
import products, { getProductBySlug } from '../data/products'
import { getType } from '../data/types'
import { PokeballMark } from '../components/layout/Logo'

// Direct visit to /menu/:slug (shared link, reload): the dish as a full page, with related dishes
export default function ProductPage() {
  const { slug } = useParams()
  const product = getProductBySlug(slug)

  if (!product) {
    return (
      <section className="container-pb flex min-h-[70vh] flex-col items-center justify-center pt-(--spacing-header) text-center">
        <Seo title="Plat introuvable" path={`/menu/${slug}`} />
        <PokeballMark size={64} className="text-ink-mute" />
        <h1 className="mt-6 font-display text-display-md">Ce plat n’est pas à la carte.</h1>
        <p className="mt-3 max-w-md text-ink-soft">
          Il a peut-être évolué. Retrouvez les 28 plats du moment sur la carte.
        </p>
        <Button to="/menu" className="mt-8">
          Voir la carte
        </Button>
      </section>
    )
  }

  const type = getType(product.type)
  const related = products.filter((item) => item.type === product.type && item.id !== product.id).slice(0, 3)

  return (
    <>
      <Seo
        title={product.name}
        path={`/menu/${product.slug}`}
        description={`${product.description} ${type ? `Type ${type.label}.` : ''} ${product.price.toFixed(2).replace('.', ',')} € chez PokéBistro.`}
        type="product"
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'MenuItem',
          name: product.name,
          description: product.description,
          image: `${SITE_URL}${product.image}`,
          offers: { '@type': 'Offer', price: product.price.toFixed(2), priceCurrency: 'EUR' },
          suitableForDiet: product.tags.includes('vegetarien')
            ? 'https://schema.org/VegetarianDiet'
            : undefined,
        }}
      />

      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-6">
          <Link
            to="/menu"
            className="inline-flex items-center gap-1 font-mono text-xs tracking-[0.12em] text-ink-mute uppercase no-underline hover:text-ink"
          >
            <IconChevronLeft size={16} />
            La carte
          </Link>
        </div>
        <div className="container-pb py-6">
          <div className="overflow-hidden rounded-(--radius-lg) border border-line bg-porcelain">
            <ProductDetail product={product} titleId="product-page-title" />
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section aria-labelledby="related-title" className="container-pb pb-section">
          <h2 id="related-title" className="font-display text-display-sm">
            Aussi de type {type.label}
          </h2>
          <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <li key={item.id}>
                <ProductCard product={item} />
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  )
}
