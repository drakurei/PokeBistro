// Reusable Bootstrap button.
// variant: "primary", "warning", "outline-danger", "light"... (any Bootstrap btn-* variant)
// size: "sm" or "lg" (optional)
// Every other prop (onClick, disabled, aria-label...) is passed to the <button>.
function Button({ children, variant = 'primary', size, type = 'button', className = '', ...props }) {
  const classes = ['btn', `btn-${variant}`, size ? `btn-${size}` : '', className].join(' ').trim()

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default Button
