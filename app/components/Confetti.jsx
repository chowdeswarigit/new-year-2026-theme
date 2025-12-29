'use client';

import { useEffect, useState } from 'react';

const COLORS = ['#fde68a', '#f9a8d4', '#93c5fd', '#5eead4'];

export default function Confetti() {
  const [lights, setLights] = useState([]);

  useEffect(() => {
    const items = Array.from({ length: 14 }).map((_, i) => ({
      id: i,
      left: 5 + i * 7,
      color: COLORS[i % COLORS.length],
      delay: Math.random() * 2,
    }));

    setLights(items);
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 left-0 w-full h-24 z-20 overflow-hidden">
      {lights.map((l) => (
        <div
          key={l.id}
          className="light-wire"
          style={{ left: `${l.left}%` }}
        >
          <span
            className="light-bulb"
            style={{
              backgroundColor: l.color,
              boxShadow: `0 0 12px ${l.color}`,
              animationDelay: `${l.delay}s`,
            }}
          />
        </div>
      ))}
    </div>
  );
}
