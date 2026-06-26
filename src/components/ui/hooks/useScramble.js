import { useState, useEffect, useRef } from 'react';

const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ#%&*+=';

/**
 * useScramble — character-scramble reveal.
 *
 * Returns `text` resolved out of random noise over `frames` once `active`
 * becomes true; returns the plain text while inactive. This is the single
 * shared implementation behind:
 *   • ScrambleText (section eyebrows / tags, e.g. FAQ "(FAQS)")
 *   • the "(DISCOVER)" cursor labels in CaseStudiesGrid, RelatedContent
 *     and ContentCarousel
 *
 * Options: { frames = 14, interval = 32 (ms), delay = 0 (ms) }
 */
export default function useScramble(text, active, { frames = 14, interval = 32, delay = 0 } = {}) {
  const [display, setDisplay] = useState(text);
  const timeoutRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    clearInterval(intervalRef.current);

    if (!active) {
      setDisplay(text);
      return undefined;
    }

    timeoutRef.current = setTimeout(() => {
      let frame = 0;
      intervalRef.current = setInterval(() => {
        frame += 1;
        const revealCount = Math.floor((frame / frames) * text.length);
        let out = '';
        for (let i = 0; i < text.length; i += 1) {
          out += i < revealCount
            ? text[i]
            : SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
        }
        setDisplay(out);
        if (frame >= frames) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, interval);
    }, delay);

    return () => {
      clearTimeout(timeoutRef.current);
      clearInterval(intervalRef.current);
    };
  }, [text, active, frames, interval, delay]);

  return display;
}
