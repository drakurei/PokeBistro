import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

// Registered once for the whole app. Components import { gsap, useGSAP, ScrollTrigger } from here.
gsap.registerPlugin(ScrollTrigger, useGSAP)

gsap.defaults({ ease: 'power3.out', duration: 0.6 })

// Shared motion tokens (mirror of the CSS variables, for GSAP timelines)
export const motion = {
  ease: 'power3.out',
  easeInOut: 'power2.inOut',
  fast: 0.15,
  base: 0.25,
  slow: 0.45,
  hero: 0.9,
  stagger: 0.04,
}

export const REDUCED = '(prefers-reduced-motion: reduce)'
export const FULL = '(prefers-reduced-motion: no-preference)'

export { gsap, useGSAP, ScrollTrigger }
