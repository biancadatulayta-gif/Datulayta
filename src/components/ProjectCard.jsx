// One row of the project index. On devices with a mouse, hovering a row shows a floating
// preview (see Projects.jsx). On touch devices the screenshot is shown inline instead.
export default function ProjectCard({ title, description, tech, image, repo, demo, active, onEnter, onLeave }) {
  return (
    <article className={`project${active ? ' is-active' : ''}`} onPointerEnter={onEnter} onPointerLeave={onLeave}>
      <h3 className="project__title">
        <a href={demo} target="_blank" rel="noopener noreferrer">{title}</a>
      </h3>
      <div className="project__info">
        <p className="project__desc">{description}</p>
        <ul className="project__tech" aria-label="Technologies used">
          {tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="project__links">
          <a href={demo} target="_blank" rel="noopener noreferrer">Live demo</a>
          <a href={repo} target="_blank" rel="noopener noreferrer">GitHub repo</a>
        </p>
      </div>
      <img
        className="project__thumb"
        src={image}
        alt={`Screenshot of ${title}`}
        loading="lazy"
        width="640"
        height="400"
        onError={(e) => (e.currentTarget.style.display = 'none')}
      />
    </article>
  )
}
