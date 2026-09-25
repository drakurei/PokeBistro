import { DEMO_NOTICE, getReviews, sourceLabels } from '../../data/reviews'
import { reviewsSection } from '../../data/content'
import cn from '../../utils/cn'
import { IconInfo, IconStar } from '../ui/Icons'
import Reveal from '../motion/Reveal'

const dateFormatter = new Intl.DateTimeFormat('fr-FR', { month: 'long', year: 'numeric' })

// Five stars, announced as one image ("4 sur 5"), never as five decorative icons
export function Stars({ rating, size = 16, className }) {
  const rounded = Math.round(rating)
  return (
    <span
      role="img"
      aria-label={`Note : ${rating} sur 5`}
      className={cn('inline-flex items-center gap-0.5 text-gold', className)}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <IconStar
          key={star}
          size={size}
          filled={star <= rounded}
          className={star <= rounded ? '' : 'opacity-30'}
          aria-hidden="true"
        />
      ))}
    </span>
  )
}

// Customer voices. The content is demonstration material and is labelled as such on the page;
// the section reads from getReviews() so a real source (a first-party form, a Google Business
// Profile read through a backend proxy) can replace it without touching this component.
export default function ReviewsSection() {
  const reviews = getReviews()

  return (
    <section aria-labelledby="reviews-title" className="bg-washi py-section">
      <div className="container-pb">
        <Reveal className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-xl">
            <p className="font-mono text-xs tracking-[0.18em] text-lacquer uppercase">
              {reviewsSection.eyebrow}
            </p>
            <h2 id="reviews-title" className="mt-4 font-display text-display-lg text-balance">
              {reviewsSection.title}
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-display text-[clamp(2.5rem,4vw,3.5rem)] leading-none font-bold">
              {reviews.rating.toFixed(1)}
            </span>
            <div>
              <Stars rating={reviews.rating} size={18} />
              <p className="mt-1 font-mono text-xs text-ink-mute">
                {reviews.count} témoignages · {sourceLabels[reviews.source]}
              </p>
            </div>
          </div>
        </Reveal>

        {reviews.source === 'demo' && (
          <p
            role="note"
            className="mt-8 inline-flex items-center gap-2 rounded-full border border-ink/15 bg-porcelain px-4 py-2 font-mono text-xs tracking-[0.08em] text-ink-soft uppercase"
          >
            <IconInfo size={16} className="shrink-0 text-lacquer" />
            {DEMO_NOTICE}
          </p>
        )}

        <ul className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {reviews.items.map((review, index) => (
            <Reveal as="li" key={review.id} delay={(index % 3) * 0.08}>
              <article className="flex h-full flex-col gap-4 rounded-(--radius-md) bg-porcelain p-6">
                <div className="flex items-center gap-3">
                  <span
                    aria-hidden="true"
                    className="flex size-11 items-center justify-center rounded-full bg-ink font-mono text-sm text-porcelain"
                  >
                    {review.initials}
                  </span>
                  <div className="min-w-0">
                    <p className="font-bold">{review.author}</p>
                    <p className="font-mono text-xs text-ink-mute">
                      {dateFormatter.format(new Date(`${review.date}T12:00:00`))} ·{' '}
                      {sourceLabels[reviews.source].toLowerCase()}
                    </p>
                  </div>
                  <Stars rating={review.rating} className="ml-auto" />
                </div>
                <p className="text-ink-soft">{review.text}</p>
                <p className="mt-auto font-mono text-[11px] tracking-[0.12em] text-ink-mute uppercase">
                  À propos de {review.dish}
                </p>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
