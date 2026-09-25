import { useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import { getCombo } from '../../data/combos'
import Dialog from '../ui/Dialog'
import { IconButton } from '../ui/Button'
import { IconClose } from '../ui/Icons'
import ComboDetail from './ComboDetail'

// /menu/formule/:slug opened from the carte: the formule in a dialog, the menu still behind it
export default function ComboDialog() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [closing, setClosing] = useState(false)
  const combo = getCombo(slug)

  const close = () => {
    if (closing) return
    setClosing(true)
  }

  if (!combo) return null

  return (
    <Dialog
      open={!closing}
      onClose={close}
      onClosed={() => navigate(-1)}
      variant="center"
      labelledBy="combo-title"
      className="max-h-[92dvh] w-[min(92vw,64rem)] overflow-hidden rounded-(--radius-lg) bg-porcelain text-ink shadow-float-lg"
    >
      <div className="scroll-panel relative max-h-[92dvh] overflow-y-auto" data-lenis-prevent>
        <IconButton
          label="Fermer"
          onClick={close}
          variant="light"
          className="absolute top-4 right-4 z-10 shadow-float"
          autoFocus
        >
          <IconClose size={22} />
        </IconButton>
        <ComboDetail combo={combo} />
      </div>
    </Dialog>
  )
}
