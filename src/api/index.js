// Client-side "API" layer.
// There is no backend yet: each function mimics the shape of a real request (Promise, delay, possible
// failure) so the forms already handle loading / success / error states. Replacing `fakeRequest` with a
// `fetch('/api/…')` is the only change needed to plug a real server.

const DELAY_MS = 900

function fakeRequest(payload, { failRate = 0 } = {}) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() < failRate) {
        reject(new Error('network'))
      } else {
        resolve({ ok: true, receivedAt: new Date().toISOString(), payload })
      }
    }, DELAY_MS)
  })
}

export function sendContactMessage({ name, email, message }) {
  return fakeRequest({ name, email, message })
}

export function requestReservation({ date, slot, guests, name, email, request }) {
  return fakeRequest({ date, slot, guests, name, email, request })
}
