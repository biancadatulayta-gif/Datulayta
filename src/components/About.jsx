import { about, facts, profile } from '../data/content.js'
import Flower from './Flower.jsx'

export default function About() {
  return (
    <section className="section section--paper" id="about">
      <div className="container about">
        <div className="about__photo">
          <div className="about__frame">
            {profile.photo ? (
              <img src={profile.photo} alt={`Portrait of ${profile.name}`} width="400" height="400" />
            ) : (
              <span className="about__initial" aria-hidden="true">{profile.firstName.charAt(0)}</span>
            )}
          </div>
          <Flower className="about__sticker about__sticker--a" petals={7} petal="#6ee0ff" center="#2b3bff" />
          <Flower className="about__sticker about__sticker--b" petals={6} petal="#ff8fc7" center="#ffd84d" />
          <Flower className="about__sticker about__sticker--c" petals={5} petal="#ffd84d" center="#ff8fc7" />
        </div>

        <div className="about__text">
          <h2 className="section__title">About</h2>
          {about.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          <dl className="about__facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt>{f.label}</dt>
                <dd>{f.highlight ? <span className="mark">{f.value}</span> : f.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
