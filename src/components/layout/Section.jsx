/**
 * Section — semantic <section> wrapper with optional background tone
 * and vertical rhythm. Drop-in for the repeating outer wrapper most
 * patterns currently re-implement.
 *
 * tone:
 *   page    — default page background (white)
 *   surface — section background (#f0f0ef)
 *   card    — card background (#f2f2f2)
 *   dark    — inverted dark surface (#121212)
 *
 * spacing:
 *   none    — no vertical padding
 *   md      — 60px top/bottom
 *   lg      — 90px top/bottom
 *   xl      — clamp(80px, 11vw, 160px) top/bottom (matches Figma)
 */
const TONE_TO_BG = {
  page:    'var(--color-bg-page)',
  surface: 'var(--color-bg-section)',
  card:    'var(--color-bg-card)',
  dark:    'var(--color-bg-dark)',
};

const SPACING_TO_PAD = {
  none: '0',
  md:   'var(--space-8) 0',
  lg:   'var(--space-10) 0',
  xl:   'clamp(80px, 11vw, 160px) 0',
};

export default function Section({
  tone = 'page',
  spacing = 'none',
  children,
  className = '',
  style,
  ...rest
}) {
  return (
    <section
      className={className}
      style={{
        background: TONE_TO_BG[tone],
        padding: SPACING_TO_PAD[spacing],
        ...style,
      }}
      {...rest}
    >
      {children}
    </section>
  );
}
