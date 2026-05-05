/**
 * Heading — composes the typography utility classes from typography.css.
 *
 * variant maps to the canonical heading scale:
 *   display — ABC Gravity X Compressed, 112px (Hero, CaseStudy)
 *   xl      — Roobert, clamp(40px,5vw,55px) (HeroStack, WhyTherefore, FAQ)
 *   lg      — Roobert, 42px (Stat numbers)
 *   md      — Roobert, 30px (Card titles, carousel titles)
 *
 * Usage:
 *   <Heading variant="xl">Frequently Asked Questions</Heading>
 *   <Heading variant="display" as="h1" tone="on-dark">DuVine</Heading>
 */
export default function Heading({
  variant = 'md',
  as: Tag = 'h2',
  tone = 'default',
  children,
  className = '',
  ...rest
}) {
  const variantClass = `heading-${variant}`;
  const toneClass    = tone === 'on-dark' ? 'text-on-dark' : '';
  return (
    <Tag className={`${variantClass} ${toneClass} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
