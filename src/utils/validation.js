// Form validation helpers. Each validator returns an error message (string) or '' when valid.
// Inputs are trimmed and length-limited before any use; nothing is ever interpreted as HTML.

import { isClosed } from './schedule'

const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/

export const LIMITS = { name: 60, email: 254, message: 1000, messageMin: 10, request: 300 }

export function clean(value, max) {
  return (
    String(value ?? '')
      // oxlint-disable-next-line no-control-regex -- stripping control characters is the point
      .replace(/[\u0000-\u001f\u007f]/g, '')
      .trim()
      .slice(0, max)
  )
}

export function validateName(value) {
  const name = clean(value, LIMITS.name)
  if (name.length < 2) return 'Indiquez votre nom (2 caractères minimum).'
  return ''
}

export function validateEmail(value) {
  const email = clean(value, LIMITS.email)
  if (!email) return 'Indiquez votre adresse email.'
  if (!EMAIL_RE.test(email)) return 'Cette adresse email ne semble pas valide (ex. sacha@bourg-palette.fr).'
  return ''
}

// Landline or mobile, French or international: at least 9 digits, only phone punctuation around them
export function validatePhone(value) {
  const phone = clean(value, 20)
  if (!phone) return 'Indiquez un numéro de téléphone.'
  const digits = phone.replace(/\D/g, '')
  if (digits.length < 9 || digits.length > 15 || !/^\+?[\d\s.()-]+$/.test(phone)) {
    return 'Ce numéro ne semble pas valide (ex. 06 12 34 56 78).'
  }
  return ''
}

export function validateMessage(value) {
  const message = clean(value, LIMITS.message)
  if (message.length < LIMITS.messageMin) return `Écrivez au moins ${LIMITS.messageMin} caractères.`
  return ''
}

export function validateRequest(value) {
  return String(value ?? '').length > LIMITS.request ? `${LIMITS.request} caractères maximum.` : ''
}

// yyyy-mm-dd of today, in local time (used as the min of the date input)
export function todayISO() {
  const now = new Date()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  return `${now.getFullYear()}-${month}-${day}`
}

export function validateDate(value) {
  if (!value) return 'Choisissez une date.'
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return 'La date doit être au format jour/mois/année.'
  if (value < todayISO()) return 'La date est déjà passée.'
  const inThreeMonths = new Date()
  inThreeMonths.setMonth(inThreeMonths.getMonth() + 3)
  if (new Date(value) > inThreeMonths) return 'Les réservations ouvrent trois mois à l’avance.'
  if (isClosed(value)) return 'Le restaurant est fermé ce jour-là.'
  return ''
}

export function validateSlot(value, slots) {
  if (!value) return 'Choisissez un horaire.'
  if (!slots.includes(value)) return 'Cet horaire n’est pas proposé.'
  return ''
}

export function validateGuests(value, max) {
  const guests = Number(value)
  if (!Number.isInteger(guests) || guests < 1) return 'Indiquez le nombre de convives.'
  if (guests > max) return `Au-delà de ${max} personnes, appelez-nous : on s’organise.`
  return ''
}
