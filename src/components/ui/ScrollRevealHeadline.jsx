import { useEffect, useRef } from 'react';
import './ScrollRevealHeadline.css';

/**
 * ScrollRevealHeadline
 *
 * Big section headline whose words fade in (left → right) as the
 * element enters the viewport. Each word is rendered as a relatively-
 * positioned wrapper containing a dim "ghost" copy and an absolutely-
 * positioned "reveal" copy whose opacity is driven by the scroll
 * position.
 *
 * Originally implemented inline three times across patterns
 * (WhyTherefore, HeroStack, FeatureStack). Centralizing it here keeps
 * the logic in one place and (importantly) keeps the rAF loop inside
 * a single useEffect — safe for SSR / Next.js since useEffect is
 * client-only and we guard window.matchMedia accordingly.
 *
 * Props:
 *   text       — required. The dark/leading copy.
 *   mutedText  — optional. Continuation rendered at muted ink color.
 *   as         — element type (default 'h2').
 *   className  — extra classes (e.g. wt-headline) so patterns can
 *                control sizing/spacing without re-implementing the
 *                reveal markup.
 *
 * Punctuation note: tokens that start with a punctuation mark
 * (",.;:!?") are merged onto the preceding word so commas don't drift
 * to the next line.
 */
function tokenize(text) {
  return text.split(' ').filter(Boolean).reduce((acc, w) => {
    if (/^[,\.;:!?]/.test(w) && acc.length > 0) { acc[acc.length - 1] += w; }
    else acc.push(w);
    return acc;
  }, []);
}

export default function ScrollRevealHeadline({
  text,
  mutedText = '',
  as: Tag = 'h2',
  className = '',
  ...rest
}) {
  const ref = useRef(null);

  const darkCount  = tokenize(text).length;
  const fullTokens = tokenize(mutedText ? `${text} ${mutedText}` : text);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reveals = Array.from(el.querySelectorAll('.word-reveal'));
    const n = reveals.length;
    if (n === 0) return;

    // Reduced motion: show every word fully and skip the rAF loop.
    if (typeof window !== 'undefined'
        && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      reveals.forEach(s => { s.style.opacity = '1'; });
      return;
    }

    let rafId;
    const update = () => {
      const rect = el.getBoundingClientRect();
      const vh   = window.innerHeight;
      // Map "section top entering 90% of viewport" → "section top at 25%"
      // onto a 0..1 progress value, then divide that across n words.
      const progress = Math.min(1, Math.max(0,
        (0.9 * vh - rect.top) / (0.65 * vh)
      ));
      reveals.forEach((span, i) => {
        const start = i / n;
        const end   = start + 1 / n;
        const opacity = Math.min(1, Math.max(0, (progress - start) / (end - start)));
        span.style.opacity = opacity;
      });
      rafId = requestAnimationFrame(update);
    };

    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, [text, mutedText]);

  return (
    <Tag ref={ref} className={`scroll-reveal-headline ${className}`.trim()} {...rest}>
      {fullTokens.map((word, i) => (
        <span key={i} className="word-wrap">
          <span className="word-ghost" aria-hidden="true">{word}</span>
          <span
            className={`word-reveal${i >= darkCount ? ' word-reveal--muted' : ''}`}
            data-word={i}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  );
}
