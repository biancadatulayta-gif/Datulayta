import { useMemo, useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/content.js'
import Flower from './Flower.jsx'

const COLORS = ['#ffd84d', '#cdbcff', '#ff8fc7', '#6ee0ff', '#7d89ff', '#ffffff']

// Small seeded random so the flowers land in the same places on every load.
function seeded(seed) {
  return () => {
    seed |= 0
    seed = (seed + 0x6d2b79f5) | 0
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function makeFlowers(count) {
  const rand = seeded(11)
  const list = []
  let guard = 0
  while (list.length < count && guard++ < 800) {
    const x = rand() * 100
    const y = rand() * 100
    // Keep the middle clear so the name stays readable.
    if (Math.abs(x - 50) < 38 && y > 26 && y < 74) continue
    const pick = Math.floor(rand() * COLORS.length)
    list.push({
      x,
      y,
      size: 3 + Math.pow(rand(), 1.6) * 9,
      petals: 5 + Math.floor(rand() * 5),
      petal: COLORS[pick],
      center: COLORS[(pick + 2 + Math.floor(rand() * 3)) % COLORS.length],
      rot: Math.round(rand() * 360),
    })
  }
  return list
}

export default function Hero() {
  const root = useRef(null)
  const flowers = useMemo(() => makeFlowers(26), [])
  const [first, ...rest] = profile.name.split(' ')
  const lines = [first, rest.join(' ')]

  useGSAP(
    () => {
      gsap.utils.toArray('.flower-wrap svg').forEach((el) => gsap.set(el, { rotation: Number(el.dataset.rot) }))

      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.from('.flower-wrap svg', {
          scale: 0,
          rotation: '-=120',
          duration: 0.9,
          ease: 'back.out(1.7)',
          stagger: { each: 0.04, from: 'random' },
        })
          .from('.hero__char', { yPercent: 115, duration: 0.8, stagger: 0.04 }, '-=0.6')
          .from('.hero__avatar', { autoAlpha: 0, scale: 0.8, duration: 0.6 }, '<')
          .from('.hero__tagline, .hero__hint, .hero__actions', { autoAlpha: 0, y: 14, duration: 0.6, stagger: 0.1 }, '-=0.3')
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  // Touching a flower makes it pop and spin.
  const touch = (e) => {
    const el = e.currentTarget.firstChild
    gsap.killTweensOf(el)
    gsap
      .timeline()
      .to(el, { scale: 1.25, duration: 0.18, ease: 'power2.out' })
      .to(el, { scale: 1, rotation: '+=160', duration: 1.1, ease: 'elastic.out(1, 0.4)' }, '<0.1')
  }

  return (
    <section className="hero" ref={root}>
      <div className="hero__flowers">
        {flowers.map((f, i) => (
          <span
            className="flower-wrap"
            key={i}
            onPointerEnter={touch}
            onPointerDown={touch}
            style={{
              left: `${f.x}%`,
              top: `${f.y}%`,
              width: `${f.size}em`,
              height: `${f.size}em`,
              marginLeft: `${-f.size / 2}em`,
              marginTop: `${-f.size / 2}em`,
            }}
          >
            <Flower petals={f.petals} petal={f.petal} center={f.center} data-rot={f.rot} />
          </span>
        ))}
      </div>

      <div className="container hero__inner">
        <div className="hero__avatar">
          {profile.photo ? (
            <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="96" height="96" />
          ) : (
            <div className="hero__initial" role="img" aria-label={`Avatar for ${profile.name}`}>
              {profile.firstName.charAt(0)}
            </div>
          )}
        </div>

        <h1 className="hero__name" aria-label={profile.name}>
          {lines.map((line, li) => (
            <span className="hero__line" aria-hidden="true" key={li}>
              {line.split('').map((c, i) => (
                <span className="hero__mask" key={i}>
                  <span className="hero__char">{c}</span>
                </span>
              ))}
            </span>
          ))}
        </h1>

        <p className="hero__tagline">{profile.tagline}</p>
        <p className="hero__hint">(try touching the flowers)</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#projects">View my work</a>
          <a className="btn btn--ghost" href="#contact">Contact me</a>
        </div>
      </div>
    </section>
  )
}
