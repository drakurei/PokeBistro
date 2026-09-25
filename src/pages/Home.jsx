import { useContext, useState } from 'react'
import FilterContext from '../contexts/FilterContext'
import Hero from '../components/Hero/Hero'
import Sidebar from '../components/Sidebar/Sidebar'
import ProductGrid from '../components/ProductGrid/ProductGrid'
import About from '../components/About/About'
import Contact from '../components/Contact/Contact'
import Button from '../components/Button/Button'
import IconFilter from '../components/Icons/IconFilter'

// The single page of the site: hero, menu (filters + products), about, contact
function Home() {
  // On mobile the sidebar is hidden behind a "Filtres" button
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const { activeFiltersCount } = useContext(FilterContext)

  const sidebarClasses = isFiltersOpen ? 'col-lg-4 col-xl-3 d-block' : 'col-lg-4 col-xl-3 d-none d-lg-block'

  return (
    <>
      <Hero />

      <section id="menu" className="container-xl py-20">
        <div className="mb-10 text-center lg:text-left">
          <p className="mb-3 text-xs font-bold tracking-widest text-poke-blue uppercase">Notre carte</p>
          <h2 className="mb-4 font-display text-4xl leading-tight font-bold text-poke-navy md:text-5xl">
            Le menu du PokéBistro
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-slate-600 lg:mx-0">
            Filtrez par catégorie, par tag ou par prix, ou cherchez directement votre Pokémon préféré.
          </p>
        </div>

        <Button
          variant="outline-primary"
          className="d-lg-none w-100 d-flex align-items-center justify-content-center gap-2 mb-4"
          aria-expanded={isFiltersOpen}
          aria-controls="categories"
          onClick={() => setIsFiltersOpen(!isFiltersOpen)}
        >
          <IconFilter />
          {isFiltersOpen ? 'Masquer les filtres' : 'Afficher les filtres'}
          {activeFiltersCount > 0 && <span className="badge bg-danger rounded-pill">{activeFiltersCount}</span>}
        </Button>

        <div className="row g-5">
          <div className={sidebarClasses}>
            <Sidebar />
          </div>
          <div className="col-lg-8 col-xl-9">
            <ProductGrid />
          </div>
        </div>
      </section>

      <About />
      <Contact />
    </>
  )
}

export default Home
