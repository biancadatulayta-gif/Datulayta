import { Link } from 'react-router-dom'
import { profile } from '../data/content.js'

const links = [
  { to: '/#about', label: 'About' },
  { to: '/#projects', label: 'Projects' },
  { to: '/#contact', label: 'Contact' },
]

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">{profile.firstName}</Link>
        <nav aria-label="Main">
          <ul className="nav__list">
            {links.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="nav__link">{l.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
