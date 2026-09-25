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

  test('reservation form rejects past dates and confirms a valid request', async ({ page }) => {
    await page.goto('/reservation')
    await page.getByLabel('Date').fill('2020-01-01')
    await page.getByLabel('Date').blur()
    await expect(page.getByText('La date est déjà passée.')).toBeVisible()

    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    await page.getByLabel('Date').fill(tomorrow.toISOString().slice(0, 10))
    await page.getByLabel('Horaire').selectOption('20:00')
    await page.getByLabel('Convives').selectOption('4')
    await page.getByLabel('Nom').fill('Ondine')
    await page.getByLabel('Email').fill('ondine@azuria.fr')

    await page.getByRole('button', { name: 'Demander une table' }).click()
    await expect(page.getByText('Demande reçue.')).toBeVisible({ timeout: 5000 })
    await expect(page.getByText(/Table pour 4/)).toBeVisible()
    await expect(page.getByText(/20h00/)).toBeVisible()
  })
})
