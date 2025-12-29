'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section({ title, text, variant = 'fresh' }) {
  const ref = useRef(null);

  useEffect(() => {
    gsap.from(ref.current, {
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
      },
      y: 60,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    });
  }, []);

  return (
    <section
      ref={ref}
      className={`min-h-screen flex flex-col justify-center items-center px-8 section section-${variant}`}
    >
      <div className="section-content max-w-3xl text-center">
        <h2 className="text-4xl font-bold">{title}</h2>
        <p className="mt-4 max-w-xl text-center">{text}</p>
      </div>
      <div className="float-dot variant-1" aria-hidden />
      <div className="float-dot variant-2" aria-hidden />
      <div className="float-dot variant-3" aria-hidden />
    </section>
  );
}
