import { restaurant } from '../data/restaurant'

// Builds a calendar event (RFC 5545) for a reservation, offered as a download once the request
// is confirmed. Local floating time (no TZID): the restaurant and the guest share the same clock.

const escape = (text) =>
  String(text).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n')
const stamp = (iso, time) => `${iso.replace(/-/g, '')}T${time.replace(':', '')}00`

export function reservationIcs({ date, slot, guests, name, seating }) {
  const [hours, minutes] = slot.split(':').map(Number)
  const end = `${String(hours + 2).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`
  const lines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//PokeBistro//Reservation//FR',
    'BEGIN:VEVENT',
    `UID:${date}-${slot.replace(':', '')}-${Math.random().toString(36).slice(2, 8)}@pokebistro.demo`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').slice(0, 15)}Z`,
    `DTSTART:${stamp(date, slot)}`,
    `DTEND:${stamp(date, end)}`,
    `SUMMARY:${escape(`Table chez ${restaurant.name}`)}`,
    `DESCRIPTION:${escape(`Table pour ${guests}, ${seating}. Au nom de ${name}. ${restaurant.cancellationPolicy}`)}`,
    `LOCATION:${escape(`${restaurant.name}, ${restaurant.address.street}, ${restaurant.address.postalCode} ${restaurant.address.city}`)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ]
  return lines.join('\r\n')
}

export function icsDataUrl(content) {
  return `data:text/calendar;charset=utf-8,${encodeURIComponent(content)}`
}
