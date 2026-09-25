import { useState } from 'react'
import { requestReservation } from '../../api'
import { restaurant } from '../../data/restaurant'
import {
  clean,
  LIMITS,
  todayISO,
  validateDate,
  validateEmail,
  validateGuests,
  validateName,
  validatePhone,
  validateRequest,
  validateSlot,
} from '../../utils/validation'
import { formatLongDay, hourLabel, isClosed, simulatedAvailability } from '../../utils/schedule'
import { icsDataUrl, reservationIcs } from '../../utils/ics'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { controlClass } from '../ui/formStyles'
import { IconCheck, IconChevronLeft, IconInfo } from '../ui/Icons'
import ChoiceCard from '../order/ChoiceCard'
import useForm from './useForm'

const validators = {
  date: validateDate,
  slot: (value, values) => {
    const base = validateSlot(value, restaurant.reservationSlots)
    if (base) return base
    return simulatedAvailability(values.date, [value])[value] === 'complet'
      ? 'Ce créneau est complet, choisissez-en un autre.'
      : ''
  },
  guests: (value) => validateGuests(value, restaurant.maxGuests),
  seating: (value) =>
    restaurant.seating.some((option) => option.id === value) ? '' : 'Choisissez intérieur ou terrasse.',
  name: validateName,
  phone: validatePhone,
  email: validateEmail,
  request: validateRequest,
}
const initialValues = {
  date: '',
  slot: '',
  guests: '2',
  seating: 'interieur',
  name: '',
  phone: '',
  email: '',
  request: '',
  website: '',
}
const lunchSlots = restaurant.reservationSlots.filter((slot) => slot < '15:00')
const dinnerSlots = restaurant.reservationSlots.filter((slot) => slot >= '15:00')
const guestOptions = Array.from({ length: restaurant.maxGuests }, (_, index) => index + 1)
const seatingLabel = (id) => restaurant.seating.find((option) => option.id === id)?.label ?? id

function submit(values) {
  if (values.website) return Promise.resolve({ ok: true })
  return requestReservation({
    date: values.date,
    slot: values.slot,
    guests: Number(values.guests),
    seating: values.seating,
    name: clean(values.name, LIMITS.name),
    phone: clean(values.phone, 20),
    email: clean(values.email, LIMITS.email),
    request: clean(values.request, LIMITS.request),
  })
}

