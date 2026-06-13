import { useMemo } from "react";

const COLORS = ["#f8fafc", "#e2dff0", "#8b5cf6", "#f0c94b", "#60a5fa"];

function seededRandom(seed) {
  let s = seed;
  return function () {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

export default function Stars({ count = 80 }) {
  const stars = useMemo(() => {
    const rng = seededRandom(42);
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: rng() * 100,
      top: rng() * 100,
      size: rng() * 2.5 + 1,
      duration: rng() * 4 + 2,
      delay: rng() * 5,
      color: COLORS[Math.floor(rng() * COLORS.length)],
    }));
  }, [count]);

  return (
    <div className="stars-container" aria-hidden="true">
      {stars.map((s) => (
        <div
          key={s.id}
          className="star"
          style={{
            left: `${s.left}%`,
            top: `${s.top}%`,
            width: `${s.size}px`,
            height: `${s.size}px`,
            "--duration": `${s.duration}s`,
            animationDelay: `${s.delay}s`,
            backgroundColor: s.color,
          }}
        />
      ))}
    </div>
  );
}
