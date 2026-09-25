import { useState } from 'react'
import IconPin from '../Icons/IconPin'
import IconPhone from '../Icons/IconPhone'
import IconClock from '../Icons/IconClock'

// Contact section (Tailwind). The form is a demo: nothing is sent anywhere.
const inputClasses =
  'w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-800 outline-none transition focus:border-poke-blue focus:bg-white focus:ring-2 focus:ring-poke-blue/30'

const infos = [
  { icon: IconPin, label: 'Adresse', value: '12 route Victoire, Bourg Palette, 91000 Évry' },
  { icon: IconPhone, label: 'Téléphone', value: '01 23 45 67 89' },
  { icon: IconClock, label: 'Horaires', value: 'Tous les jours, 11h30 – 14h30 et 18h30 – 22h30' },
]

function Contact() {
  const [isSent, setIsSent] = useState(false)

  const handleSubmit = (event) => {
    event.preventDefault()
    setIsSent(true)
    event.target.reset()
  }

  return (
    <section id="contact" className="bg-poke-yellow/20 py-20">
      <div className="container-xl grid gap-12 lg:grid-cols-2 lg:items-start">
        {/* Intro + practical information */}
        <div>
          <p className="mb-3 text-xs font-bold tracking-widest text-poke-blue uppercase">Contact</p>
          <h2 className="mb-4 font-display text-4xl leading-tight font-bold text-poke-navy md:text-5xl">
            Une question ?<br />
            Un plat vous fait craquer ?
          </h2>
          <p className="mb-8 max-w-lg text-lg text-slate-700">
            Écrivez-nous : on répond plus vite qu'un Pikachu qui lance Vive-Attaque. Pour une table, un menu de
            groupe ou une idée de plat, c'est ici.
          </p>

          <ul className="mb-8 grid gap-4">
            {infos.map((info) => (
              <li key={info.label} className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm">
                <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-poke-yellow/40 text-poke-navy">
                  <info.icon />
                </span>
                <div>
                  <p className="mb-0 text-xs font-bold tracking-wide text-slate-500 uppercase">{info.label}</p>
                  <p className="mb-0 font-semibold text-slate-800">{info.value}</p>
                </div>
              </li>
            ))}
          </ul>

          <ul className="flex flex-wrap gap-3 text-sm font-semibold text-slate-600">
            <li className="rounded-full bg-white px-4 py-2 shadow-sm">Sur place</li>
            <li className="rounded-full bg-white px-4 py-2 shadow-sm">À emporter</li>
            <li className="rounded-full bg-white px-4 py-2 shadow-sm">Livraison par Roucool</li>
          </ul>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 shadow-xl md:p-10">
          <h3 className="mb-6 font-display text-2xl font-bold text-poke-navy">Envoyez-nous un message</h3>
          <div className="mb-5">
            <label htmlFor="contact-name" className="mb-2 block text-sm font-bold text-poke-navy">
              Nom
            </label>
            <input id="contact-name" name="name" type="text" className={inputClasses} placeholder="Sacha Ketchum" required />
          </div>
          <div className="mb-5">
            <label htmlFor="contact-email" className="mb-2 block text-sm font-bold text-poke-navy">
              Email
            </label>
            <input id="contact-email" name="email" type="email" className={inputClasses} placeholder="sacha@bourg-palette.fr" required />
          </div>
          <div className="mb-6">
            <label htmlFor="contact-message" className="mb-2 block text-sm font-bold text-poke-navy">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows="4"
              className={inputClasses}
              placeholder="Une table pour 4 dresseurs samedi soir ?"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full rounded-full bg-poke-blue px-6 py-4 text-lg font-bold text-white shadow-lg shadow-poke-blue/30 transition hover:-translate-y-0.5 hover:bg-poke-navy"
          >
            Envoyer mon message
          </button>
          <p className="mt-4 mb-0 text-center text-xs text-slate-500">
            Formulaire de démonstration : aucun message n'est réellement envoyé.
          </p>
          {isSent && (
            <p className="mt-4 mb-0 rounded-xl bg-green-50 px-4 py-3 text-sm font-semibold text-green-700" role="status">
              Merci ! Votre message a bien été pris en compte (démonstration).
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
