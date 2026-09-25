import { test, expect } from '@playwright/test'

const cartButton = (page) => page.getByRole('button', { name: /Ouvrir le panier/ }).first()
const drawer = (page) => page.getByRole('dialog', { name: /^Panier/ })

test.describe('Cart', () => {
  test('add, adjust, remove, empty state and persistence', async ({ page }) => {
    await page.goto('/menu')

    await page.getByRole('button', { name: 'Ajouter Pikachu Bento au panier' }).click()
    await expect(page.getByRole('status').filter({ hasText: 'Ajouté au panier' })).toBeVisible()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 1 article')

    // The card now shows a stepper instead of the button
    const stepper = page.getByRole('group', { name: 'Quantité de Pikachu Bento' }).first()
    await stepper.getByRole('button', { name: 'Augmenter la quantité' }).click()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 2 articles')

    await page.getByRole('button', { name: 'Ajouter Rondoudou Dessert au panier' }).click()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 3 articles')

    await cartButton(page).click()
    await expect(drawer(page)).toBeVisible()
    await expect(drawer(page).getByText('Total')).toBeVisible()
    // 2 × 12,90 + 6,90 = 32,70
    await expect(drawer(page).getByText(/32,70/)).toBeVisible()

    // Reload: the cart is restored from localStorage
    await page.reload()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 3 articles')

    await cartButton(page).click()
    await drawer(page).getByRole('button', { name: 'Supprimer Rondoudou Dessert du panier' }).click()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 2 articles')

    // Decrement twice: the line disappears at 0 and the empty state shows
    const line = drawer(page).getByRole('group', { name: 'Quantité de Pikachu Bento' })
    await line.getByRole('button', { name: 'Diminuer la quantité' }).click()
    await line.getByRole('button', { name: 'Retirer du panier' }).click()
    await expect(drawer(page).getByText('Votre panier est vide.')).toBeVisible()
  })

  test('"Commander" opens the order flow and "Vider" asks for confirmation', async ({ page }) => {
    await page.goto('/menu')
    await page.getByRole('button', { name: 'Ajouter Pikachu Bento au panier' }).click()
    await cartButton(page).click()
    await drawer(page).getByRole('button', { name: 'Commander' }).click()
    await expect(page).toHaveURL(/\/commande$/)
    await expect(page.getByRole('heading', { level: 2, name: 'Sur place ou à emporter ?' })).toBeVisible()

    await cartButton(page).click()
    await drawer(page).getByRole('button', { name: 'Vider' }).click()
    await drawer(page).getByRole('button', { name: 'Confirmer' }).click()
    await expect(drawer(page).getByText('Votre panier est vide.')).toBeVisible()
  })

  test('the drawer is keyboard operable: Escape closes it and focus returns', async ({ page }) => {
    await page.goto('/')
    await cartButton(page).focus()
    await page.keyboard.press('Enter')
    await expect(drawer(page)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(drawer(page)).toBeHidden()
    await expect(cartButton(page)).toBeFocused()
  })

  test('corrupted storage is ignored', async ({ page }) => {
    await page.goto('/')
    await page.evaluate(() =>
      localStorage.setItem(
        'pokebistro:cart',
        '{"items":[{"kind":"product","productId":999,"key":"p:999","quantity":-3}]}',
      ),
    )
    await page.reload()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 0 article')
  })
})
