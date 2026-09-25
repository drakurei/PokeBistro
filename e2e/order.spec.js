import { test, expect } from '@playwright/test'

const cartButton = (page) => page.getByRole('button', { name: /Ouvrir le panier/ }).first()

// Picks the first day that still has a free slot (late in the evening, "today" may have none)
async function pickDayAndSlot(page) {
  const days = page.getByRole('radio', { name: /Aujourd’hui|Demain|\d/ })
  const count = await days.count()
  for (let index = 0; index < count; index += 1) {
    await days.nth(index).check({ force: true })
    const slot = page.getByRole('radio', { name: /^\d{2}h\d{2}$/ }).first()
    if (await slot.count()) {
      await slot.check({ force: true })
      return
    }
  }
  throw new Error('No slot available on any proposed day')
}

test.describe('Simulated order', () => {
  test('goes through mode, slot, contact, summary and confirmation, with back navigation', async ({
    page,
  }) => {
    await page.goto('/menu')
    await page.getByRole('button', { name: 'Ajouter Pikachu Bento au panier' }).click()
    await page.getByRole('button', { name: 'Ajouter Rondoudou Dessert au panier' }).click()
    await cartButton(page).click()
    await page
      .getByRole('dialog', { name: /^Panier/ })
      .getByRole('button', { name: 'Commander' })
      .click()
    await expect(page).toHaveURL(/\/commande$/)
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(/quatre étapes/)

    // Step 1: mode, chosen with the keyboard
    const takeaway = page.getByRole('radio', { name: /À emporter/ })
    await takeaway.check({ force: true })
    await expect(takeaway).toBeChecked()
    await page.getByRole('button', { name: 'Continuer' }).click()
    await expect(page.getByRole('heading', { level: 2, name: 'Pour quand ?' })).toBeFocused()

    // Back and forth keeps the choice
    await page.getByRole('button', { name: 'Retour' }).click()
    await expect(page.getByRole('radio', { name: /À emporter/ })).toBeChecked()
    await page.getByRole('button', { name: 'Continuer' }).click()

    // Step 2: day and slot
    await pickDayAndSlot(page)
    await page.getByRole('button', { name: 'Continuer' }).click()

    // Step 3: contact, validated
    await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()
    await expect(page.getByRole('alert')).toHaveCount(3)
    await expect(page.getByLabel('Nom')).toBeFocused()
    await page.getByLabel('Nom').fill('Sacha Ketchum')
    await page.getByLabel('Téléphone').fill('06 12 34 56 78')
    await page.getByLabel('Email').fill('sacha@bourg-palette.fr')
    await page.getByRole('button', { name: 'Voir le récapitulatif' }).click()

    // Step 4: summary
    await expect(page.getByRole('heading', { level: 2, name: 'On vérifie ?' })).toBeVisible()
    await expect(page.getByText('À emporter', { exact: true })).toBeVisible()
    await expect(page.getByText('Simulation de commande.')).toBeVisible()
    await expect(page.getByText(/19,80/).first()).toBeVisible() // 12,90 + 6,90
    await page.getByRole('button', { name: /^Confirmer/ }).click()
    await expect(page.getByRole('button', { name: 'Envoi…' })).toBeDisabled()

    // Step 5: confirmation, cart emptied
    await expect(page.getByRole('heading', { level: 1, name: /C’est noté, Sacha/ })).toBeVisible({
      timeout: 5000,
    })
    await expect(page.getByText(/Commande PB-/)).toBeVisible()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 0 article')
  })

  test('with an empty cart the page sends back to the carte', async ({ page }) => {
    await page.goto('/commande')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Votre panier est vide.')
    await page.getByRole('link', { name: 'Voir la carte' }).click()
    await expect(page).toHaveURL(/\/menu$/)
  })

  test('the cart suggests a drink and a dessert, and the formule upgrade', async ({ page }) => {
    await page.goto('/menu')
    await page.getByRole('button', { name: 'Ajouter Pikachu Bento au panier' }).click()
    await cartButton(page).click()
    const drawer = page.getByRole('dialog', { name: /^Panier/ })
    // A drink and a dessert are suggested (one tap each), never added on their own
    await expect(drawer.getByText('Complétez votre commande')).toBeVisible()
    await expect(drawer.getByRole('button', { name: /^Ajouter .* au panier$/ })).toHaveCount(2)
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'Ajouter Pikachu Spark Soda au panier' }).click()
    await page.getByRole('button', { name: 'Ajouter Rondoudou Dessert au panier' }).click()
    await cartButton(page).click()
    // The three dishes of the Formule Pikachu are there: the upgrade is offered, never applied alone
    await expect(drawer.getByText(/Vous avez déjà les plats de la/)).toBeVisible()
    await drawer.getByRole('button', { name: /Passer en formule/ }).click()
    await expect(drawer.getByText('Formule Pikachu')).toBeVisible()
    await expect(drawer.getByText(/21,90/).first()).toBeVisible()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 1 article')
  })
})
