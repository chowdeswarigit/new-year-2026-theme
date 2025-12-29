'use client';

import { useEffect, useState } from 'react';

export default function HangingStars() {
  const STAR_DESKTOP = [8, 18, 28, 38, 50, 62, 72, 82, 92];
  const STAR_MOBILE = [20, 50, 80];

  const [positions, setPositions] = useState(STAR_DESKTOP);
  const [sparkle, setSparkle] = useState(false);

  // Handle responsive star count
  useEffect(() => {
    const update = () => {
      setPositions(window.innerWidth <= 768 ? STAR_MOBILE : STAR_DESKTOP);
    };

    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Sparkle when Celebrate / Fireworks happen
  useEffect(() => {
    const onBlast = () => {
      setSparkle(true);
      setTimeout(() => setSparkle(false), 1200);
    };

    window.addEventListener('blast', onBlast);
    return () => window.removeEventListener('blast', onBlast);
  }, []);

  return (
    <div className="hanging-lights pointer-events-none fixed top-0 left-0 w-full h-24 z-50 overflow-hidden">
      {positions.map((left, i) => (
        <div
          key={i}
          className="star-wire swing"
          style={{
            left: `${left}%`,
            animationDelay: `${i * 0.25}s`,
          }}
        >
          <span
            className={`hanging-star ${sparkle ? 'sparkle' : ''}`}
          />
        </div>
      ))}
    </div>
  );
}
