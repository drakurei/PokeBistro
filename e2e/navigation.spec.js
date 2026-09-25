import { test, expect } from '@playwright/test'

test.describe('Loading and navigation', () => {
  test('home renders the hero and the loader never blocks the page', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Poké')
    // With reduced motion the loader is skipped; otherwise it must be gone within 3 seconds
    await expect(page.getByRole('status', { name: 'Chargement de PokéBistro' })).toHaveCount(0, {
      timeout: 3000,
    })
    await expect(page).toHaveTitle(/PokéBistro/)
  })

  test('main navigation reaches every page and moves the focus to the content', async ({
    page,
    isMobile,
  }) => {
    await page.goto('/')
    const open = async (label) => {
      if (isMobile) {
        await page.getByRole('button', { name: 'Ouvrir le menu' }).click()
        await page
          .getByRole('dialog', { name: 'Menu de navigation' })
          .getByRole('link', { name: label })
          .click()
      } else {
        await page
          .getByRole('navigation', { name: 'Navigation principale' })
          .getByRole('link', { name: label })
          .click()
      }
    }

    await open('La carte')
    await expect(page).toHaveURL(/\/menu$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('La carte')
    await expect(page.locator('#main')).toBeFocused()

    await open('Histoire')
    await expect(page).toHaveURL(/\/histoire$/)

    await open('Contact')
    await expect(page).toHaveURL(/\/contact$/)
  })

  test('the types on the home page open the menu already filtered', async ({ page, isMobile }) => {
    await page.goto('/')
    await page.getByRole('link', { name: /^Type Feu/ }).click()
    await expect(page).toHaveURL(/\/menu\?type=feu$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les plats Feu')
    if (isMobile) await page.getByRole('button', { name: /^Filtres/ }).click()
    await expect(page.getByRole('button', { name: 'Feu', pressed: true }).first()).toBeVisible()
  })

  test('unknown routes show the 404 page', async ({ page }) => {
    await page.goto('/nulle-part')
    await expect(page.getByRole('heading', { level: 1 })).toContainText('enfuie')
    await page.getByRole('link', { name: 'Voir la carte' }).click()
    await expect(page).toHaveURL(/\/menu$/)
  })

  test('skip link is the first focusable element', async ({ page }) => {
    await page.goto('/')
    await page.keyboard.press('Tab')
    await expect(page.getByRole('link', { name: 'Aller au contenu' })).toBeFocused()
  })
})
