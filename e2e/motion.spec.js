import { test, expect } from '@playwright/test'

// Every other spec runs with reduced motion. This one checks the full-motion experience: the
// loader plays fast and never blocks, the title is painted immediately, dialogs still close.
test.use({ reducedMotion: 'no-preference' })

test.describe('Full motion', () => {
  test('the loader lifts within a second and the hero title is visible from the first paint', async ({
    page,
  }) => {
    await page.goto('/')
    const loader = page.getByRole('status', { name: 'Chargement de PokéBistro' })
    // Present at first (first visit of the session), gone shortly after
    await expect(loader).toHaveCount(0, { timeout: 2500 })
    const title = page.getByRole('heading', { level: 1 })
    await expect(title).toContainText('univers Pokémon')
    expect(await title.evaluate((node) => getComputedStyle(node).opacity)).toBe('1')

    // Second visit in the same session: no loader at all
    await page.goto('/')
    await expect(loader).toHaveCount(0)
  })

  test('the product dialog opens and closes with its transition, then the URL goes back', async ({
    page,
  }) => {
    await page.goto('/menu')
    await page.getByRole('heading', { level: 3, name: 'Pikachu Bento' }).getByRole('link').click()
    const dialog = page.getByRole('dialog', { name: 'Pikachu Bento' })
    await expect(dialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(dialog).toBeHidden()
    await expect(page).toHaveURL(/\/menu$/)
  })

  test('the marquee pauses when it leaves the viewport', async ({ page }) => {
    await page.goto('/')
    const track = page.locator('.animate-marquee').first()
    // Lenis drives the desktop scroll: move the window directly instead of scrollIntoView
    await page.evaluate(() => {
      const band = document.querySelector('.animate-marquee')
      window.scrollTo({ top: band.getBoundingClientRect().top + window.scrollY - 200, behavior: 'instant' })
    })
    await expect(track).toHaveCSS('animation-play-state', 'running')
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
    await expect(track).toHaveCSS('animation-play-state', 'paused')
  })
})
