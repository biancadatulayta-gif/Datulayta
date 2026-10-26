import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="section section--paper">
      <div className="container notfound">
        <h1 className="section__title">Page not found</h1>
        <p>That address doesn't exist on this site.</p>
        <Link className="btn btn--solid" to="/">Back to home</Link>
      </div>
    </section>
  )
}
