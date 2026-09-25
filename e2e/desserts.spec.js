import { test, expect } from '@playwright/test'

const cartButton = (page) => page.getByRole('button', { name: /Ouvrir le panier/ }).first()

test.describe('The dessert collection', () => {
  test('the home page opens the collection with the chef’s creation and four signatures', async ({
    page,
  }) => {
    await page.goto('/')
    const section = page.getByRole('region', { name: /touche sucrée/ })
    await expect(section).toBeVisible()
    await expect(section.getByText('Création du chef')).toBeVisible()
    await expect(section.getByRole('heading', { level: 3 })).toHaveCount(4)
    await section
      .getByRole('link', { name: /Pikachu Croquembouche/ })
      .first()
      .click()
    await expect(page).toHaveURL(/\/menu\/pikachu-croquembouche$/)
    await expect(page.getByRole('heading', { level: 1, name: 'Pikachu Croquembouche' })).toBeVisible()
    await expect(page.getByText('Choux & profiteroles', { exact: true })).toBeVisible()
    await expect(page.getByText('À déguster avec')).toBeVisible()
  })

  test('the desserts read like a pastry counter, on the carte and on their own', async ({ page }) => {
    await page.goto('/menu')
    const desserts = page.locator('#dessert')
    const groups = await desserts
      .getByRole('heading', { level: 3 })
      .filter({ hasText: /profiteroles|douceurs|glacés|bowls/ })
      .allTextContents()
    expect(groups.map((text) => text.replace(/\d+$/, '').trim())).toEqual([
      'Choux & profiteroles',
      'Gâteaux & douceurs',
      'Desserts glacés',
      'Fruits & bowls',
    ])
    await expect(desserts.locator('#dessert-choux').getByRole('article')).toHaveCount(15)

    await page.goto('/menu?category=dessert')
    await expect(page.getByRole('heading', { level: 1 })).toHaveText('Les desserts')
    await expect(page.locator('#dessert-choux')).toBeVisible()
    await expect(page.locator('#dessert-glace').getByRole('article')).toHaveCount(2)
  })

  test('a profiterole is found, opened, kept and ordered like any dish', async ({ page }) => {
    await page.goto('/menu?q=profiteroles')
    await expect(
      page
        .getByRole('status')
        .filter({ hasText: /plats?/ })
        .first(),
    ).toHaveText('15 plats sur 59')
    await page
      .getByRole('heading', { level: 3, name: 'Ectoplasma Dark Profiteroles' })
      .getByRole('link')
      .click()
    const dialog = page.getByRole('dialog', { name: 'Ectoplasma Dark Profiteroles' })
    await expect(dialog).toBeVisible()
    await expect(dialog.getByText('crumble cacao')).toBeVisible()
    await expect(dialog.locator('p', { hasText: 'Allergènes' })).toContainText('Gluten')
    await expect(dialog.getByText('À déguster avec')).toBeVisible()
    await dialog.getByRole('button', { name: 'Ajouter aux favoris' }).click()
    await dialog.getByRole('button', { name: /^Ajouter · 8,90 €/ }).click()
    await expect(cartButton(page)).toHaveAccessibleName('Ouvrir le panier, 1 article')
    await page.keyboard.press('Escape')
    await expect(page.getByRole('link', { name: 'Vos favoris, 1 plat' })).toBeVisible()
  })

  test('the cart suggests a choux of the same type after a main, the formule composer offers choux', async ({
    page,
  }) => {
    await page.goto('/menu')
    await page.getByRole('button', { name: 'Ajouter Lucario Power Burger au panier' }).click()
    await cartButton(page).click()
    const drawer = page.getByRole('dialog', { name: /^Panier/ })
    await expect(drawer.getByText('Complétez votre commande')).toBeVisible()
    await drawer.getByRole('button', { name: 'Ajouter Lucario Aura Profiteroles au panier' }).click()
    await expect(drawer.getByText('Et une boisson ?')).toBeVisible()
    await page.keyboard.press('Escape')

    await page.goto('/menu/formule/formule-dresseur')
    await expect(page.getByRole('heading', { level: 1, name: 'Formule Dresseur' })).toBeVisible()
    // Fourteen choux fit the dessert slot; the croquembouche (to share) stays out of the formules
    await expect(page.getByRole('radio', { name: /Profiteroles/ })).toHaveCount(14)
    await expect(page.getByRole('radio', { name: /Croquembouche/ })).toHaveCount(0)
    await page.getByRole('radio', { name: /Togepi Egg Profiteroles/ }).check({ force: true })
    await expect(page.getByRole('listitem').filter({ hasText: 'Togepi Egg Profiteroles' })).toBeVisible()
  })

  test('the story page tells the sweet laboratory', async ({ page }) => {
    await page.goto('/histoire')
    await expect(page.getByRole('heading', { name: /pâte à choux, ça se mérite/ })).toBeVisible()
    await page.getByRole('link', { name: 'Marill Bubble Profiteroles, voir le plat' }).click()
    await expect(page).toHaveURL(/\/menu\/marill-bubble-profiteroles$/)
  })
})
