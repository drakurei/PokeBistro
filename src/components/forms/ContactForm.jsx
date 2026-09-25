import { sendContactMessage } from '../../api'
import { clean, LIMITS, validateEmail, validateMessage, validateName } from '../../utils/validation'
import Button from '../ui/Button'
import Field from '../ui/Field'
import { IconCheck } from '../ui/Icons'
import useForm from './useForm'

const validators = { name: validateName, email: validateEmail, message: validateMessage }
const initialValues = { name: '', email: '', message: '', website: '' }

function submit(values) {
  // Honeypot: bots fill every field; humans never see this one
  if (values.website) return Promise.resolve({ ok: true })
  return sendContactMessage({
    name: clean(values.name, LIMITS.name),
    email: clean(values.email, LIMITS.email),
    message: clean(values.message, LIMITS.message),
  })
}

export default function ContactForm() {
  const { values, errors, status, formRef, handleChange, handleBlur, handleSubmit, reset } = useForm(
    initialValues,
    validators,
    submit,
  )

  if (status === 'success') {
    return (
      <div role="status" className="flex flex-col items-start gap-4 rounded-(--radius-lg) bg-washi p-8">
        <span className="flex size-12 items-center justify-center rounded-full bg-ink text-gold">
          <IconCheck size={24} />
        </span>
        <h3 className="font-display text-display-sm">Message envoyé.</h3>
        <p className="text-ink-soft">
          Merci {values.name.trim()}. On vous répond à{' '}
          <strong className="text-ink">{values.email.trim()}</strong> avant le prochain service.
        </p>
        <Button variant="outline" onClick={reset}>
          Envoyer un autre message
        </Button>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      <Field
        id="contact-name"
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
        id="contact-email"
        name="email"
        type="email"
        label="Email"
        required
        autoComplete="email"
        inputMode="email"
        maxLength={LIMITS.email}
        hint="Pour vous répondre."
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
      />
      <Field
        id="contact-message"
        name="message"
        as="textarea"
        label="Message"
        required
        maxLength={LIMITS.message}
        hint={`${values.message.length} / ${LIMITS.message}`}
        value={values.message}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.message}
      />
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="contact-website">Site web</label>
        <input
          id="contact-website"
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
          Le message n’est pas parti (problème de connexion). Réessayez, ou appelez-nous.
        </p>
      )}

      <Button type="submit" size="lg" loading={status === 'submitting'} className="self-start">
        {status === 'submitting' ? 'Envoi…' : 'Envoyer le message'}
      </Button>
    </form>
  )
}
