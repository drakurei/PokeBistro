const formatter = new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' })

// 12.9 -> "12,90 €"
export default function formatPrice(price) {
  return formatter.format(price)
}
