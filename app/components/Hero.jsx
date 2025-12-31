'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const signRef = useRef(null);
  const buttonRef = useRef(null);
  const cursorRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // ✅ CONFETTI OUTSIDE useEffect
  const handleBlast = () => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1000 };
    const colors = ['#FFD700', '#ffffff', '#C0C0C0', '#FFA500'];

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();
      if (timeLeft <= 0) return clearInterval(interval);

      const particleCount = 40 * (timeLeft / duration);
      // ✅ Change y:0 to y:0.5 for middle
      confetti({ ...defaults, particleCount, colors, origin: { x: 0.2, y: 0.5 } });
      confetti({ ...defaults, particleCount, colors, origin: { x: 0.8, y: 0.5 } });
    }, 250);
  };

  useEffect(() => {
    setMounted(true);

    const ctx = gsap.context(() => {
      gsap.set([signRef.current, buttonRef.current], { opacity: 0, y: 20 });

      gsap.from(titleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.4,
        ease: 'expo.out',
      });

      const message =
        'May the New Year bring you peace, success, and countless reasons to smile. Wishing you a truly wonderful year ahead.';
      let i = 0;
      textRef.current.textContent = '';

      const typing = setInterval(() => {
        if (!textRef.current) return clearInterval(typing);

        if (i < message.length) {
          textRef.current.textContent += message[i++];
        } else {
          clearInterval(typing);
          gsap.to(cursorRef.current, { opacity: 0 });
          gsap.to(signRef.current, { opacity: 0.7, y: 0, delay: 0.2 });
          gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            delay: 0.4,
            ease: 'back.out(1.7)',
          });
        }
      }, 35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-white overflow-hidden bg-black"
    >
      {/* BACKGROUND */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,_#1a0b2e_0%,_#000_70%)] z-0" />

      {/* ATMOSPHERE */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none z-10">
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-purple-600/20 rounded-full blur-[120px]" />
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px]" />

          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-white rounded-full animate-snow-fall"
              style={{
                top: '-10%',
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 2}px`,
                height: `${Math.random() * 3 + 2}px`,
                opacity: Math.random() * 0.6 + 0.3,
                animationDuration: `${Math.random() * 6 + 6}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            />
          ))}

          {[...Array(10)].map((_, i) => (
            <div
              key={`e-${i}`}
              className="absolute animate-snow-fall text-white/40 text-xl"
              style={{
                top: '-10%',
                left: `${Math.random() * 100}%`,
                animationDuration: `${Math.random() * 8 + 8}s`,
                animationDelay: `${Math.random() * 5}s`,
              }}
            >
              ❄️
            </div>
          ))}
        </div>
      )}

      {/* CONTENT */}
      <div className="relative z-20 text-center px-4">
        <h1 ref={titleRef}>
          <div className="text-sm tracking-[0.3em] text-gray-300 uppercase">
            Happy New Year
          </div>
          <div className="text-[18vw] sm:text-[12vw] font-black bg-gradient-to-b from-yellow-200 via-yellow-400 to-orange-500 bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(234,179,8,0.6)]">
            2026
          </div>
        </h1>

        <p className="mt-6 text-gray-300 italic max-w-xl mx-auto">
          <span ref={textRef} />
          <span
            ref={cursorRef}
            className="inline-block ml-1 w-[2px] h-[1em] bg-yellow-400 animate-pulse"
          />
        </p>

        <div className="mt-4 text-xs tracking-[0.4em] text-white-500" ref={signRef}>
          — Chowdeswari
        </div>

        <button
          ref={buttonRef}
          onClick={() => {
            handleBlast();
            gsap.fromTo(
              buttonRef.current,
              { scale: 1 },
              { scale: 1.15, yoyo: true, repeat: 1, duration: 0.25 }
            );
          }}
          className="mt-10 px-10 py-4 bg-white text-black rounded-full font-black tracking-widest shadow-xl"
        >
          Celebrate 🎆
        </button>
      </div>

      <style jsx global>{`
        @keyframes snow-fall {
          0% {
            transform: translateY(-10vh) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          100% {
            transform: translateY(110vh) translateX(40px);
            opacity: 0;
          }
        }
        .animate-snow-fall {
          animation: snow-fall linear infinite;
        }
      `}</style>
    </section>
  );
}
