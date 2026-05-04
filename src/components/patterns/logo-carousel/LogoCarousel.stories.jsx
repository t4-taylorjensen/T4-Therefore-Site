import LogoCarousel from './LogoCarousel';

export default {
  title: 'Patterns/LogoCarousel',
  component: LogoCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**LogoCarousel** is an infinite-loop ticker that surfaces client or partner logos as social proof.

## When to Use
Place LogoCarousel between major content sections — typically after Hero and before Stats or a capabilities section. It provides credibility without demanding the reader's full attention. Avoid using more than once per page.

## Layout Guidelines
- Full viewport width (\`width: 100vw\`) — no horizontal padding
- Track duplicates logos (logos × 2) for a seamless infinite loop via CSS \`translateX(-50%)\`
- Animation duration scales dynamically: \`Math.max(28, logos.length × 5)\` seconds
- Edge fade: \`mask-image\` gradient fades at 15% on both sides
- Per-logo size overrides via \`data-logo\` attribute selectors

## Responsive Behavior
- No layout changes at breakpoints — always full-width
- Logo sizes remain fixed; the track scrolls at the same speed
- Animation pauses on mouse hover

## Accessibility
- Logo images are decorative — they carry empty \`alt\` text
- The ticker does not interfere with keyboard navigation
- Scrolling pauses on hover via \`animation-play-state: paused\`
        `.trim(),
      },
    },
  },
};

export const Default = {};
