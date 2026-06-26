import { forwardRef } from 'react';

/* ─────────────────────────────────────────
   BUTTONS

   Visual styling lives in CSS classes (.btn,
   .btn-primary, etc.) defined in global.css —
   these wrappers just compose them with React.
   Icons inherit color via currentColor and are
   nudged on hover via the .icon-nudge utility.

   Common props:
     icon       — icon component (optional)
     nudge      — animation direction: 'right' | 'left' | 'down'
     className  — extra classes (e.g. anim-fade-up)
     as         — element type: 'button' (default) | 'a'
     href       — only used when as="a"
     onClick    — click handler
     children   — button label
───────────────────────────────────────── */

function CtaBase(variant) {
  const Component = forwardRef(function Cta(
    { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'button', href, onClick, type = 'button', ...rest },
    ref
  ) {
    return (
      <Tag
        ref={ref}
        href={href}
        type={Tag === 'button' ? type : undefined}
        onClick={onClick}
        className={`btn ${variant} ${className}`.trim()}
        {...rest}
      >
        {children}
        {Icon && (
          <span className={`icon-nudge icon-nudge--${nudge}`}>
            <Icon />
          </span>
        )}
      </Tag>
    );
  });
  // 'btn-primary' → 'BtnPrimary' for React DevTools
  Component.displayName = variant.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('');
  return Component;
}

/** Primary — dark bg, white text → blue on hover */
export const BtnPrimary   = CtaBase('btn-primary');

/** Secondary — white bg, dark text → blue on hover · use on dark backgrounds */
export const BtnSecondary = CtaBase('btn-secondary');

/** Outline — transparent + border → dark fill on hover */
export const BtnOutline   = CtaBase('btn-outline');

/** Dark — black bg + white border → blue fill + black text on hover · use inside dark panels/dropdowns */
export const BtnDark      = CtaBase('btn-dark');

/** Link text button — no bg/border, muted white · use on dark backgrounds */
export const BtnLink = forwardRef(function BtnLink(
  { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'a', href, onClick, ...rest },
  ref
) {
  return (
    <Tag
      ref={ref}
      href={href}
      onClick={onClick}
      className={`btn-link ${className}`.trim()}
      {...rest}
    >
      {children}
      {Icon && (
        <span className={`icon-nudge icon-nudge--${nudge}`}>
          <Icon />
        </span>
      )}
    </Tag>
  );
});

/* ─────────────────────────────────────────
   ICON-ONLY BUTTONS
───────────────────────────────────────── */

/** Arrow nav — 44×44 white square → blue on hover · prev/next navigation */
export const BtnArrow = forwardRef(function BtnArrow(
  { icon: Icon, label, disabled = false, nudge = 'right', onClick, className = '', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={`btn-arrow ${className}`.trim()}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      {...rest}
    >
      <span className={`icon-nudge icon-nudge--${nudge}`}>
        <Icon />
      </span>
    </button>
  );
});

/** Icon accent — 34×34 blue square, black icon · compound CTA pair */
export const BtnIconAccent = forwardRef(function BtnIconAccent(
  { icon: Icon, label, nudge = 'down', onClick, className = '', ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      aria-label={label}
      onClick={onClick}
      className={`btn-icon-accent ${className}`.trim()}
      {...rest}
    >
      <span className={`icon-nudge icon-nudge--${nudge}`}>
        <Icon />
      </span>
    </button>
  );
});

/* Re-export icons from their canonical home so existing imports keep working */
export {
  IconCornerDownRight,
  IconCornerRightArrow,
} from '../icons';
