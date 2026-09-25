// Shown in place of a page whose code could not be downloaded (connection lost, new version deployed)
export default function LazyFailed() {
  return (
    <section
      className="container-pb flex min-h-[60vh] flex-col items-center justify-center pt-(--spacing-header) text-center"
      role="alert"
    >
      <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Connexion</p>
      <h1 className="mt-4 font-display text-display-md text-balance">Cette page n’a pas pu être chargée.</h1>
      <p className="mt-4 max-w-md text-ink-soft">
        Vérifiez votre connexion, puis rechargez. Le site a peut-être aussi été mis à jour entre-temps.
      </p>
      <button
        type="button"
        onClick={() => window.location.reload()}
        className="mt-8 inline-flex h-12 items-center rounded-full bg-lacquer px-6 font-bold text-porcelain hover:bg-lacquer-deep"
      >
        Recharger la page
      </button>
    </section>
  )
}
