import { forwardRef } from 'react';

/**
 * Eyebrow — small uppercase label that sits above a section headline.
 * Composes the .text-eyebrow utility class (typography.css) so every
 * eyebrow in the system shares one source of truth for font / size /
 * weight / line-height / letter-spacing / transform.
 *
 * Patterns can still pass a className to layer on local concerns
 * (color override, margin, animation) — pattern CSS is loaded after
 * the global utility, so those overrides win.
 *
 * Props:
 *   tone — 'default' (ink-subtle) | 'on-dark' (white)
 *   as   — element type (default 'p')
 *
 * Usage:
 *   <Eyebrow>Why Therefore</Eyebrow>
 *   <Eyebrow tone="on-dark">We're ready when you are</Eyebrow>
 *   <Eyebrow className="cs-label" ref={labelRef}>Case Study</Eyebrow>
 */
const Eyebrow = forwardRef(function Eyebrow(
  { children, tone = 'default', as: Tag = 'p', className = '', ...rest },
  ref
) {
  const toneClass = tone === 'on-dark' ? 'text-on-dark' : '';
  return (
    <Tag ref={ref} className={`text-eyebrow ${toneClass} ${className}`.trim().replace(/\s+/g, ' ')} {...rest}>
      {children}
    </Tag>
  );
});

export default Eyebrow;
