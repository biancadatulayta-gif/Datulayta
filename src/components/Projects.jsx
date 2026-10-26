import { useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import ProjectCard from './ProjectCard.jsx'
import { projects } from '../data/content.js'

export default function Projects() {
  const root = useRef(null)
  const preview = useRef(null)
  const [active, setActive] = useState(-1)
  const [last, setLast] = useState(0)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      // Mouse devices: the preview follows the cursor and tilts with its horizontal speed.
      mm.add('(hover: hover) and (pointer: fine)', () => {
        const box = preview.current
        gsap.set(box, { xPercent: -50, yPercent: -50 })
        const xTo = gsap.quickTo(box, 'x', { duration: 0.5, ease: 'power3' })
        const yTo = gsap.quickTo(box, 'y', { duration: 0.5, ease: 'power3' })
        const rTo = gsap.quickTo(box, 'rotation', { duration: 0.4, ease: 'power3' })
        const list = root.current.querySelector('.projects__list')
        let lastX = 0
        const move = (e) => {
          xTo(e.clientX)
          yTo(e.clientY)
          rTo(gsap.utils.clamp(-14, 14, (e.clientX - lastX) * 0.4))
          lastX = e.clientX
        }
        list.addEventListener('pointermove', move)
        return () => list.removeEventListener('pointermove', move)
      })

      // Rows that enter the viewport together are revealed together.
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        gsap.set('.project', { autoAlpha: 0, y: 40 })
        ScrollTrigger.batch('.project', {
          start: 'top 90%',
          once: true,
          onEnter: (batch) => gsap.to(batch, { autoAlpha: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
        })
      })

      return () => mm.revert()
    },
    { scope: root }
  )

  const enter = (i) => () => {
    setActive(i)
    setLast(i)
  }

  return (
    <section className="section section--ink" id="projects" ref={root}>
      <div className="container">
        <h2 className="section__title">Projects</h2>
        <div className={`projects__list${active >= 0 ? ' has-active' : ''}`}>
          {projects.map((p, i) => (
            <ProjectCard key={p.title} {...p} active={active === i} onEnter={enter(i)} onLeave={() => setActive(-1)} />
          ))}
        </div>
      </div>

      <div className={`preview${active >= 0 ? ' is-visible' : ''}`} ref={preview} aria-hidden="true">
        <img
          src={projects[last].image}
          alt=""
          onError={(e) => (e.currentTarget.style.visibility = 'hidden')}
          onLoad={(e) => (e.currentTarget.style.visibility = 'visible')}
        />
      </div>
    </section>
  )
}
