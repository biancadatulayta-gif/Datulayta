// A drawn flower. Petal count, petal color and center color are props.
export default function Flower({ petals = 6, petal = '#ffd84d', center = '#2b3bff', className = '', style, ...rest }) {
  const rx = Math.min(14, 90 / petals)
  return (
    <svg viewBox="0 0 100 100" className={`flower ${className}`} style={style} aria-hidden="true" focusable="false" {...rest}>
      {Array.from({ length: petals }, (_, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="27"
          rx={rx}
          ry="23"
          transform={`rotate(${(360 / petals) * i} 50 50)`}
          fill={petal}
          stroke="#0f1226"
          strokeWidth="3"
        />
      ))}
      <circle cx="50" cy="50" r="13" fill={center} stroke="#0f1226" strokeWidth="3" />
    </svg>
  )
}
