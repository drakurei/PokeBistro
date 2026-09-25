import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import Button from '../components/ui/Button'
import Field from '../components/ui/Field'
import DishImage from '../components/ui/DishImage'
import { IconArrowRight, IconCheck, IconChevronLeft, IconInfo } from '../components/ui/Icons'
import StepIndicator, { ORDER_STEPS } from '../components/order/StepIndicator'
import ChoiceCard from '../components/order/ChoiceCard'
import SlotPicker from '../components/order/SlotPicker'
import { PokeballMark } from '../components/layout/Logo'
import { useCart } from '../contexts/CartContext'
import { placeOrder } from '../api'
import { restaurant } from '../data/restaurant'
import formatPrice from '../utils/formatPrice'
import { plural } from '../utils/text'
import { clean, LIMITS, validateEmail, validateName, validatePhone } from '../utils/validation'
import { formatDay, formatLongDay, hourLabel, nextOpenDays, slotsFor } from '../utils/schedule'

const modes = [
  { id: 'sur-place', title: 'Sur place', description: 'On vous installe, la commande arrive à table.' },
  {
    id: 'a-emporter',
    title: 'À emporter',
    description: 'Prête au comptoir à l’heure choisie, dans un sac Roucool.',
  },
]
const modeLabel = (id) => modes.find((mode) => mode.id === id)?.title ?? id
const validators = { name: validateName, phone: validatePhone, email: validateEmail }

function DemoNotice() {
  return (
    <p
      role="note"
      className="flex items-start gap-2 rounded-(--radius-sm) bg-washi px-4 py-3 text-sm text-ink-soft"
    >
      <IconInfo size={18} className="mt-0.5 shrink-0 text-lacquer" />
      <span>
        <strong className="text-ink">Simulation de commande.</strong> Rien n’est transmis ni payé : le
        parcours est complet, le restaurant est fictif.
      </span>
    </p>
  )
}

