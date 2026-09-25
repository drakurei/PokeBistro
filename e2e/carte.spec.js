import { test, expect } from '@playwright/test'

const cartButton = (page) => page.getByRole('button', { name: /Ouvrir le panier/ })
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

  test('the carte is grouped like a menu, with the formules first', async ({ page }) => {
    await page.goto('/menu')
    const headings = await page.locator('h2[id^="group-"]').allInnerTexts()
    expect(headings[0]).toMatch(/^Formules/)
    expect(headings.map((h) => h.split('\n')[0].replace(/\d+$/, '').trim())).toEqual([
      'Formules',
      'Entrées',
      'Bentos',
      'Burgers',
      'Bowls',
      'Desserts',
      'Boissons',
      'Menus',
    ])
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
    await page.getByRole('link', { name: 'Composer' }).click()
    const dialog = page.getByRole('dialog', { name: 'Formule Dresseur' })
    await expect(dialog).toBeVisible()
    await dialog.getByLabel('Plat').selectOption({ label: 'Lucario Power Burger' })
    await dialog.getByLabel('Boisson').selectOption({ label: 'Pikachu Spark Soda' })
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
    await expect(page.getByRole('heading', { level: 2, name: 'Pikachu Spark Soda' })).toBeVisible()
  })

  test('home reviews are labelled as demonstration content', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('note')).toContainText('Avis de démonstration')
    await expect(page.getByRole('heading', { name: /dresseurs en disent/ })).toBeVisible()
  })

  test('reservation accepts a special request', async ({ page }) => {
    await page.goto('/reservation')
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await page.getByLabel('Date').fill(tomorrow.toISOString().slice(0, 10))
    await page.getByLabel('Horaire').selectOption('19:30')
    await page.getByLabel('Nom').fill('Sacha')
    await page.getByLabel('Email').fill('sacha@bourg-palette.fr')
    await page.getByLabel('Demande spéciale').fill('Un anniversaire, une bougie sur le Velvet Cake.')
    await page.getByRole('button', { name: 'Demander une table' }).click()
    await expect(page.getByText('Demande reçue.')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/Votre demande a bien été notée/)).toBeVisible()
  })
})
