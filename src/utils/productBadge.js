// One editorial badge at most on a card: Nouveau, else Signature, else Choix du chef.
// Rare on purpose: a badge only means something if most dishes have none.
export default function productBadge(product) {
  if (product.tags.includes('nouveau')) return { label: 'Nouveau', className: 'bg-gold text-ink' }
  if (product.tags.includes('signature')) return { label: 'Signature', className: 'bg-ink text-porcelain' }
  if (product.tags.includes('chef')) return { label: 'Choix du chef', className: 'bg-lacquer text-porcelain' }
  return null
}
