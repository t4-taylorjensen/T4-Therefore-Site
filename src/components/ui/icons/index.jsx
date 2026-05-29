/* ─────────────────────────────────────────
   ICONS
   All icons use stroke="currentColor" so callers
   control color via CSS (color: ...) on the parent.
───────────────────────────────────────── */

/** Straight right arrow → · Hero CTA, nav next */
export function IconArrowRight(props) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M15.3599 6.38867L7.67986 6.38867C3.64748 6.38867 0 6.38867 0 6.38867M15.3599 6.38867L9.35986 12.3887M15.3599 6.38867L9.35986 0.388672"
        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Left arrow ← · nav prev (mirrored right arrow) */
export function IconArrowLeft(props) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
      aria-hidden="true" style={{ transform: 'scaleX(-1)' }} {...props}>
      <path
        d="M15.3599 6.38867L7.67986 6.38867C3.64748 6.38867 0 6.38867 0 6.38867M15.3599 6.38867L9.35986 12.3887M15.3599 6.38867L9.35986 0.388672"
        stroke="currentColor" strokeWidth="1.1" strokeLinejoin="round"
      />
    </svg>
  );
}

/** L-corner turning down-right · Case Study CTA, FeatureStack pill */
export function IconCornerDownRight(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M12.9333 9.4679L8.66658 9.4679C6.42637 9.4679 4.39999 9.4679 4.39999 9.4679L4.39999 3.2002M12.9333 9.4679L9.59992 6.13457M12.9333 9.4679L9.59992 12.8012"
        stroke="currentColor"
      />
    </svg>
  );
}

/** Diagonal arrow ↗ · Nav overlay active link */
export function IconArrowDiagonal(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" {...props}>
      <path
        d="M12.9336 9.46772L8.66698 9.46772C6.42677 9.46772 4.40039 9.46772 4.40039 9.46772L4.40039 3.20001M12.9336 9.46772L9.60031 6.13439M12.9336 9.46772L9.60031 12.8011"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** L-corner turning right-down · Footer CTA, download */
export function IconCornerRightArrow(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" {...props}>
      <path
        transform="rotate(90 8 8)"
        d="M12.9333 6.53234L8.66658 6.53234C6.42637 6.53234 4.39999 6.53234 4.39999 6.53234L4.39999 12.8M12.9333 6.53234L9.59992 9.86567M12.9333 6.53234L9.59992 3.19901"
        stroke="currentColor"
      />
    </svg>
  );
}
