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
  validateSlot,
} from '../../utils/validation'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { controlClass } from '../ui/formStyles'
import { IconCheck } from '../ui/Icons'
import useForm from './useForm'

const validators = {
  date: validateDate,
  slot: (value) => validateSlot(value, restaurant.reservationSlots),
  guests: (value) => validateGuests(value, restaurant.maxGuests),
  name: validateName,
  email: validateEmail,
}
const initialValues = { date: '', slot: '', guests: '2', name: '', email: '', website: '' }
const lunchSlots = restaurant.reservationSlots.filter((slot) => slot < '15:00')
const dinnerSlots = restaurant.reservationSlots.filter((slot) => slot >= '15:00')
const guestOptions = Array.from({ length: restaurant.maxGuests }, (_, index) => index + 1)
const dateFormatter = new Intl.DateTimeFormat('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
const hour = (slot) => slot.replace(':', 'h')

function submit(values) {
  if (values.website) return Promise.resolve({ ok: true })
  return requestReservation({
    date: values.date,
    slot: values.slot,
    guests: Number(values.guests),
    name: clean(values.name, LIMITS.name),
    email: clean(values.email, LIMITS.email),
  })
}

export default function ReservationForm() {
  const { values, errors, status, formRef, handleChange, handleBlur, handleSubmit, reset } = useForm(
    initialValues,
    validators,
    submit,
  )

  if (status === 'success') {
    const when = dateFormatter.format(new Date(`${values.date}T12:00:00`))
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-(--radius-lg) bg-washi p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-gold">
          <IconCheck size={24} />
        </span>
        <h3 className="font-display text-display-sm">Demande reçue.</h3>
        <p className="text-ink-soft">
          Table pour <strong className="text-ink">{values.guests}</strong> {when}, à{' '}
          <strong className="text-ink">{hour(values.slot)}</strong>. On confirme par email à{' '}
          <strong className="text-ink">{values.email.trim()}</strong> avant le service.
        </p>
        <Button variant="outline" onClick={reset}>
          Nouvelle réservation
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
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
        />
        <Field id="resa-slot" label="Horaire" required error={errors.slot}>
          <select
            id="resa-slot"
            name="slot"
            required
            value={values.slot}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={errors.slot ? true : undefined}
            aria-describedby={errors.slot ? 'resa-slot-error' : undefined}
            className={controlClass}
          >
            <option value="">Choisir…</option>
            <optgroup label="Déjeuner">
              {lunchSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {hour(slot)}
                </option>
              ))}
            </optgroup>
            <optgroup label="Dîner">
              {dinnerSlots.map((slot) => (
                <option key={slot} value={slot}>
                  {hour(slot)}
                </option>
              ))}
            </optgroup>
          </select>
        </Field>
      </div>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          id="resa-name"
          name="name"
          label="Nom"
          required
          autoComplete="name"
          maxLength={LIMITS.name}
          placeholder="Ondine Waterflower"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.name}
        />
        <Field
          id="resa-email"
          name="email"
          type="email"
          label="Email"
          required
          autoComplete="email"
          inputMode="email"
          maxLength={LIMITS.email}
          placeholder="ondine@azuria.fr"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.email}
        />
      </div>
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

      {status === 'error' && (
        <p
          role="alert"
          className="rounded-(--radius-sm) bg-danger/10 px-4 py-3 text-sm font-medium text-danger"
        >
          La demande n’est pas partie (problème de connexion). Réessayez, ou appelez-nous au{' '}
          {restaurant.phone}.
        </p>
      )}

      <Button type="submit" size="lg" loading={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Envoi…' : 'Demander une table'}
      </Button>
      <p className="text-xs text-ink-mute">
        Démonstration : aucune réservation n’est réellement transmise. La structure est prête pour une vraie
        API.
      </p>
    </form>
  )
}
