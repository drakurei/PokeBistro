import { Component } from 'react'

// Last line of defence: if a page crashes, the rest of the site (header, footer, cart) stays usable
// and the visitor gets a way out instead of a blank screen.
export default class ErrorBoundary extends Component {
  state = { error: null }

  static getDerivedStateFromError(error) {
    return { error }
  }

  componentDidCatch(error) {
    if (import.meta.env.DEV) console.error(error)
  }

  render() {
    if (!this.state.error) return this.props.children
    return (
      <section
        className="container-pb flex min-h-[60vh] flex-col items-center justify-center pt-(--spacing-header) text-center"
        role="alert"
      >
        <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Un imprévu</p>
        <h1 className="mt-4 font-display text-display-md text-balance">Cette page a raté son attaque.</h1>
        <p className="mt-4 max-w-md text-ink-soft">
          Une erreur est survenue à l’affichage. Rechargez la page ; si ça continue, la carte reste accessible
          depuis l’accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-12 items-center rounded-full bg-lacquer px-6 font-bold text-porcelain hover:bg-lacquer-deep"
          >
            Recharger la page
          </button>
          <a
            href={import.meta.env.BASE_URL}
            className="inline-flex h-12 items-center rounded-full border-2 border-ink px-6 font-bold text-ink no-underline"
          >
            Retour à l’accueil
          </a>
        </div>
      </section>
    )
  }
}
