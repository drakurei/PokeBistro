// Joins class names, skipping falsy values: cn('btn', isActive && 'is-active') -> 'btn is-active'
export default function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}
