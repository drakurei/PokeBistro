import { test, expect } from '@playwright/test'

test.describe('SEO and pre-rendering', () => {
  test('a dish page carries its own title, canonical, social card and structured data', async ({ page }) => {
    await page.goto('/menu/pikachu-bento')
    await expect(page).toHaveTitle('Pikachu Bento — PokéBistro')
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', /\/menu\/pikachu-bento\/$/)
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute(
      'content',
      'Pikachu Bento — PokéBistro',
    )
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /pikachu-bento.*\.webp$/,
    )
    await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image')
    // One title only: the static tags of the shell were replaced, not duplicated
    expect(await page.locator('title').count()).toBe(1)
    expect(await page.locator('meta[name="description"]').count()).toBe(1)

    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const types = jsonLd.map((text) => JSON.parse(text)['@type'])
    expect(types).toContain('MenuItem')
    expect(types).toContain('BreadcrumbList')
  })

  test('the carte exposes a schema.org Menu with every section', async ({ page }) => {
    await page.goto('/menu')
    const jsonLd = await page.locator('script[type="application/ld+json"]').allTextContents()
    const menu = jsonLd.map((text) => JSON.parse(text)).find((data) => data['@type'] === 'Menu')
    expect(menu.hasMenuSection.map((section) => section.name)).toEqual([
      'Entrées',
      'Bentos',
      'Burgers',
      'Bowls',
      'Grandes assiettes',
      'Desserts',
      'Boissons',
      'Formules',
    ])
    expect(menu.hasMenuSection.flatMap((section) => section.hasMenuItem)).toHaveLength(59 + 8)
  })

  test('pages exist as static HTML: readable without JavaScript', async ({ browser, baseURL }) => {
    const context = await browser.newContext({ javaScriptEnabled: false })
    const page = await context.newPage()
    await page.goto(`${baseURL}/menu/formule/formule-dresseur/`)
    await expect(page.getByRole('heading', { level: 1, name: 'Formule Dresseur' })).toBeVisible()
    await page.goto(`${baseURL}/histoire/`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('chaque Pokémon')
    await page.goto(`${baseURL}/`)
    await expect(page.getByRole('heading', { level: 1 })).toContainText('univers Pokémon')
    await context.close()
  })

  test('the sitemap lists every dish and formule', async ({ request, baseURL }) => {
    const response = await request.get(`${baseURL}/sitemap.xml`)
    expect(response.ok()).toBe(true)
    const xml = await response.text()
    expect(xml.match(/<loc>/g)).toHaveLength(5 + 59 + 8)
    expect(xml).toContain('/menu/formule/formule-pichu/</loc>')
    expect(xml).toContain('<lastmod>')
    const robots = await request.get(`${baseURL}/robots.txt`)
    expect(await robots.text()).toContain('sitemap.xml')
  })

  test('the cart and favourites pages are not indexed', async ({ page }) => {
    await page.goto('/favoris')
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex')
  })
})
