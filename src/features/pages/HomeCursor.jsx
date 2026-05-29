import { useEffect, useRef } from 'react';
import './HomeCursor.css';

export default function HomeCursor() {
  const cursorRef = useRef(null);
  const posRef    = useRef({ x: -100, y: -100 });
  const curRef    = useRef({ x: -100, y: -100 });
  const rafRef    = useRef(null);

  useEffect(() => {
    document.documentElement.classList.add('hp-cursor-active');

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };

      // Check interactivity on mousemove — stable, no rapid re-fire
      const el  = document.elementFromPoint(e.clientX, e.clientY);
      const hit = el?.closest('a, button, [role="button"]');
      cursorRef.current?.classList.toggle('is-hovering', !!hit);
    };

    const tick = () => {
      const p = posRef.current;
      const c = curRef.current;
      c.x += (p.x - c.x) * 0.18;
      c.y += (p.y - c.y) * 0.18;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${c.x}px,${c.y}px)`;
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove('hp-cursor-active');
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return <div ref={cursorRef} className="hp-cursor" aria-hidden="true" />;
}
