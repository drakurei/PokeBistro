import { BeltMarquee } from '../components/layout/Belt'
import Hero from '../components/home/Hero'
import TypesSection from '../components/home/TypesSection'
import SignatureDishes from '../components/home/SignatureDishes'
import DessertShowcase from '../components/home/DessertShowcase'
import StoryTeaser from '../components/home/StoryTeaser'
import ReservationCta from '../components/home/ReservationCta'
import ReviewsSection from '../components/home/ReviewsSection'
import { categories } from '../data/filters'

const marqueeItems = [
  ...categories.map((category) => category.label),
  'Fait maison',
  'Sur place',
  'À emporter',
]

export default function HomePage() {
  return (
    <>
      <Hero />
      <BeltMarquee items={marqueeItems} />
      <TypesSection />
      <SignatureDishes />
      <DessertShowcase />
      <StoryTeaser />
      <ReviewsSection />
      <ReservationCta />
    </>
  )
}
