import { test, expect } from '@playwright/test'

const cartButton = (page) => page.getByRole('button', { name: /Ouvrir le panier/ }).first()
const drawer = (page) => page.getByRole('dialog', { name: /^Panier/ })

test.describe('The carte as a restaurant menu', () => {
  test('every dish image loads (44 dishes, 44 files)', async ({ page }) => {
    await page.goto('/menu')
    // Force every lazy image to load, then wait (with a cap) for each one to settle
    const report = await page.evaluate(async () => {
      const images = [...document.querySelectorAll('article img[src*="/assets/"]')]
      images.forEach((img) => {
        img.loading = 'eager'
      })
      const settle = (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener('load', resolve, { once: true })
              img.addEventListener('error', resolve, { once: true })
              setTimeout(resolve, 15000)
            })
      await Promise.all(images.map(settle))
      const broken = images.filter((img) => img.naturalWidth === 0).map((img) => img.src)
      return { total: images.length, broken }
    })
    expect(report.broken).toEqual([])
    expect(report.total).toBeGreaterThanOrEqual(44)
  })

  test('the carte is grouped like a menu, in the order of a meal, formules last', async ({ page }) => {
    await page.goto('/menu')
    const headings = await page.locator('h2[id^="group-"]').allTextContents()
    expect(headings.map((h) => h.split('\n')[0].replace(/\d+$/, '').trim())).toEqual([
      'Entrées',
      'Bentos',
      'Burgers',
      'Bowls',
      'Grandes assiettes',
      'Desserts',
      'Boissons',
      'Formules',
    ])
    // The table of contents jumps to a section
    await page
      .getByRole('navigation', { name: 'Sections de la carte' })
      .getByRole('link', { name: 'Desserts' })
      .click()
    await expect(page).toHaveURL(/#dessert$/)
    await expect(page.getByRole('heading', { level: 3, name: 'Roucool Crispy' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: 'Lucario Bento' })).toBeVisible()
    await expect(page.getByRole('heading', { level: 3, name: 'Mew Berry Bowl', exact: true })).toBeVisible()
  })

  test('a fixed formule goes to the cart at its set price', async ({ page }) => {
    await page.goto('/menu?category=formules')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les formules')
    await page.getByRole('button', { name: 'Ajouter Formule Pikachu au panier' }).click()
    await cartButton(page).click()
    await expect(drawer(page).getByText('Formule Pikachu')).toBeVisible()
    await expect(
      drawer(page).getByText('Pikachu Bento · Pikachu Spark Soda · Rondoudou Dessert'),
    ).toBeVisible()
    await expect(drawer(page).getByText(/21,90/).first()).toBeVisible()
    await page.reload()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 1 article')
  })

  test('the configurable formule is composed, then added', async ({ page }) => {
    await page.goto('/menu?category=formules')
    await page
      .getByRole('article')
      .filter({ hasText: 'Formule Dresseur' })
      .getByRole('link', { name: 'Composer' })
      .click()
    const dialog = page.getByRole('dialog', { name: 'Formule Dresseur' })
    await expect(dialog).toBeVisible()
    await dialog.getByRole('radio', { name: /Lucario Power Burger/ }).check({ force: true })
    await dialog.getByRole('radio', { name: /Pikachu Spark Soda/ }).check({ force: true })
    await expect(dialog.getByRole('listitem').filter({ hasText: 'Lucario Power Burger' })).toBeVisible()
    await dialog.getByRole('button', { name: /Ajouter · 26,90 €/ }).click()
    await page.keyboard.press('Escape')
    await cartButton(page).click()
    await expect(drawer(page).getByText(/Lucario Power Burger · Pikachu Spark Soda/)).toBeVisible()
    await expect(drawer(page).getByText(/26,90/).first()).toBeVisible()
  })

  test('new dishes open, add and favourite like the others', async ({ page }) => {
    await page.goto('/menu/roucool-crispy')
    await expect(page).toHaveTitle(/Roucool Crispy/)
    await expect(page.getByText('chips de pain plume')).toBeVisible()
    await page.getByRole('button', { name: /Ajouter · 8,90 €/ }).click()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 1 article')
    await page.getByRole('button', { name: 'Ajouter aux favoris' }).click()
    await expect(page.getByRole('button', { name: 'Retirer des favoris' })).toBeVisible()
    await page.goto('/menu/pikachu-spark-soda')
    await expect(page.getByRole('heading', { level: 1, name: 'Pikachu Spark Soda' })).toBeVisible()
  })

  test('home reviews are labelled as demonstration content', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('note')).toContainText('Avis de démonstration')
    await expect(page.getByRole('heading', { name: /dresseurs en disent/ })).toBeVisible()
  })

  test('reservation accepts a special request and offers a calendar file', async ({ page }) => {
    await page.goto('/reservation')
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await page.getByLabel('Date').fill(tomorrow.toISOString().slice(0, 10))
    // Some slots are (pretend) full: take the first free dinner slot
    const free = await page
      .getByLabel('Horaire')
      .locator('optgroup[label="Dîner"] option:not([disabled])')
      .first()
      .getAttribute('value')
    await page.getByLabel('Horaire').selectOption(free)
    await page.getByRole('radio', { name: /Terrasse/ }).check({ force: true })
    await page.getByLabel('Nom').fill('Sacha')
    await page.getByLabel('Téléphone').fill('06 12 34 56 78')
    await page.getByLabel('Email').fill('sacha@bourg-palette.fr')
    await page.getByLabel('Demande spéciale').fill('Un anniversaire, une bougie sur le Velvet Cake.')
    await page.getByRole('button', { name: 'Vérifier ma demande' }).click()
    await expect(page.getByRole('heading', { name: 'Vérifiez votre demande' })).toBeVisible()
    await expect(page.getByText('Terrasse', { exact: false }).first()).toBeVisible()
    await page.getByRole('button', { name: 'Confirmer la demande' }).click()
    await expect(page.getByText('Demande reçue.')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/Votre demande a bien été notée/)).toBeVisible()
    await expect(page.getByRole('link', { name: /Ajouter à mon agenda/ })).toHaveAttribute(
      'href',
      /^data:text\/calendar/,
    )
  })
})
