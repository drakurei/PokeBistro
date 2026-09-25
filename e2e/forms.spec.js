import { test, expect } from '@playwright/test'

test.describe('Forms', () => {
  test('contact form validates, then shows loading and success', async ({ page }) => {
    await page.goto('/contact')
    await page.getByRole('button', { name: 'Envoyer le message' }).click()
    // Every error is shown and the first invalid field gets the focus
    await expect(page.getByRole('alert')).toHaveCount(3)
    await expect(page.getByLabel('Nom')).toBeFocused()

    await page.getByLabel('Nom').fill('Sacha')
    await page.getByLabel('Email').fill('sacha@bourg')
    await page.getByLabel('Email').blur()
    await expect(page.getByText(/ne semble pas valide/)).toBeVisible()
    await page.getByLabel('Email').fill('sacha@bourg-palette.fr')
    await page.getByLabel('Message').fill('Une table pour dix dresseurs samedi soir ?')

    await page.getByRole('button', { name: 'Envoyer le message' }).click()
    await expect(page.getByRole('button', { name: 'Envoi…' })).toBeDisabled()
    await expect(page.getByText('Message envoyé.')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText('sacha@bourg-palette.fr')).toBeVisible()
  })

  test('a failed request shows an error with a way out (demo hook: erreur@…)', async ({ page }) => {
    await page.goto('/contact')
    await page.getByLabel('Nom').fill('Sacha')
    await page.getByLabel('Email').fill('erreur@bourg-palette.fr')
    await page.getByLabel('Message').fill('Ce message ne partira pas, exprès.')
    await page.getByRole('button', { name: 'Envoyer le message' }).click()
    await expect(page.getByRole('alert')).toContainText(/n’est pas parti/, { timeout: 5000 })
    await expect(page.getByRole('button', { name: 'Envoyer le message' })).toBeEnabled()
  })

  test('reservation form rejects past dates and confirms a valid request', async ({ page }) => {
    await page.goto('/reservation')
    await page.getByLabel('Date').fill('2020-01-01')
    await page.getByLabel('Date').blur()
    await expect(page.getByText('La date est déjà passée.')).toBeVisible()

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await page.getByLabel('Date').fill(tomorrow.toISOString().slice(0, 10))
    // A full slot cannot be chosen; the first free dinner slot can
    const slotSelect = page.getByLabel('Horaire')
    expect(await slotSelect.locator('option[disabled]').count()).toBeGreaterThan(0)
    const free = await slotSelect
      .locator('optgroup[label="Dîner"] option:not([disabled])')
      .first()
      .getAttribute('value')
    await slotSelect.selectOption(free)
    await page.getByLabel('Convives').selectOption('4')
    await page.getByLabel('Nom').fill('Ondine')
    await page.getByLabel('Téléphone').fill('0123456789')
    await page.getByLabel('Email').fill('ondine@azuria.fr')

    await page.getByRole('button', { name: 'Vérifier ma demande' }).click()
    await expect(page.getByText(/4 personnes · Intérieur/)).toBeVisible()
    await page.getByRole('button', { name: 'Confirmer la demande' }).click()
    await expect(page.getByText('Demande reçue.')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/Table pour 4/)).toBeVisible()
    await expect(page.getByText(new RegExp(free.replace(':', 'h')))).toBeVisible()
    await expect(page.getByText(/Annulation gratuite/)).toBeVisible()
  })

  test('a closed day is refused', async ({ page }) => {
    await page.goto('/reservation')
    const year = new Date().getFullYear()
    const month = new Date().getMonth()
    // 25 December of this year or next, whichever is still ahead (and within three months when possible)
    const christmas = month >= 9 ? `${year}-12-25` : `${year}-12-25`
    await page.getByLabel('Date').fill(christmas)
    await page.getByLabel('Date').blur()
    await expect(page.getByText(/fermé ce jour-là|trois mois/)).toBeVisible()
  })
})
