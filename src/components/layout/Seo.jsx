import { restaurant } from '../../data/restaurant'

const SITE_URL = 'https://drakurei.github.io/PokeBistro'
const DEFAULT_DESCRIPTION =
  'PokéBistro, le bistro qui sert l’univers Pokémon dans l’assiette : bentos, burgers, bowls, desserts et boissons inspirés des Pokémon, à Évry. Réservez votre table.'

// Per-page metadata. React 19 hoists <title>, <meta> and <link> rendered anywhere into <head>.
export default function Seo({
  title,
  description = DEFAULT_DESCRIPTION,
  path = '/',
  image = '/og-image.png',
  type = 'website',
}) {
  const fullTitle = title ? `${title} — ${restaurant.name}` : `${restaurant.name} — Restaurant Pokémon à Évry`
  const url = `${SITE_URL}${path}`
  const imageUrl = image.startsWith('http') ? image : `${SITE_URL}${image}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={restaurant.name} />
      <meta property="og:locale" content="fr_FR" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={imageUrl} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </>
  )
}

// JSON-LD helper: renders structured data for a page (Restaurant, MenuItem…)
export function JsonLd({ data }) {
  return <script type="application/ld+json">{JSON.stringify(data)}</script>
}

export { SITE_URL }
