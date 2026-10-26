import { profile } from '../data/content.js'
import { GitHubIcon, LinkedInIcon, MailIcon } from './Icons.jsx'
import Flower from './Flower.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__scallop" aria-hidden="true" />
      <div className="footer__body">
        <Flower className="footer__flower footer__flower--a" petals={7} petal="#ff8fc7" center="#6ee0ff" />
        <Flower className="footer__flower footer__flower--b" petals={6} petal="#ffd84d" center="#ff8fc7" />
        <div className="container footer__inner">
          <p>{profile.firstName}'s portfolio</p>
          <ul className="footer__social">
            <li><a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a></li>
            <li><a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a></li>
            <li><a href={`mailto:${profile.email}`} aria-label="Email"><MailIcon /></a></li>
          </ul>
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
