import { productsBySlug } from '../../data/products'
import Button from '../ui/Button'
import { IconArrowRight } from '../ui/Icons'
import ProductCard from '../menu/ProductCard'
import Reveal from '../motion/Reveal'
import Belt from '../layout/Belt'

// Six of the signature dishes, chosen for the home page (all carry the "signature" tag)
const homeSignatures = [
  'pikachu-bento',
  'lucario-power-burger',
  'marill-aqua-bowl',
  'dracaufeu-spicy-menu',
  'mentali-velvet-cake',
  'mewtwo-deluxe-menu',
]
  .map((slug) => productsBySlug[slug])
  .filter(Boolean)

// The "tray": cream compartments on an ink surface, like a bento box
export default function SignatureDishes() {
  return (
    <section aria-labelledby="signature-title" className="bg-ink text-porcelain">
      <Belt light />
      <div className="container-pb py-section">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.18em] text-gold uppercase">Les incontournables</p>
            <h2 id="signature-title" className="mt-4 font-display text-display-lg text-balance">
              Six plats qu’on ne retire jamais de la carte.
            </h2>
          </div>
          <Button to="/menu?tag=signature" variant="lightOutline" className="shrink-0">
            Toutes les signatures
            <IconArrowRight size={18} />
          </Button>
        </Reveal>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {homeSignatures.map((product, index) => (
            <Reveal as="li" key={product.id} delay={(index % 3) * 0.08}>
              <ProductCard product={product} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