// The order in five steps: mode, slot, contact, summary, confirmation. Everything lives on one page
// so the back button of the flow (not of the browser) moves between steps, the cart stays editable
// in its drawer until the last confirmation, and each step is one short decision.
export default function OrderPage() {
  const cart = useCart()
  const [step, setStep] = useState('mode')
  const [mode, setMode] = useState('')
  const [date, setDate] = useState('')
  const [slot, setSlot] = useState('')
  const [contact, setContact] = useState({ name: '', phone: '', email: '', note: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | error | done
  const [confirmation, setConfirmation] = useState(null)
  const heading = useRef(null)
  const days = nextOpenDays(3)
  const slots = date ? slotsFor(date) : []

  // The heading of each step takes the focus: screen readers announce where we are
  const skipFocus = useRef(true)
  useEffect(() => {
    if (skipFocus.current) {
      skipFocus.current = false
      return
    }
    heading.current?.focus({ preventScroll: false })
  }, [step])

  const go = (next) => {
    setErrors({})
    setStep(next)
  }
  const back = () => {
    const index = ORDER_STEPS.findIndex((item) => item.id === step)
    if (index > 0) go(ORDER_STEPS[index - 1].id)
  }

  const submitDetails = (event) => {
    event.preventDefault()
    const next = Object.fromEntries(
      Object.entries(validators).map(([key, validate]) => [key, validate(contact[key])]),
    )
    const invalid = Object.keys(next).find((key) => next[key])
    setErrors(next)
    if (invalid) {
      event.currentTarget.querySelector(`[name="${invalid}"]`)?.focus()
      return
    }
    go('summary')
  }

  const confirm = async () => {
    if (status === 'submitting') return
    setStatus('submitting')
    try {
      const response = await placeOrder({
        mode,
        date,
        slot,
        contact: {
          name: clean(contact.name, LIMITS.name),
          phone: clean(contact.phone, 20),
          email: clean(contact.email, LIMITS.email),
          note: clean(contact.note, LIMITS.request),
        },
        lines: cart.items.map((item) => ({
          key: item.key,
          name: item.name,
          quantity: item.quantity,
          price: item.price,
        })),
        total: cart.totalPrice,
      })
      setConfirmation({ number: response.orderNumber, items: cart.items, total: cart.totalPrice })
      cart.clear()
      setStatus('done')
      setStep('done')
    } catch {
      setStatus('error')
    }
  }

  if (step === 'done' && confirmation) {
    return (
      <>
        <section className="pt-(--spacing-header)">
          <div className="container-pb max-w-3xl py-12 md:py-16">
            <div
              role="status"
              className="flex flex-col items-start gap-5 rounded-(--radius-lg) bg-washi p-8 md:p-10"
            >
              <span className="flex size-12 items-center justify-center rounded-full bg-ink text-gold">
                <IconCheck size={24} />
              </span>
              <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">
                Commande {confirmation.number}
              </p>
              <h1
                ref={heading}
                tabIndex={-1}
                className="font-display text-display-md text-balance outline-none"
              >
                C’est noté, {contact.name.trim().split(' ')[0]}.
              </h1>
              <p className="text-ink-soft">
                {modeLabel(mode)}, {formatLongDay(date)} à {hourLabel(slot)}.{' '}
                {mode === 'a-emporter' ? 'Le sac vous attend au comptoir.' : 'Votre table est prévenue.'} Un
                récapitulatif partirait à <strong className="text-ink">{contact.email.trim()}</strong>.
              </p>
              <ul className="w-full divide-y divide-line border-y border-line">
                {confirmation.items.map((item) => (
                  <li key={item.key} className="flex justify-between gap-4 py-2 text-sm">
                    <span>
                      {item.quantity} × {item.name}
                    </span>
                    <span className="font-mono">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="flex w-full justify-between font-bold">
                Total <span className="font-mono">{formatPrice(confirmation.total)}</span>
              </p>
              <DemoNotice />
              <div className="flex flex-wrap gap-3">
                <Button to="/menu">Retour à la carte</Button>
                <Button to="/" variant="outline">
                  Accueil
                </Button>
              </div>
            </div>
          </div>
        </section>
      </>
    )
  }

  if (cart.hydrated && cart.items.length === 0) {
    return (
      <>
        <section className="container-pb flex min-h-[70vh] flex-col items-center justify-center pt-(--spacing-header) text-center">
          <PokeballMark size={64} className="text-ink-mute" />
          <h1 className="mt-6 font-display text-display-md">Votre panier est vide.</h1>
          <p className="mt-3 max-w-md text-ink-soft">
            Choisissez un plat ou une formule sur la carte, puis revenez ici pour commander.
          </p>
          <Button to="/menu" className="mt-8">
            Voir la carte
          </Button>
        </section>
      </>
    )
  }

  return (
    <>
      <section className="pt-(--spacing-header)">
        <div className="container-pb pt-12 md:pt-16">
          <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">Commander</p>
          <h1 className="mt-4 font-display text-display-lg text-balance">
            Votre commande, en quatre étapes.
          </h1>
          <div className="mt-6">
            <StepIndicator current={step} />
          </div>
        </div>

        <div className="container-pb grid gap-12 py-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            {step === 'mode' && (
              <div className="flex flex-col gap-6">
                <h2 ref={heading} tabIndex={-1} className="font-display text-display-sm outline-none">
                  Sur place ou à emporter ?
                </h2>
                <fieldset className="grid gap-3 border-0 p-0 sm:grid-cols-2">
                  <legend className="sr-only">Mode de commande</legend>
                  {modes.map((item) => (
                    <ChoiceCard
                      key={item.id}
                      name="mode"
                      value={item.id}
                      checked={mode === item.id}
                      onChange={setMode}
                      title={item.title}
                      description={item.description}
                    />
                  ))}
                </fieldset>
                <p className="text-sm text-ink-mute">
                  La livraison Roucool arrive plus tard : pour l’instant, on se voit au bistro.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button onClick={() => go('slot')} disabled={!mode} size="lg">
                    Continuer
                    <IconArrowRight size={18} />
                  </Button>
                  <Button to="/menu" variant="ghost">
                    Modifier la commande
                  </Button>
                </div>
              </div>
            )}

            {step === 'slot' && (
              <div className="flex flex-col gap-6">
                <h2 ref={heading} tabIndex={-1} className="font-display text-display-sm outline-none">
                  Pour quand ?
                </h2>
                <fieldset className="border-0 p-0">
                  <legend className="mb-3 font-mono text-xs tracking-[0.14em] text-ink-mute uppercase">
                    Jour
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {days.map((day) => (
                      <label
                        key={day}
                        className={`flex h-11 cursor-pointer items-center rounded-full border px-4 text-sm font-medium transition-colors has-[input:focus-visible]:outline-3 has-[input:focus-visible]:outline-lacquer/50 ${
                          date === day ? 'border-ink bg-ink text-porcelain' : 'border-line hover:border-ink'
                        }`}
                      >
                        <input
                          type="radio"
                          name="date"
                          value={day}
                          checked={date === day}
                          onChange={() => {
                            setDate(day)
                            setSlot('')
                          }}
                          className="sr-only"
                        />
                        {formatDay(day)}
                      </label>
                    ))}
                  </div>
                </fieldset>
                {date && (
                  <SlotPicker
                    name="slot"
                    slots={slots}
                    value={slot}
                    onChange={setSlot}
                    legend={mode === 'a-emporter' ? 'Heure de retrait' : 'Heure d’arrivée'}
                  />
                )}
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" onClick={back}>
                    <IconChevronLeft size={18} />
                    Retour
                  </Button>
                  <Button onClick={() => go('details')} disabled={!date || !slot} size="lg">
                    Continuer
                    <IconArrowRight size={18} />
                  </Button>
                </div>
              </div>
            )}

            {step === 'details' && (
              <form onSubmit={submitDetails} noValidate className="flex flex-col gap-6">
                <h2 ref={heading} tabIndex={-1} className="font-display text-display-sm outline-none">
                  À quel nom ?
                </h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field
                    id="order-name"
                    name="name"
                    label="Nom"
                    required
                    autoComplete="name"
                    maxLength={LIMITS.name}
                    value={contact.name}
                    onChange={(event) => setContact({ ...contact, name: event.target.value })}
                    error={errors.name}
                  />
                  <Field
                    id="order-phone"
                    name="phone"
                    type="tel"
                    label="Téléphone"
                    required
                    autoComplete="tel"
                    inputMode="tel"
                    hint="On appelle seulement si quelque chose coince."
                    value={contact.phone}
                    onChange={(event) => setContact({ ...contact, phone: event.target.value })}
                    error={errors.phone}
                  />
                </div>
                <Field
                  id="order-email"
                  name="email"
                  type="email"
                  label="Email"
                  required
                  autoComplete="email"
                  inputMode="email"
                  maxLength={LIMITS.email}
                  hint="Pour le récapitulatif de commande."
                  value={contact.email}
                  onChange={(event) => setContact({ ...contact, email: event.target.value })}
                  error={errors.email}
                />
                <Field
                  id="order-note"
                  name="note"
                  as="textarea"
                  label="Une précision pour la cuisine"
                  maxLength={LIMITS.request}
                  hint="Facultatif : sans coriandre, sauce à part, bougie sur le dessert…"
                  value={contact.note}
                  onChange={(event) => setContact({ ...contact, note: event.target.value })}
                  className="[&_textarea]:min-h-20"
                />
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" type="button" onClick={back}>
                    <IconChevronLeft size={18} />
                    Retour
                  </Button>
                  <Button type="submit" size="lg">
                    Voir le récapitulatif
                    <IconArrowRight size={18} />
                  </Button>
                </div>
              </form>
            )}

            {step === 'summary' && (
              <div className="flex flex-col gap-6">
                <h2 ref={heading} tabIndex={-1} className="font-display text-display-sm outline-none">
                  On vérifie ?
                </h2>
                <dl className="grid gap-4 rounded-(--radius-md) border border-line p-5 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Mode</dt>
                    <dd className="mt-1 font-bold">{modeLabel(mode)}</dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Créneau</dt>
                    <dd className="mt-1 font-bold">
                      {formatLongDay(date)} · {hourLabel(slot)}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">Contact</dt>
                    <dd className="mt-1">
                      <span className="font-bold">{contact.name.trim()}</span>
                      <br />
                      {contact.phone.trim()} · {contact.email.trim()}
                    </dd>
                  </div>
                  {contact.note.trim() && (
                    <div>
                      <dt className="font-mono text-xs tracking-[0.12em] text-ink-mute uppercase">
                        Pour la cuisine
                      </dt>
                      <dd className="mt-1 text-ink-soft">{contact.note.trim()}</dd>
                    </div>
                  )}
                </dl>
                <DemoNotice />
                {status === 'error' && (
                  <p
                    role="alert"
                    className="rounded-(--radius-sm) bg-danger/10 px-4 py-3 text-sm font-medium text-danger"
                  >
                    La commande n’est pas partie (problème de connexion). Réessayez, ou appelez-nous au{' '}
                    {restaurant.phone}.
                  </p>
                )}
                <div className="flex flex-wrap gap-3">
                  <Button variant="ghost" onClick={back} disabled={status === 'submitting'}>
                    <IconChevronLeft size={18} />
                    Retour
                  </Button>
                  <Button onClick={confirm} loading={status === 'submitting'} size="lg">
                    {status === 'submitting' ? 'Envoi…' : `Confirmer · ${formatPrice(cart.totalPrice)}`}
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* The cart, always in view, editable from its drawer until the end */}
          <aside className="lg:col-span-5" aria-label="Votre panier">
            <div className="rounded-(--radius-lg) bg-ink p-6 text-porcelain lg:sticky lg:top-[calc(var(--spacing-header)+1.5rem)]">
              <div className="flex items-baseline justify-between">
                <h2 className="font-display text-lg font-semibold">Panier</h2>
                <span className="font-mono text-xs text-porcelain/60">
                  {plural(cart.totalItems, 'article')}
                </span>
              </div>
              <ul className="mt-4 divide-y divide-porcelain/12">
                {cart.items.map((item) => (
                  <li key={item.key} className="flex items-center gap-3 py-3">
                    <span className="size-12 shrink-0 overflow-hidden rounded-full bg-washi">
                      <DishImage product={item} sizes="48px" className="h-full w-full object-cover" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm">
                      <span className="block truncate font-bold">
                        {item.quantity} × {item.name}
                      </span>
                      {item.kind === 'formula' && (
                        <span className="block truncate text-xs text-porcelain/60">
                          {item.composition.join(' · ')}
                        </span>
                      )}
                    </span>
                    <span className="font-mono text-sm">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-4 flex items-baseline justify-between border-t border-porcelain/15 pt-4">
                <span className="font-bold">Total</span>
                <span className="font-mono text-2xl">{formatPrice(cart.totalPrice)}</span>
              </p>
              <p className="mt-1 font-mono text-xs text-porcelain/60">Paiement au comptoir · simulation</p>
              <button
                type="button"
                onClick={cart.open}
                className="mt-4 text-sm font-bold text-gold underline-offset-4 hover:underline"
              >
                Modifier le panier
              </button>
              <p className="mt-4 text-xs text-porcelain/50">
                <Link to="/menu" className="text-porcelain/70">
                  Continuer mes achats
                </Link>
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  )
}
