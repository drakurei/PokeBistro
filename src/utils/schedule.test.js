import { describe, expect, it } from 'vitest'
import { isClosed, nextOpenDays, servicesFor, simulatedAvailability, slotsFor, toISODate } from './schedule'

describe('schedule', () => {
  it('knows the closed days, by full date or by month-day', () => {
    expect(isClosed('2026-12-25')).toBe(true)
    expect(isClosed('2031-01-01')).toBe(true)
    expect(isClosed('2026-10-03')).toBe(false)
    expect(servicesFor('2026-12-25')).toEqual([])
  })

  it('has two services a day, later on the weekend', () => {
    expect(servicesFor('2026-10-05')).toEqual([
      ['11:30', '14:30'],
      ['18:30', '22:30'],
    ]) // a Monday
    expect(servicesFor('2026-10-03')[0][0]).toBe('12:00') // a Saturday
  })

  it('lists pickup slots inside the services and drops the ones too close to now', () => {
    const slots = slotsFor('2026-10-05', { now: new Date(2026, 9, 5, 12, 0) })
    expect(slots[0]).toBe('12:30') // 12:00 + 30 min lead
    expect(slots).toContain('19:00')
    expect(slots).not.toContain('14:15')
    expect(slotsFor('2026-10-06', { now: new Date(2026, 9, 5, 12, 0) })[0]).toBe('11:30')
    expect(slotsFor('2026-12-25')).toEqual([])
  })

  it('finds the next open days, skipping closures', () => {
    expect(nextOpenDays(3, new Date(2026, 11, 24, 10, 0))).toEqual(['2026-12-24', '2026-12-26', '2026-12-27'])
    expect(toISODate(new Date(2026, 0, 5))).toBe('2026-01-05')
  })

  it('simulates availability deterministically and fills Saturday prime time', () => {
    const first = simulatedAvailability('2026-10-03', ['19:00', '20:00', '20:30'])
    expect(first['20:00']).toBe('complet')
    expect(first['20:30']).toBe('complet')
    expect(simulatedAvailability('2026-10-03', ['19:00', '20:00', '20:30'])).toEqual(first)
    const week = simulatedAvailability('2026-10-05', [
      '12:00',
      '12:30',
      '13:00',
      '13:30',
      '19:00',
      '19:30',
      '20:00',
      '20:30',
      '21:00',
      '21:30',
    ])
    expect(Object.values(week).filter((state) => state === 'libre').length).toBeGreaterThanOrEqual(6)
  })
})
