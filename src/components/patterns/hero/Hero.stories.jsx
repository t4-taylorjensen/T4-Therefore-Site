import Hero from './Hero';

export default {
  title: 'Patterns/Hero',
  component: Hero,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Hero** is the full-viewport landing section. It sets the visual and narrative tone for the page.

## When to Use
Place Hero as the **first section** on any marketing or landing page. It should appear above the fold and immediately communicate the primary value proposition. Use only once per page.

## Layout Guidelines
- Full viewport height (\`min-height: 100vh\`)
- Outer padding: \`30px\` on all sides
- Two-column layout at desktop: content left, media right
- Media panel occupies roughly half the viewport with a dark background and fade-in image

## Responsive Behavior
- **≤ 768px**: stacks to single column, media panel is hidden
- Headline font scales down for readability on small screens
- Eyebrow label and CTA remain visible and accessible

## Accessibility
- Uses \`<section>\` landmark with an \`<h1>\` for correct heading hierarchy
- CTA button is fully keyboard-focusable with a visible focus ring
- The media image is decorative — marked with \`aria-hidden\` or empty \`alt\`
- Icon animation respects \`prefers-reduced-motion\` via global \`animations.css\`
        `.trim(),
      },
    },
  },
};

export const Default = {};
