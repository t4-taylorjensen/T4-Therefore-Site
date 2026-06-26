import { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react';
import './PageTransition.css';

/* Duration of each half of the sweep (cover, then reveal), in ms.
   Keep in sync with the transition duration in PageTransition.css. */
export const WIPE_MS = 600;

/* ─────────────────────────────────────────
   PAGE TRANSITION — vertical curtain wipe
   A solid panel sweeps upward: it enters from the
   bottom to cover the screen, then continues up and
   off the top to reveal the (new) page. One
   continuous upward motion.

   • imperative play(onCovered) — for "navigation":
     covers, fires onCovered at the midpoint (swap
     your content there), then reveals.
   • enterOnMount — plays just the reveal half on
     mount, as a page-entrance animation.
───────────────────────────────────────── */
const PageTransition = forwardRef(function PageTransition({ enterOnMount = false, color }, ref) {
  const [phase, setPhase] = useState('idle'); // idle | cover | reveal | hold
  const timers = useRef([]);

  const clear = () => { timers.current.forEach(clearTimeout); timers.current = []; };

  const play = useCallback((onCovered) => {
    clear();
    setPhase('cover');
    timers.current.push(setTimeout(() => {
      if (onCovered) onCovered();
      setPhase('reveal');
    }, WIPE_MS));
    timers.current.push(setTimeout(() => setPhase('idle'), WIPE_MS * 2));
  }, []);

  useImperativeHandle(ref, () => ({ play }), [play]);

  /* entrance: start fully covering, then reveal upward on the next frame */
  useEffect(() => {
    if (!enterOnMount) return undefined;
    setPhase('hold');
    const raf = requestAnimationFrame(() => setPhase('reveal'));
    const t = setTimeout(() => setPhase('idle'), WIPE_MS + 60);
    return () => { cancelAnimationFrame(raf); clearTimeout(t); };
  }, [enterOnMount]);

  useEffect(() => clear, []);

  return (
    <div
      className={`page-wipe page-wipe--${phase}`}
      style={color ? { background: color } : undefined}
      aria-hidden="true"
    />
  );
});

export default PageTransition;
