// Client-side "API" layer.
// There is no backend yet: each function mimics the shape of a real request (Promise, delay, possible
// failure) so the forms already handle loading / success / error states. Replacing `fakeRequest` with a
// `fetch('/api/…')` is the only change needed to plug a real server.
//
// Demo hook: an email starting with "erreur@" makes the request fail, so the error state of every
// form can be seen (and tested) without a network.

const DELAY_MS = 900

function fakeRequest(payload, { delay = DELAY_MS } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (String(payload.email ?? '').startsWith('erreur@')) {
        reject(new Error('network'))
      } else {
        resolve({ ok: true, receivedAt: new Date().toISOString(), payload })
      }
    }, delay)
  })
}

export function sendContactMessage({ name, email, message }) {
  return fakeRequest({ name, email, message })
}

export function requestReservation({ date, slot, guests, seating, name, phone, email, request }) {
  return fakeRequest({ date, slot, guests, seating, name, phone, email, request })
}

// A simulated order: nothing is transmitted, an order number is made up for the confirmation screen
export async function placeOrder({ mode, date, slot, contact, lines, total }) {
  const response = await fakeRequest({ mode, date, slot, contact, lines, total, email: contact.email })
  const number = `PB-${Date.now().toString(36).slice(-4).toUpperCase()}`
  return { ...response, orderNumber: number }
}
