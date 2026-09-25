import { test, expect } from '@playwright/test'

const count = (page) =>
  page
    .getByRole('status')
    .filter({ hasText: /plats?/ })
    .first()

test.describe('Menu: search, filters, detail', () => {
  test('search narrows the grid, is accent-insensitive and can be cleared', async ({ page }) => {
    await page.goto('/menu')
    await expect(count(page)).toHaveText('28 plats')

    const search = page.getByRole('searchbox', { name: /Rechercher/ })
    await search.fill('epice')
    await expect(page).toHaveURL(/q=epice/)
    await expect(count(page)).not.toHaveText('28 plats')
    await expect(page.getByRole('heading', { level: 3, name: 'Goupix Fire Box' })).toBeVisible()

    await search.fill('zzzz')
    await expect(page.getByText('Aucun plat ne correspond.')).toBeVisible()
    await page.getByRole('button', { name: 'Tout effacer' }).first().click()
    await expect(count(page)).toHaveText('28 plats')
    await expect(page).not.toHaveURL(/q=/)
  })

  test('filters combine and live in the URL', async ({ page, isMobile }) => {
    await page.goto('/menu')
    if (isMobile) await page.getByRole('button', { name: /^Filtres/ }).click()

    const scope = isMobile
      ? page.getByRole('dialog', { name: 'Filtres' })
      : page.getByRole('complementary', { name: 'Filtres' })
    await scope.getByRole('button', { name: /^Bento/ }).click()
    await scope.getByRole('button', { name: 'Feu' }).click()
    await scope.getByText('10 € à 15 €').click()
    if (isMobile) await page.getByRole('button', { name: /^Voir \d+ plat/ }).click()

    await expect(page).toHaveURL(/category=bento/)
    await expect(page).toHaveURL(/type=feu/)
    await expect(page).toHaveURL(/price=10-15/)
    await expect(count(page)).toHaveText('2 plats sur 28')

    // The URL is the state: a reload restores the same selection
    await page.reload()
    await expect(count(page)).toHaveText('2 plats sur 28')
  })

  test('a dish opens in a dialog over the menu and has its own page', async ({ page }) => {
    await page.goto('/menu')
    await page.getByRole('heading', { level: 3, name: 'Pikachu Bento' }).getByRole('link').click()
    const dialog = page.getByRole('dialog', { name: 'Pikachu Bento' })
    await expect(dialog).toBeVisible()
    await expect(page).toHaveURL(/\/menu\/pikachu-bento$/)
    await expect(dialog.getByText('tamagoyaki')).toBeVisible()

    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/\/menu$/)

    // Direct visit: full page with related dishes
    await page.goto('/menu/pikachu-bento')
    await expect(page.getByRole('heading', { level: 2, name: 'Pikachu Bento' })).toBeVisible()
    await expect(page).toHaveTitle(/Pikachu Bento/)
    await expect(page.getByRole('heading', { name: /Aussi de type/ })).toBeVisible()

    await page.goto('/menu/plat-inconnu')
    await expect(page.getByText('Ce plat n’est pas à la carte.')).toBeVisible()
  })

  test('favorites toggle and survive a reload', async ({ page }) => {
    await page.goto('/menu')
    const heart = page.getByRole('button', { name: 'Ajouter Pikachu Bento aux favoris' })
    await heart.click()
    await expect(page.getByRole('button', { name: 'Retirer Pikachu Bento des favoris' })).toHaveAttribute(
      'aria-pressed',
      'true',
    )
    await page.reload()
    await expect(page.getByRole('button', { name: 'Retirer Pikachu Bento des favoris' })).toBeVisible()
  })
})
