import { useMemo } from 'react'
import './AnimatedBackground.css'

const DONUT_EMOJI = '🍩'
const CLOUD_SHAPES = ['cloud-1', 'cloud-2', 'cloud-3']

function Donut({ style }) {
  return (
    <div className="donut" style={style} aria-hidden="true">
      {DONUT_EMOJI}
    </div>
  )
}

function Cloud({ className, style }) {
  return (
    <div className={`cloud ${className}`} style={style} aria-hidden="true">
      <div className="cloud-body" />
    </div>
  )
}

function GrassBlade({ style }) {
  return <div className="grass-blade" style={style} aria-hidden="true" />
}

export default function AnimatedBackground() {
  const donuts = useMemo(() =>
    Array.from({ length: 14 }, (_, i) => ({
      id: i,
      left: `${(i * 7.3 + 3) % 100}%`,
      animationDelay: `${(i * 1.1) % 7}s`,
      animationDuration: `${6 + (i % 5)}s`,
      fontSize: `${1.4 + (i % 3) * 0.6}rem`,
      opacity: 0.55 + (i % 3) * 0.15,
    })), [])

  const clouds = useMemo(() =>
    Array.from({ length: 6 }, (_, i) => ({
      id: i,
      top: `${8 + (i * 12) % 35}%`,
      animationDelay: `${i * 4}s`,
      animationDuration: `${22 + i * 5}s`,
      scale: 0.7 + (i % 3) * 0.3,
    })), [])

  const grasses = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${i * 3.4}%`,
      height: `${18 + (i % 5) * 8}px`,
      animationDelay: `${(i * 0.17) % 2}s`,
    })), [])

  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Sky gradient */}
      <div className="sky" />

      {/* Sun */}
      <div className="sun">
        <div className="sun-face">
          <span className="sun-eyes">😎</span>
        </div>
      </div>

      {/* Clouds */}
      {clouds.map((c) => (
        <Cloud
          key={c.id}
          className={CLOUD_SHAPES[c.id % 3]}
          style={{
            top: c.top,
            animationDelay: `${c.animationDelay}s`,
            animationDuration: `${c.animationDuration}s`,
            transform: `scale(${c.scale})`,
          }}
        />
      ))}

      {/* Donuts falling */}
      {donuts.map((d) => (
        <Donut
          key={d.id}
          style={{
            left: d.left,
            animationDelay: d.animationDelay,
            animationDuration: d.animationDuration,
            fontSize: d.fontSize,
            opacity: d.opacity,
          }}
        />
      ))}

      {/* Springfield skyline silhouette */}
      <div className="skyline">
        <div className="building b1" />
        <div className="building b2" />
        <div className="building b3" />
        <div className="building b4 nuclear">
          <div className="cooling-tower" />
          <div className="cooling-tower" />
        </div>
        <div className="building b5" />
        <div className="building b6" />
      </div>

      {/* Ground */}
      <div className="ground">
        <div className="grass-row">
          {grasses.map((g) => (
            <GrassBlade key={g.id} style={{ left: g.left, height: g.height, animationDelay: g.animationDelay }} />
          ))}
        </div>
      </div>
    </div>
  )
}
