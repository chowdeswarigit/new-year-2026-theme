"use client";

import { useState } from 'react';

export default function RobotGifter() {
  const [message, setMessage] = useState('Wishing you a joyful 2026!');
  const [gave, setGave] = useState(false);

  function blastCrackers() {
    // trigger confetti and fireworks
    window.dispatchEvent(new CustomEvent('blast', { detail: { count: 180 } }));
    setMessage('Boom! Happy New Year 🎆');
    setTimeout(() => setMessage('Wishing you a joyful 2026!'), 3000);
  }

  function giveSweets() {
    // smaller confetti and a sweet message
    window.dispatchEvent(new CustomEvent('blast', { detail: { count: 40 } }));
    setGave(true);
    setMessage('Here are sweets and warm wishes 🍬');
    setTimeout(() => setMessage('May the year bring you joy ✨'), 3500);
  }

  return (
    <section className="min-h-screen flex flex-col items-center justify-center glass px-6 relative">
      <div className="flex flex-col items-center">
        <div className="robot w-40 h-40 mb-6 flex items-center justify-center text-6xl">🤖</div>
        <h3 className="text-3xl font-bold">Your Friendly Robo-Gifter</h3>
        <p className="mt-3 text-center text-gray-200 max-w-md">{message}</p>

        <div className="mt-6 flex gap-4">
          <button onClick={giveSweets} className="px-4 py-2 rounded-md bg-yellow-400 text-black font-semibold shadow-md">Give Sweets</button>
          <button onClick={blastCrackers} className="px-4 py-2 rounded-md bg-pink-500 text-white font-semibold shadow-md">Blast Crackers</button>
        </div>

        {gave && (
          <div className="mt-6 flex gap-3">
            <div className="gift animate-gift">🎁</div>
            <div className="gift animate-gift delay-200">🍫</div>
            <div className="gift animate-gift delay-400">🍬</div>
          </div>
        )}
      </div>
    </section>
  );
}
