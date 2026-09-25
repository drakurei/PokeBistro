import Button from '../components/ui/Button'
import { PokeballMark } from '../components/layout/Logo'

export default function NotFoundPage() {
  return (
    <section className="container-pb flex min-h-[80vh] flex-col items-center justify-center pt-(--spacing-header) text-center">
      <PokeballMark size={72} className="text-ink-mute" />
      <p className="mt-8 font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Erreur 404</p>
      <h1 className="mt-4 font-display text-display-lg text-balance">Cette page s’est enfuie.</h1>
      <p className="mt-4 max-w-md text-lg text-ink-soft">
        Un Pokémon sauvage l’a peut-être emportée. La carte, elle, est toujours là.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button to="/">Retour à l’accueil</Button>
        <Button to="/menu" variant="outline">
          Voir la carte
        </Button>
      </div>
    </section>
  )
}
