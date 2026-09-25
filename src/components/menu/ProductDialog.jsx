import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getProductBySlug } from '../../data/products'
import Dialog from '../ui/Dialog'
import { IconButton } from '../ui/Button'
import { IconClose } from '../ui/Icons'
import ProductDetail from './ProductDetail'

// /menu/:slug opened from the grid: the detail in a dialog, the menu still behind it.
// Closing plays the exit transition first, then goes back in history (or to a chosen page).
export default function ProductDialog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [closing, setClosing] = useState(null) // null | { target?: string }
  const product = getProductBySlug(slug)

  const close = (target) => {
    if (closing) return
    setClosing({ target })
  }

  const afterClose = () => {
    if (closing?.target) navigate(closing.target)
    else navigate(-1)
  }

  if (!product) return null

  return (
    <Dialog
      open={!closing}
      onClose={() => close()}
      onClosed={afterClose}
      variant="center"
      labelledBy="product-title"
      className="max-h-[92dvh] w-[min(92vw,64rem)] overflow-hidden rounded-(--radius-lg) bg-porcelain text-ink shadow-float-lg"
    >
      <div className="scroll-panel relative max-h-[92dvh] overflow-y-auto" data-lenis-prevent>
        <IconButton
          label="Fermer"
          onClick={() => close()}
          variant="light"
          className="absolute top-4 right-4 z-10 shadow-float"
          autoFocus
        >
          <IconClose size={22} />
        </IconButton>
        <ProductDetail
          product={product}
          onNavigate={(event) => {
            event.preventDefault()
            close(event.currentTarget.getAttribute('href'))
          }}
        />
      </div>
    </Dialog>
  )
}
