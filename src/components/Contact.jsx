import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { profile } from '../data/content.js'

const WORDS = ["Let's work together", "Let's work together", "Let's work together", "Let's work together"]

function Arrow({ className }) {
  return (
    <svg className={`cv__arrow ${className}`} viewBox="0 0 100 40" aria-hidden="true">
      <path d="M3 22 C 30 8, 62 8, 92 20 M74 6 L93 20 L72 33" />
    </svg>
  )
}

export default function Contact() {
  const root = useRef(null)

  // Endless marquee. The track holds two identical groups, so moving it -50% loops seamlessly.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.to('.marquee__track', { xPercent: -50, duration: 24, ease: 'none', repeat: -1 })
      })
      return () => mm.revert()
    },
    { scope: root }
  )

  return (
    <section className="contact" id="contact" ref={root}>
      <h2 className="sr-only">Contact</h2>
      <div className="marquee" aria-hidden="true">
        <div className="marquee__track">
          {[0, 1].map((g) => (
            <span className="marquee__group" key={g}>
              {WORDS.map((w, i) => (
                <span key={i}>{w} <span className="marquee__star">✦</span> </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <div className="container contact__body">
        <p className="contact__lead">
          Have a project, an internship, or feedback on my work? Send me a message.
        </p>

        {profile.cv && (
          <a className="cv" href={profile.cv} download>
            <span className="cv__small">Download</span>
            <span className="cv__big">CV</span>
            <Arrow className="cv__arrow--a" />
            <Arrow className="cv__arrow--b" />
            <Arrow className="cv__arrow--c" />
            <Arrow className="cv__arrow--d" />
          </a>
        )}

        <ul className="contact__list">
          <li><a className="pill" href={`mailto:${profile.email}`}>Email</a></li>
          <li><a className="pill" href={profile.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
          <li><a className="pill" href={profile.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
        </ul>
        <p className="contact__address">{profile.email}</p>
      </div>
    </section>
  )
}
