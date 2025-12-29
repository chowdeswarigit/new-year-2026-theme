'use client';

import { useEffect, useState } from 'react';

export default function Countdown() {
  const [time, setTime] = useState({});
  const [pulse, setPulse] = useState(0);

  useEffect(() => {
    const target = new Date('2025-12-29T17:00:00');

    const timer = setInterval(() => {
      const now = new Date();
      const diff = target - now;

      setTime({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor(diff / (1000 * 60 * 60)) % 24,
        minutes: Math.floor(diff / (1000 * 60)) % 60,
        seconds: Math.floor(diff / 1000) % 60,
      });
      setPulse((p) => p + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="py-20 text-center">
      {/* <h2 className="text-4xl mb-6">⏳ Countdown</h2> */}
      <div className="flex justify-center gap-6 text-2xl">
        {Object.entries(time).map(([k, v], idx) => (
          <div key={k} className="count-card text-center">
            <div className={`text-xl count-number ${pulse % 2 === idx % 2 ? 'pop' : ''}`}>{v}</div>
            <div className="uppercase text-sm text-gray-400 mt-2">{k}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
