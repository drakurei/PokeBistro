import products, { productsBySlug } from '../data/products'
import { combos, combosById } from '../data/combos'
import { categories } from '../data/filters'
import { restaurant } from '../data/restaurant'
import { typesById } from '../data/types'
import { comboProducts, defaultChoices } from '../utils/cartItems'

// Single source of truth for everything a page says about itself: title, description, canonical URL,
// social card, robots directive and structured data. <Seo> renders it in the browser, the
// pre-render script writes the same tags into the static HTML.

export const SITE_ORIGIN = 'https://drakurei.github.io'
// "/" locally and on Vercel/Netlify, "/PokeBistro/" on GitHub Pages
export const SITE_BASE = import.meta.env.BASE_URL
export const SITE_URL = `${SITE_ORIGIN}${SITE_BASE.replace(/\/$/, '')}`
export const DEFAULT_IMAGE = `${SITE_BASE}og-image.png`

const DEFAULT_TITLE = `${restaurant.name} — Restaurant Pokémon à Évry`
const DEFAULT_DESCRIPTION =
  'PokéBistro, le bistro qui sert l’univers Pokémon dans l’assiette : bentos, burgers, bowls, desserts et boissons inspirés des Pokémon, à Évry. Réservez votre table.'

const price = (value) => value.toFixed(2)

// A route as its public URL. Sub-pages end with a slash: GitHub Pages serves them as directory
// indexes and redirects the slash-less form, so this is the address a crawler will finally see.
export function canonicalUrl(path) {
  if (path === '/') return `${SITE_URL}/`
  return `${SITE_URL}${path.replace(/\/$/, '')}/`
}

// An asset URL from Vite already carries the base ("/PokeBistro/assets/…"): only the origin is missing
export function absoluteUrl(url) {
  if (/^https?:/.test(url)) return url
  return `${SITE_ORIGIN}${url}`
}

const openingHours = restaurant.schedule.flatMap((line) =>
  line.services.map(([opens, closes]) => ({
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: line.days.map(
      (day) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day],
    ),
    opens,
    closes,
  })),
)

const restaurantLd = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: restaurant.name,
  description:
    'Bistro contemporain inspiré de l’univers Pokémon : bentos, burgers, bowls, desserts et boissons portant le nom d’un Pokémon.',
  url: canonicalUrl('/'),
  image: absoluteUrl(DEFAULT_IMAGE),
  telephone: '+33123456789',
  email: restaurant.email,
  servesCuisine: ['Japonaise', 'Fusion', 'Burgers'],
  priceRange: '€€',
  acceptsReservations: 'True',
  address: {
    '@type': 'PostalAddress',
    streetAddress: restaurant.address.street,
    postalCode: restaurant.address.postalCode,
    addressLocality: restaurant.address.city,
    addressCountry: 'FR',
  },
  openingHoursSpecification: openingHours,
  hasMenu: canonicalUrl('/menu'),
}

const menuItemLd = (product) => ({
  '@type': 'MenuItem',
  name: product.name,
  description: product.description,
  url: canonicalUrl(`/menu/${product.slug}`),
  image: absoluteUrl(product.image),
  offers: {
    '@type': 'Offer',
    price: price(product.price),
    priceCurrency: 'EUR',
    availability: 'https://schema.org/InStock',
  },
  suitableForDiet: [
    product.diet.includes('vegan') ? 'https://schema.org/VeganDiet' : null,
    product.diet.includes('vegetarien') ? 'https://schema.org/VegetarianDiet' : null,
    !product.allergens.includes('gluten') ? 'https://schema.org/GlutenFreeDiet' : null,
  ].filter(Boolean),
})

const menuLd = () => ({
  '@context': 'https://schema.org',
  '@type': 'Menu',
  name: `La carte de ${restaurant.name}`,
  url: canonicalUrl('/menu'),
  inLanguage: 'fr',
  hasMenuSection: [
    ...categories.map((category) => ({
      '@type': 'MenuSection',
      name: category.plural,
      description: category.description,
      hasMenuItem: products.filter((product) => product.category === category.id).map(menuItemLd),
    })),
    {
      '@type': 'MenuSection',
      name: 'Formules',
      hasMenuItem: combos.map((combo) => ({
        '@type': 'MenuItem',
        name: combo.name,
        description: combo.description,
        url: canonicalUrl(`/menu/formule/${combo.id}`),
        offers: { '@type': 'Offer', price: price(combo.price), priceCurrency: 'EUR' },
      })),
    },
  ],
})

const breadcrumbLd = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, path], index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    item: canonicalUrl(path),
  })),
})

const staticPages = {
  '/': { description: DEFAULT_DESCRIPTION, jsonLd: [restaurantLd] },
  '/menu': {
    title: 'La carte',
    description: `Les ${products.length} plats et ${combos.length} formules de PokéBistro : entrées, bentos, burgers, bowls, grandes assiettes, desserts et boissons inspirés des Pokémon. Filtrez par type, par envie, par régime ou par prix.`,
    jsonLd: [
      menuLd(),
      breadcrumbLd([
        ['Accueil', '/'],
        ['La carte', '/menu'],
      ]),
    ],
  },
  '/histoire': {
    title: 'Notre histoire',
    description:
      'Comment PokéBistro est né à Évry en 2019, ce qu’on y cuisine, et pourquoi les types Pokémon sont devenus notre carte.',
    jsonLd: [
      breadcrumbLd([
        ['Accueil', '/'],
        ['Notre histoire', '/histoire'],
      ]),
    ],
  },
  '/contact': {
    title: 'Contact',
    description: `PokéBistro, ${restaurant.address.street}, ${restaurant.address.city}. Horaires, téléphone, accès et formulaire de contact.`,
    jsonLd: [
      breadcrumbLd([
        ['Accueil', '/'],
        ['Contact', '/contact'],
      ]),
    ],
  },
  '/reservation': {
    title: 'Réserver une table',
    description: `Réservez une table chez PokéBistro à Évry : déjeuner ou dîner, intérieur ou terrasse, jusqu’à ${restaurant.maxGuests} personnes.`,
    jsonLd: [
      breadcrumbLd([
        ['Accueil', '/'],
        ['Réserver', '/reservation'],
      ]),
    ],
  },
  '/commande': {
    title: 'Commander',
    description:
      'Votre commande PokéBistro, sur place ou à emporter : un créneau, vos coordonnées, un récapitulatif.',
    robots: 'noindex',
  },
  '/favoris': {
    title: 'Vos favoris',
    description: 'Les plats que vous avez gardés de côté.',
    robots: 'noindex',
  },
  '/404': { title: 'Page introuvable', description: 'Cette page n’existe pas ou plus.', robots: 'noindex' },
}

