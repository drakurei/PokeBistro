import { restaurant } from '../data/restaurant'

// Everything about dates and hours: which days are open, which pickup slots exist, which
// reservation slots are (pretend) full. Pure functions, so the forms stay simple to test.

const pad = (n) => String(n).padStart(2, '0')

export function toISODate(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

export function fromISODate(iso) {
  const [year, month, day] = iso.split('-').map(Number)
  return new Date(year, month - 1, day, 12, 0, 0)
}

export const hourLabel = (slot) => slot.replace(':', 'h')

// "2026-12-25" and "12-25" both mean closed on that day
export function isClosed(iso) {
  return restaurant.closedDates.some((closed) => closed === iso || closed === iso.slice(5))
}

// The services of a given day: [['11:30', '14:30'], ['18:30', '22:30']]
export function servicesFor(iso) {
  const weekday = fromISODate(iso).getDay()
  const line = restaurant.schedule.find((entry) => entry.days.includes(weekday))
  return isClosed(iso) || !line ? [] : line.services
}

const toMinutes = (time) => {
  const [hours, minutes] = time.split(':').map(Number)
  return hours * 60 + minutes
}
const toTime = (minutes) => `${pad(Math.floor(minutes / 60))}:${pad(minutes % 60)}`

// Pickup / table slots of a day, every `step` minutes inside each service. Slots earlier than
// `now + lead` minutes are dropped when the date is today.
export function slotsFor(iso, { step = 15, lead = 30, now = new Date() } = {}) {
  const today = toISODate(now) === iso
  const earliest = today ? now.getHours() * 60 + now.getMinutes() + lead : -1
  const slots = []
  for (const [open, close] of servicesFor(iso)) {
    for (let minutes = toMinutes(open); minutes <= toMinutes(close) - 30; minutes += step) {
      if (minutes >= earliest) slots.push(toTime(minutes))
    }
  }
  return slots
}

// The next `count` days on which the restaurant is open, starting today
export function nextOpenDays(count, now = new Date()) {
  const days = []
  const cursor = new Date(now)
  cursor.setHours(12, 0, 0, 0)
  while (days.length < count && days.length < 30) {
    const iso = toISODate(cursor)
    if (!isClosed(iso) && servicesFor(iso).length > 0) days.push(iso)
    cursor.setDate(cursor.getDate() + 1)
  }
  return days
}

// Deterministic pseudo-random: the same date and slot always give the same answer, so the demo is
// stable from one visit to the next. Saturday dinner prime time is always full, like in real life.
function hash(text) {
  let value = 2166136261
  for (let i = 0; i < text.length; i += 1) {
    value ^= text.charCodeAt(i)
    value = Math.imul(value, 16777619)
  }
  return value >>> 0
}

export function simulatedAvailability(iso, slots) {
  const saturday = fromISODate(iso).getDay() === 6
  return Object.fromEntries(
    slots.map((slot) => {
      const full = (saturday && ['20:00', '20:30'].includes(slot)) || hash(`${iso}T${slot}`) % 5 === 0
      return [slot, full ? 'complet' : 'libre']
    }),
  )
}

const dayFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })

export function formatDay(iso, now = new Date()) {
  const today = toISODate(now)
  const tomorrow = toISODate(new Date(now.getTime() + 86_400_000))
  if (iso === today) return 'Aujourd’hui'
  if (iso === tomorrow) return 'Demain'
  return dayFormatter.format(fromISODate(iso))
}

export function formatLongDay(iso) {
  return dayFormatter.format(fromISODate(iso))
}
