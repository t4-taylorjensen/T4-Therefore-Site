import { useState, forwardRef } from 'react';

/* ─────────────────────────────────────────
   ICONS
   Inline SVGs so stroke color can be driven
   by the `color` prop without CSS filter hacks.
───────────────────────────────────────── */

/** Straight right arrow → · Hero CTA, nav next */
export function IconArrowRight({ color = '#121212', style }) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0, ...style }}>
      <path
        d="M15.3599 6.38867L7.67986 6.38867C3.64748 6.38867 0 6.38867 0 6.38867M15.3599 6.38867L9.35986 12.3887M15.3599 6.38867L9.35986 0.388672"
        stroke={color} strokeWidth="1.1" strokeLinejoin="round"
      />
    </svg>
  );
}

/** Left arrow ← · nav prev */
export function IconArrowLeft({ color = '#121212' }) {
  return (
    <svg width="16" height="13" viewBox="0 0 16 13" fill="none"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0, transform: 'scaleX(-1)' }}>
      <path
        d="M15.3599 6.38867L7.67986 6.38867C3.64748 6.38867 0 6.38867 0 6.38867M15.3599 6.38867L9.35986 12.3887M15.3599 6.38867L9.35986 0.388672"
        stroke={color} strokeWidth="1.1" strokeLinejoin="round"
      />
    </svg>
  );
}

/** L-corner turning down-right · Case Study CTA */
export function IconCornerDownRight({ color = '#121212' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path
        d="M12.9333 9.4679L8.66658 9.4679C6.42637 9.4679 4.39999 9.4679 4.39999 9.4679L4.39999 3.2002M12.9333 9.4679L9.59992 6.13457M12.9333 9.4679L9.59992 12.8012"
        stroke={color}
      />
    </svg>
  );
}

/** L-corner turning right-down · Footer CTA, download */
export function IconCornerRightArrow({ color = '#121212' }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
      aria-hidden="true" style={{ display: 'block', flexShrink: 0 }}>
      <path
        transform="rotate(90 8 8)"
        d="M12.9333 6.53234L8.66658 6.53234C6.42637 6.53234 4.39999 6.53234 4.39999 6.53234L4.39999 12.8M12.9333 6.53234L9.59992 9.86567M12.9333 6.53234L9.59992 3.19901"
        stroke={color}
      />
    </svg>
  );
}

/* ─────────────────────────────────────────
   ICON NUDGE WRAPPER
   Plays the directional CSS animation on hover.
───────────────────────────────────────── */
const NUDGE_ANIM = {
  right: 'nudge-right 0.55s ease-in-out 1',
  left:  'nudge-left  0.55s ease-in-out 1',
  down:  'nudge-down  0.55s ease-in-out 1',
};

function IconWrap({ hov, direction = 'right', children }) {
  return (
    <span style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      animation: hov ? NUDGE_ANIM[direction] : 'none',
    }}>
      {children}
    </span>
  );
}

/* ─────────────────────────────────────────
   CTA BUTTONS
   All accept:
     icon       — icon component (optional)
     nudge      — animation direction: 'right' | 'left' | 'down'
     className  — extra classes (e.g. anim-fade-up)
     as         — element type: 'button' (default) | 'a'
     href       — only used when as="a"
     onClick    — click handler
     children   — button label
───────────────────────────────────────── */

/** Primary — dark bg, white text → blue on hover */
export const BtnPrimary = forwardRef(function BtnPrimary(
  { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'button', href, onClick, type = 'button', ...rest },
  ref
) {
  const [hov, setHov] = useState(false);
  const iconColor = hov ? '#121212' : '#ffffff';
  return (
    <Tag
      ref={ref}
      href={href}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      className={`btn ${className}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#4297FF' : '#121212',
        color: hov ? '#121212' : '#ffffff',
        transition: 'background 0.2s ease, color 0.2s ease',
      }}
      {...rest}
    >
      {children}
      {Icon && (
        <IconWrap hov={hov} direction={nudge}>
          <Icon color={iconColor} />
        </IconWrap>
      )}
    </Tag>
  );
});

/** Secondary — white bg, dark text → blue on hover · use on dark backgrounds */
export const BtnSecondary = forwardRef(function BtnSecondary(
  { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'button', href, onClick, type = 'button', ...rest },
  ref
) {
  const [hov, setHov] = useState(false);
  return (
    <Tag
      ref={ref}
      href={href}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      className={`btn ${className}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#4297FF' : '#ffffff',
        color: '#121212',
        transition: 'background 0.2s ease',
      }}
      {...rest}
    >
      {children}
      {Icon && (
        <IconWrap hov={hov} direction={nudge}>
          <Icon color="#121212" />
        </IconWrap>
      )}
    </Tag>
  );
});

/** Outline — transparent + border → dark fill on hover */
export const BtnOutline = forwardRef(function BtnOutline(
  { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'button', href, onClick, type = 'button', ...rest },
  ref
) {
  const [hov, setHov] = useState(false);
  const iconColor = hov ? '#ffffff' : '#121212';
  return (
    <Tag
      ref={ref}
      href={href}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      className={`btn ${className}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#121212' : 'transparent',
        color: hov ? '#ffffff' : '#121212',
        border: `1px solid ${hov ? '#121212' : 'rgba(0,0,0,0.15)'}`,
        transition: 'background 0.2s ease, color 0.2s ease, border-color 0.2s ease',
      }}
      {...rest}
    >
      {children}
      {Icon && (
        <IconWrap hov={hov} direction={nudge}>
          <Icon color={iconColor} />
        </IconWrap>
      )}
    </Tag>
  );
});

/** Ghost — transparent + white border, white text → subtle fill on hover · use on dark backgrounds */
export const BtnGhost = forwardRef(function BtnGhost(
  { children, icon: Icon, nudge = 'right', className = '', as: Tag = 'button', href, onClick, type = 'button', ...rest },
  ref
) {
  const [hov, setHov] = useState(false);
  return (
    <Tag
      ref={ref}
      href={href}
      type={Tag === 'button' ? type : undefined}
      onClick={onClick}
      className={`btn ${className}`}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? 'rgba(255,255,255,0.1)' : 'transparent',
        color: '#ffffff',
        border: '1px solid #ffffff',
        transition: 'background 0.2s ease',
      }}
      {...rest}
    >
      {children}
      {Icon && (
        <IconWrap hov={hov} direction={nudge}>
          <Icon color="#ffffff" />
        </IconWrap>
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
  const [hov, setHov] = useState(false);
  return (
    <button
      ref={ref}
      className={`btn-arrow ${className}`}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => !disabled && setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? '#4297FF' : '#ffffff',
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? 'default' : 'pointer',
      }}
      {...rest}
    >
      <IconWrap hov={hov} direction={nudge}>
        <Icon color="#121212" />
      </IconWrap>
    </button>
  );
});

/** Icon accent — 34×34 blue square, black icon · compound CTA pair */
export const BtnIconAccent = forwardRef(function BtnIconAccent(
  { icon: Icon, label, nudge = 'down', onClick, className = '', ...rest },
  ref
) {
  const [hov, setHov] = useState(false);
  return (
    <button
      ref={ref}
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 34,
        height: 34,
        background: '#4297FF',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
        flexShrink: 0,
        padding: 0,
      }}
      {...rest}
    >
      <IconWrap hov={hov} direction={nudge}>
        <Icon color="#121212" />
      </IconWrap>
    </button>
  );
});
