import { useEffect, useRef } from 'react'

// Generic modal, controlled by its parent with isOpen / onClose.
// It uses Bootstrap's modal CSS only: showing / hiding is done by React, not by Bootstrap JS.
function Modal({ isOpen, onClose, title, children }) {
  const closeButtonRef = useRef(null)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    // Escape key closes the modal
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }
    document.addEventListener('keydown', handleKeyDown)

    // Block the page scroll behind the modal and move the focus inside it
    document.body.classList.add('modal-open')
    closeButtonRef.current.focus()

    // Cleanup when the modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.classList.remove('modal-open')
    }
  }, [isOpen, onClose])

  if (!isOpen) {
    return null
  }

  return (
    <>
      <div className="modal-backdrop show"></div>
      {/* A click outside the dialog (on the dark area) closes the modal */}
      <div
        className="modal d-block"
        tabIndex="-1"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        onClick={onClose}
      >
        <div
          className="modal-dialog modal-dialog-centered modal-dialog-scrollable modal-lg"
          onClick={(event) => event.stopPropagation()}
        >
          <div className="modal-content border-0 rounded-4 shadow-lg">
            <div className="modal-header border-0 px-5 pt-5 pb-0">
              <h2 id="modal-title" className="modal-title fs-3 fw-bold mb-0">
                {title}
              </h2>
              <button ref={closeButtonRef} type="button" className="btn-close" aria-label="Fermer" onClick={onClose}></button>
            </div>
            <div className="modal-body px-5 pb-5 pt-4">{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Modal
