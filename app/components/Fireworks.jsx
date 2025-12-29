'use client';

import { useEffect, useRef } from 'react';

export default function Fireworks() {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const particlesRef = useRef([]);
  const manualBurstsRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;

    function resize() {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener('resize', resize);

    function spawnBurst(x, y) {
      const hue = Math.floor(Math.random() * 360);
      const count = 20 + Math.random() * 20;

      for (let i = 0; i < count; i++) {
        const angle = (Math.PI * 2 * i) / count;
        const speed = 1 + Math.random() * 3;

        particlesRef.current.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 70 + Math.random() * 30,
          age: 0,
          hue,
        });
      }
    }

    function loop() {
      // 🔑 fade with transparency (NO WHITE FILL)
      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = 'rgba(3,6,16,0.15)';
      ctx.fillRect(0, 0, canvas.width / dpr, canvas.height / dpr);

      if (Math.random() < 0.025) {
        spawnBurst(
          Math.random() * window.innerWidth,
          Math.random() * window.innerHeight * 0.6
        );
      }

      while (manualBurstsRef.current.length) {
        const b = manualBurstsRef.current.shift();
        spawnBurst(b.x, b.y);
      }

      const particles = particlesRef.current;
      ctx.globalCompositeOperation = 'lighter';

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vy += 0.02;
        p.x += p.vx;
        p.y += p.vy;
        p.age++;

        const alpha = 1 - p.age / p.life;
        ctx.fillStyle = `hsla(${p.hue},100%,60%,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();

        if (p.age > p.life) particles.splice(i, 1);
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  useEffect(() => {
    const onBlast = (e) => {
      const { x = innerWidth / 2, y = innerHeight / 3 } = e.detail || {};
      for (let i = 0; i < 4; i++) {
        setTimeout(() => {
          manualBurstsRef.current.push({
            x: x + (Math.random() - 0.5) * 200,
            y: y + (Math.random() - 0.5) * 120,
          });
        }, i * 120);
      }
    };

    window.addEventListener('blast', onBlast);
    return () => window.removeEventListener('blast', onBlast);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      role="fireworks"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
