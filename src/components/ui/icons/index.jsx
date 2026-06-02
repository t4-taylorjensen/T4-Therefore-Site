/* ─────────────────────────────────────────
   ICONS
   All icons use stroke="currentColor" so callers
   control color via CSS (color: ...) on the parent.
   strokeWidth is scaled per viewBox so all render at 1px at 16×16.
───────────────────────────────────────── */

/** Straight right arrow → · decorative only, not for buttons */
export function IconArrowRight(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M6.99981 4L2.49977 4C0.13703 4 0 4 0 4M3.48416 7.47184L6.99981 4L3.48416 0.528153"
        stroke="currentColor" strokeWidth="0.667"
      />
    </svg>
  );
}

/** Left arrow ← · (unused — kept for reference) */
export function IconArrowLeft(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 8 8" fill="none"
      aria-hidden="true" style={{ transform: 'scaleX(-1)' }} {...props}>
      <path
        d="M6.99981 4L2.49977 4C0.13703 4 0 4 0 4M3.48416 7.47184L6.99981 4L3.48416 0.528153"
        stroke="currentColor" strokeWidth="0.667"
      />
    </svg>
  );
}

/** L-corner turning down-right · All CTAs, nav prev/next */
export function IconCornerDownRight(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M10.5 7.52816L5.99996 7.52815C3.63722 7.52815 1.5 7.52815 1.5 7.52815L1.5 1M6.98434 11L10.5 7.52816L6.98434 4.05631"
        stroke="currentColor" strokeWidth="1"
      />
    </svg>
  );
}

/** L-corner turning right-down · Footer CTA, download */
export function IconCornerRightArrow(props) {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M7.52816 10.5L7.52815 5.99996C7.52815 3.63722 7.52815 1.5 7.52815 1.5L1 1.5M11 6.98434L7.52816 10.5L4.05631 6.98434"
        stroke="currentColor" strokeWidth="1"
      />
    </svg>
  );
}
