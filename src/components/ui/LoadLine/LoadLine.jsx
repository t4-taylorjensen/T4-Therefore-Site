import './LoadLine.css';

/* ─────────────────────────────────────────
   LoadLine — 1px progress hairline.
   `progress` is a 0→1 value (scroll position or auto-advance timer);
   the fill scales from left. Pass `tone="dark"` on dark sections.
───────────────────────────────────────── */
export default function LoadLine({ progress = 0, tone = 'light', className = '' }) {
  const toneClass = tone === 'dark' ? 'load-line--on-dark' : '';
  return (
    <div className={`load-line ${toneClass} ${className}`.trim().replace(/\s+/g, ' ')} aria-hidden="true">
      <span className="load-line-fill" style={{ transform: `scaleX(${progress})` }} />
    </div>
  );
}
