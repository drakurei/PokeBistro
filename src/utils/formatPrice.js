// 12.9 -> "12,90 €"
function formatPrice(price) {
  return price.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

export default formatPrice