// Two screens: the form, then a summary to confirm. The availability of each slot is simulated
// (deterministic per date) so full slots are shown but cannot be picked.
export default function ReservationForm() {
  const form = useForm(initialValues, validators, submit)
  const { values, errors, status, formRef, handleChange, handleBlur, reset } = form
  const [reviewing, setReviewing] = useState(false)

  const availability =
    values.date && !isClosed(values.date)
      ? simulatedAvailability(values.date, restaurant.reservationSlots)
      : {}
  const closed = values.date && isClosed(values.date)

  const review = (event) => {
    event.preventDefault()
    const nextErrors = Object.fromEntries(
      Object.keys(validators).map((name) => [name, validators[name](values[name], values)]),
    )
    form.setAllErrors(nextErrors)
    const firstInvalid = Object.keys(validators).find((name) => nextErrors[name])
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setReviewing(true)
  }

  if (status === 'success') {
    const ics = icsDataUrl(
      reservationIcs({
        date: values.date,
        slot: values.slot,
        guests: values.guests,
        name: values.name.trim(),
        seating: seatingLabel(values.seating),
      }),
    )
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-(--radius-lg) bg-washi p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-gold">
          <IconCheck size={24} />
        </span>
        <h3 className="font-display text-display-sm">Demande reçue.</h3>
        <p className="text-ink-soft">
          Table pour <strong className="text-ink">{values.guests}</strong> en{' '}
          {seatingLabel(values.seating).toLowerCase()}, {formatLongDay(values.date)}, à{' '}
          <strong className="text-ink">{hourLabel(values.slot)}</strong>. On confirme par email à{' '}
          <strong className="text-ink">{values.email.trim()}</strong> avant le service.
          {values.request.trim() && ' Votre demande a bien été notée.'}
        </p>
        <p className="text-sm text-ink-mute">{restaurant.cancellationPolicy}</p>
        <div className="flex flex-wrap gap-3">
          <Button href={ics} download="reservation-pokebistro.ics" variant="dark">
            Ajouter à mon agenda (.ics)
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              reset()
              setReviewing(false)
            }}
          >
            Nouvelle réservation
          </Button>
        </div>
      </div>
    )
  }

  if (reviewing) {
    return (
      <div className="flex flex-col gap-6">
        <h3 className="font-display text-display-sm">Vérifiez votre demande</h3>
        <dl className="grid gap-4 rounded-(--radius-md) border border-line p-5 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Quand</dt>
            <dd className="mt-1 font-bold">
              {formatLongDay(values.date)} · {hourLabel(values.slot)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Table</dt>
            <dd className="mt-1 font-bold">
              {values.guests} {Number(values.guests) > 1 ? 'personnes' : 'personne'} ·{' '}
              {seatingLabel(values.seating)}
            </dd>
          </div>
          <div>
            <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Au nom de</dt>
            <dd className="mt-1">
              <span className="font-bold">{values.name.trim()}</span>
              <br />
              {values.phone.trim()} · {values.email.trim()}
            </dd>
          </div>
          {values.request.trim() && (
            <div>
              <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Demande</dt>
              <dd className="mt-1 text-ink-soft">{values.request.trim()}</dd>
            </div>
          )}
        </dl>
        <p className="flex items-start gap-2 text-sm text-ink-soft">
          <IconInfo size={18} className="mt-0.5 shrink-0 text-lacquer" />
          {restaurant.cancellationPolicy} Démonstration : aucune réservation n’est réellement transmise.
        </p>
        {status === 'error' && (
          <p
            role="alert"
            className="rounded-(--radius-sm) bg-danger/10 px-4 py-3 text-sm font-medium text-danger"
          >
            La demande n’est pas partie (problème de connexion). Réessayez, ou appelez-nous au{' '}
            {restaurant.phone}.
          </p>
        )}
        <div className="flex flex-wrap gap-3">
          <Button variant="ghost" onClick={() => setReviewing(false)} disabled={status === 'submitting'}>
            <IconChevronLeft size={18} />
            Modifier
          </Button>
          <Button size="lg" loading={status === 'submitting'} onClick={form.submitValues}>
            {status === 'submitting' ? 'Envoi…' : 'Confirmer la demande'}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={review} noValidate className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="resa-date"
          name="date"
          type="date"
          label="Date"
          required
          min={todayISO()}
          value={values.date}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.date}
          hint={closed ? undefined : 'Jusqu’à trois mois à l’avance.'}
        />
        <Field
          id="resa-slot"
          label="Horaire"
          required
          error={errors.slot}
          hint={values.date && !closed ? 'Les créneaux complets sont indiqués.' : undefined}
        >
          <select
            id="resa-slot"
            name="slot"
            required
            value={values.slot}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.slot ? true : undefined}
            aria-describedby={errors.slot ? 'resa-slot-error' : 'resa-slot-hint'}
            className={controlClass}
          >
            <option value="">Choisir…</option>
            <optgroup label="Déjeuner">
              {lunchSlots.map((slot) => (
                <option key={slot} value={slot} disabled={availability[slot] === 'complet'}>
                  {hourLabel(slot)}
                  {availability[slot] === 'complet' ? ' (complet)' : ''}
                </option>
              ))}
            </optgroup>
            <optgroup label="Dîner">
              {dinnerSlots.map((slot) => (
                <option key={slot} value={slot} disabled={availability[slot] === 'complet'}>
                  {hourLabel(slot)}
                  {availability[slot] === 'complet' ? ' (complet)' : ''}
                </option>
              ))}
            </optgroup>
          </select>
        </Field>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="resa-guests"
          label="Convives"
          required
          hint={`Jusqu’à ${restaurant.maxGuests} personnes en ligne. Au-delà, appelez-nous.`}
          error={errors.guests}
        >
          <select
            id="resa-guests"
            name="guests"
            required
            value={values.guests}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-describedby="resa-guests-hint"
            className={controlClass}
          >
            {guestOptions.map((count) => (
              <option key={count} value={count}>
                {count} {count > 1 ? 'personnes' : 'personne'}
              </option>
            ))}
          </select>
        </Field>
        <fieldset className="border-0 p-0">
          <legend className="mb-2 text-sm font-bold">Où ?</legend>
          <div className="grid gap-2">
            {restaurant.seating.map((option) => (
              <ChoiceCard
                key={option.id}
                name="seating"
                value={option.id}
                checked={values.seating === option.id}
                onChange={(value) => handleChange({ target: { name: 'seating', value } })}
                title={option.label}
                description={option.description}
              />
            ))}
          </div>
        </fieldset>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="resa-name"
          name="name"
          label="Nom"
          required
          autoComplete="name"
          maxLength={LIMITS.name}
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <Field
          id="resa-phone"
          name="phone"
          type="tel"
          label="Téléphone"
          required
          autoComplete="tel"
          inputMode="tel"
          hint="Utile si la table doit bouger."
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.phone}
        />
      </div>
      <Field
        id="resa-email"
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        inputMode="email"
        maxLength={LIMITS.email}
        hint="La confirmation arrive là."
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Field
        id="resa-request"
        name="request"
        as="textarea"
        label="Demande spéciale"
        maxLength={LIMITS.request}
        hint="Facultatif : anniversaire, allergie, poussette, table près de la fenêtre…"
        value={values.request}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.request}
        className="[&_textarea]:min-h-24"
      />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="resa-website">Site web</label>
        <input
          id="resa-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={values.website}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" size="lg" className="self-start">
        Vérifier ma demande
      </Button>
      <p className="text-xs text-ink-mute">
        Démonstration : aucune réservation n’est réellement transmise. La structure est prête pour une vraie
        API.
      </p>
    </form>
  )
}
