'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function Hero() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const signRef = useRef(null);
  const buttonRef = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial hidden state
      gsap.set([signRef.current, buttonRef.current], {
        opacity: 0,
        y: 20,
      });

      // Entrance animation for title + text
      gsap.from([titleRef.current, textRef.current], {
        y: 120,
        opacity: 0,
        stagger: 0.25,
        duration: 1.2,
        ease: 'power4.out',
      });

      // Typewriter effect
      const message =
        'May the New Year bring you peace, success, and countless reasons to smile. Wishing you a truly wonderful year ahead.';
      let i = 0;

      textRef.current.textContent = '';

      const typing = setInterval(() => {
        if (i < message.length) {
          textRef.current.textContent += message.charAt(i);
          i++;
        } else {
          clearInterval(typing);

          // Hide cursor
          gsap.to(cursorRef.current, { opacity: 0, duration: 0.3 });

          // Show signature
          gsap.to(signRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: 'power2.out',
            delay: 0.3,
          });

          // Show button after signature
          gsap.to(buttonRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power3.out',
            delay: 0.6,
          });
        }
      }, 35);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
    
      ref={sectionRef}
      className="relative z-30 h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden text-white"
    >
      {/* Background layers */}
      <div className="absolute inset-0 animated-gradient -z-10" aria-hidden />
      <div className="absolute inset-0 sparkle -z-10" aria-hidden />

      {/* Title */}
    <h1
  ref={titleRef}
  className="hero-title text-5xl md:text-7xl font-extrabold tracking-tight title-gradient hero-glow blink-soft"
>
  <span className="inline-block mr-3">Happy</span>
  <span className="inline-block mr-3">New</span>
  <span className="inline-block">Year</span>
  <span className="inline-block ml-3">2026</span>
</h1>



      {/* Message */}
      <p className="mt-6 text-lg md:text-xl max-w-xl leading-relaxed">
        <span ref={textRef} />
        <span ref={cursorRef} className="inline-block ml-1 animate-pulse">
          |
        </span>
      </p>

      {/* Signature (appears after typing) */}
      <span
        ref={signRef}
        className="mt-4 text-base opacity-80 tracking-wide"
      >
        — Chowdeswari
      </span>

      {/* Button (appears last) */}
      <button
        ref={buttonRef}
        onClick={() =>
          window.dispatchEvent(
            new CustomEvent('blast', {
              detail: {
                x: window.innerWidth / 2,
                y: window.innerHeight / 3,
              },
            })
          )
        }
        className="mt-10 px-7 py-3 rounded-md bg-gradient-to-r from-yellow-400 to-pink-500 text-black font-semibold shadow-xl transform hover:scale-105 transition"
      >
        Celebrate 🎆
      </button>
    </section>
  );
}
