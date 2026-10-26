import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

// Scroll-scrubbed: the two words slide in from opposite sides while a light disc rises
// behind them. The words use mix-blend-mode: difference, so they flip color over the disc.
export default function CrossText() {
  const root = useRef(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: 'top bottom',
            end: 'bottom 45%',
            scrub: 0.6,
            invalidateOnRefresh: true,
          },
        })
        tl.fromTo('.cross__disc', { y: () => root.current.offsetHeight }, { y: 0, ease: 'none' }, 0)
          .fromTo('.cross__a', { xPercent: -55 }, { xPercent: 0, ease: 'none' }, 0)
          .fromTo('.cross__b', { xPercent: 55 }, { xPercent: 0, ease: 'none' }, 0)
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section className="cross" ref={root} aria-label="Frontend developer">
      <div className="cross__disc" aria-hidden="true" />
      <p className="cross__word cross__a">Frontend</p>
      <p className="cross__word cross__b">Developer</p>
    </section>
  )
}
