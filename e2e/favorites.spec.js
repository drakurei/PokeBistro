import { test, expect } from '@playwright/test'

test.describe('Favourites', () => {
  test('a favourite dish shows in the header count and on its own page, with an empty state', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/favoris')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rien de gardé pour l’instant.')
    await page.getByRole('link', { name: 'Voir la carte' }).click()

    await page.getByRole('button', { name: 'Ajouter Lucario Bento aux favoris' }).click()
    await expect(page.getByRole('link', { name: 'Vos favoris, 1 plat' })).toBeVisible()

    if (isMobile) {
      await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
      await page
        .getByRole('dialog', { name: 'Menu de navigation' })
        .getByRole('link', { name: 'Favoris (1)' })
        .click()
    } else {
      await page.getByRole('link', { name: 'Vos favoris, 1 plat' }).click()
    }
    await expect(page).toHaveURL(/\/favoris$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('1 plat à ne pas oublier.')
    await expect(page.getByRole('heading', { level: 3, name: 'Lucario Bento' })).toBeVisible()

    // Survives a reload, then removed from the page itself
    await page.reload()
    await expect(page.getByRole('heading', { level: 3, name: 'Lucario Bento' })).toBeVisible()
    await page.getByRole('button', { name: 'Retirer Lucario Bento des favoris' }).click()
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Rien de gardé pour l’instant.')
  })
})
