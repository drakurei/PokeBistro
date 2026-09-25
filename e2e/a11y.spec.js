import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

// Automated accessibility audit (axe-core, WCAG 2.1 A/AA) on the main screens. It catches what a
// machine can catch: contrast, names, roles, landmarks, form labels. Keyboard flows are in the
// other specs.
const pages = [
  '/',
  '/menu',
  '/menu/pikachu-bento',
  '/menu/formule/formule-dresseur',
  '/histoire',
  '/contact',
  '/reservation',
  '/favoris',
  '/commande',
]

test.describe('Accessibility (axe)', () => {
  for (const path of pages) {
    test(`no WCAG A/AA violation on ${path}`, async ({ page }) => {
      await page.goto(path)
      await page.waitForLoadState('networkidle')
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze()
      const summary = results.violations.map(
        (violation) =>
          `${violation.id}: ${violation.help} (${violation.nodes.length})\n  ${violation.nodes.map((node) => node.target.join(' ')).join('\n  ')}`,
      )
      expect(summary, summary.join('\n')).toEqual([])
    })
  }

  test('the cart drawer and the filter sheet are accessible once open', async ({ page, isMobile }) => {
    await page.goto('/menu')
    await page.getByRole('button', { name: 'Ajouter Pikachu Bento au panier' }).click()
    await page
      .getByRole('button', { name: /Ouvrir le panier/ })
      .first()
      .click()
    await expect(page.getByRole('dialog', { name: /^Panier/ })).toBeVisible()
    let results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
    expect(results.violations.map((v) => v.id)).toEqual([])
    await page.keyboard.press('Escape')
    if (isMobile) {
      await page.getByRole('button', { name: /^Filtres/ }).click()
      await expect(page.getByRole('dialog', { name: 'Filtres' })).toBeVisible()
      results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze()
      expect(results.violations.map((v) => v.id)).toEqual([])
    }
  })
})