// Every address that exists on the site (the pre-render and the sitemap iterate over it)
export const staticRoutes = Object.keys(staticPages).filter((path) => path !== '/404')
export const productRoutes = products.map((product) => `/menu/${product.slug}`)
export const comboRoutes = combos.map((combo) => `/menu/formule/${combo.id}`)
export const allRoutes = [...staticRoutes, ...productRoutes, ...comboRoutes]

// Sitemap entries: the address, how often it changes, how important it is. Pages that only make
// sense with local data (cart, favourites) are left out.
export function sitemapEntries() {
  const entry = (path, priority, changefreq = 'monthly') => ({
    loc: canonicalUrl(path),
    priority,
    changefreq,
  })
  return [
    entry('/', '1.0', 'weekly'),
    entry('/menu', '0.9', 'weekly'),
    entry('/histoire', '0.7'),
    entry('/contact', '0.6'),
    entry('/reservation', '0.8'),
    ...productRoutes.map((path) => entry(path, '0.6')),
    ...comboRoutes.map((path) => entry(path, '0.7')),
  ]
}

function pageFor(path) {
  const clean = path.replace(/\/$/, '') || '/'
  if (staticPages[clean]) return { path: clean, ...staticPages[clean] }

  const combo = clean.match(/^\/menu\/formule\/([a-z0-9-]+)$/)
  if (combo) {
    const item = combosById[combo[1]]
    if (!item) return { path: clean, ...staticPages['/404'], title: 'Formule introuvable' }
    const dishes = comboProducts(item, defaultChoices(item))
    return {
      path: clean,
      title: item.name,
      description: `${item.description} ${item.price.toFixed(2).replace('.', ',')} € chez PokéBistro.`,
      image: dishes[0]?.image,
      jsonLd: [
        {
          '@context': 'https://schema.org',
          '@type': 'MenuItem',
          name: item.name,
          description: item.description,
          url: canonicalUrl(clean),
          image: dishes[0] ? absoluteUrl(dishes[0].image) : undefined,
          offers: { '@type': 'Offer', price: price(item.price), priceCurrency: 'EUR' },
        },
        breadcrumbLd([
          ['Accueil', '/'],
          ['La carte', '/menu'],
          [item.name, clean],
        ]),
      ],
    }
  }

  const product = clean.match(/^\/menu\/([a-z0-9-]+)$/)
  if (product) {
    const item = productsBySlug[product[1]]
    if (!item) return { path: clean, ...staticPages['/404'], title: 'Plat introuvable' }
    const type = typesById[item.type]
    return {
      path: clean,
      title: item.name,
      description: `${item.description} ${type ? `Type ${type.label}.` : ''} ${item.price.toFixed(2).replace('.', ',')} € chez PokéBistro.`,
      image: item.image,
      type: 'product',
      jsonLd: [
        { '@context': 'https://schema.org', ...menuItemLd(item) },
        breadcrumbLd([
          ['Accueil', '/'],
          ['La carte', '/menu'],
          [item.name, clean],
        ]),
      ],
    }
  }

  return { path: clean, ...staticPages['/404'] }
}

export function getPageMeta(path) {
  const page = pageFor(path)
  const fullTitle = page.title ? `${page.title} — ${restaurant.name}` : DEFAULT_TITLE
  return {
    path: page.path,
    title: fullTitle,
    description: page.description ?? DEFAULT_DESCRIPTION,
    canonical: canonicalUrl(page.path),
    image: absoluteUrl(page.image ?? DEFAULT_IMAGE),
    type: page.type ?? 'website',
    robots: page.robots ?? null,
    jsonLd: page.jsonLd ?? [],
  }
}

// The <head> tags of a page, as [tag, attributes, text] tuples. Rendered by <Seo> and serialised
// by the pre-render script, so the static HTML and the hydrated tree always agree.
export function headTags(meta) {
  const tags = [
    ['title', {}, meta.title],
    ['meta', { name: 'description', content: meta.description }],
    ['link', { rel: 'canonical', href: meta.canonical }],
    ['meta', { property: 'og:type', content: meta.type }],
    ['meta', { property: 'og:site_name', content: restaurant.name }],
    ['meta', { property: 'og:locale', content: 'fr_FR' }],
    ['meta', { property: 'og:title', content: meta.title }],
    ['meta', { property: 'og:description', content: meta.description }],
    ['meta', { property: 'og:url', content: meta.canonical }],
    ['meta', { property: 'og:image', content: meta.image }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: meta.title }],
    ['meta', { name: 'twitter:description', content: meta.description }],
    ['meta', { name: 'twitter:image', content: meta.image }],
  ]
  if (meta.robots) tags.push(['meta', { name: 'robots', content: meta.robots }])
  return tags
}
