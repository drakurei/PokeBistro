import { Link, useParams } from 'react-router'
import Seo from '../components/layout/Seo'
import ComboDetail from '../components/menu/ComboDetail'
import ComboCard from '../components/menu/ComboCard'
import Button from '../components/ui/Button'
import { IconChevronLeft } from '../components/ui/Icons'
import { combos, getCombo } from '../data/combos'
import { PokeballMark } from '../components/layout/Logo'

// Direct visit to /menu/formule/:slug: the formule as a full page, with the other formules below
export default function ComboPage() {
  const { slug } = useParams()
  const combo = getCombo(slug)

  if (!combo) {
    return (
      <section className="container-pb flex min-h-[70vh] flex-col items-center justify-center pt-(--spacing-header) text-center">
        <Seo title="Formule introuvable" path={`/menu/formule/${slug}`} />
        <PokeballMark size={64} className="text-ink-mute" />
        <h1 className="mt-6 font-display text-display-md">Cette formule n’existe pas.</h1>
        <Button to="/menu?category=formules" className="mt-8">
          Voir les formules
        </Button>
      </section>
    )
  }

  const others = combos.filter((item) => item.id !== combo.id)

  return (
    <>
      <Seo
        title={combo.name}
        path={`/menu/formule/${combo.id}`}
        description={`${combo.description} ${combo.price.toFixed(2).replace('.', ',')} € chez PokéBistro.`}
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
            <ComboDetail combo={combo} titleId="combo-page-title" />
          </div>
        </div>
      </section>
      <section aria-labelledby="other-combos" className="container-pb pb-section">
        <h2 id="other-combos" className="font-display text-display-sm">
          Les autres formules
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((item) => (
            <li key={item.id}>
              <ComboCard combo={item} />
            </li>
          ))}
        </ul>
      </section>
    </>
  )
}
