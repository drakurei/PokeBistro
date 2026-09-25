import Seo from '../components/layout/Seo'
import { BeltMarquee } from '../components/layout/Belt'
import Hero from '../components/home/Hero'
import TypesSection from '../components/home/TypesSection'
import SignatureDishes from '../components/home/SignatureDishes'
import StoryTeaser from '../components/home/StoryTeaser'
import ReservationCta from '../components/home/ReservationCta'
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
      <Seo path="/" />
      <Hero />
      <BeltMarquee items={marqueeItems} />
      <TypesSection />
      <SignatureDishes />
      <StoryTeaser />
      <ReservationCta />
    </>
  )
}
