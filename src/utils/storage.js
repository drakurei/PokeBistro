// Safe wrappers around localStorage.
// Storage can be missing (privacy mode), full, or hold garbage written by another version of the site:
// nothing here ever throws, and a value is only returned when it passes the caller's validator.

const PREFIX = 'pokebistro:'
const MAX_BYTES = 32 * 1024 // no reason to ever store more than this

function getStorage() {
  try {
    return window.localStorage
  } catch {
    return null
  }
}

export function readJSON(key, validate) {
  const storage = getStorage()
  if (!storage) return null
  try {
    const raw = storage.getItem(PREFIX + key)
    if (raw === null || raw.length > MAX_BYTES) return null
    const value = JSON.parse(raw)
    return validate(value) ? value : null
  } catch {
    return null
  }
}

export function writeJSON(key, value) {
  const storage = getStorage()
  if (!storage) return
  try {
    const raw = JSON.stringify(value)
    if (raw.length > MAX_BYTES) return
    storage.setItem(PREFIX + key, raw)
  } catch {
    // Quota exceeded or storage disabled: the app keeps working without persistence
  }
}

export function removeItem(key) {
  const storage = getStorage()
  if (!storage) return
  try {
    storage.removeItem(PREFIX + key)
  } catch {
    // ignore
  }
}

export const isPositiveInt = (value) => Number.isInteger(value) && value > 0
