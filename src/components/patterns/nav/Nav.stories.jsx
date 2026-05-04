import Nav from './Nav';

export default {
  title: 'Patterns/Nav',
  component: Nav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Nav** is the sticky top navigation bar that anchors every marketing page. It sits at \`position: sticky; top: 0\` with a white background and a 1px hairline border, and exposes a full-screen overlay menu (the "More" panel) that wipes down with a blue curtain animation.

## When to Use
Place Nav as the first element of every page (or compose it via \`PageLayout\`). The same component handles both desktop and mobile presentations.

## Anatomy
- **Logo** (centered, absolute) — links back to home
- **Primary links** (\`Headless CMS\`, \`Digital Products\`, \`AI\`) — left-justified
- **More button** — opens the overlay menu (also opened by the burger on mobile)
- **CTA** \`Start a Project\` — right-justified
- **Mobile burger** — replaces the link list and CTA below \`768px\`

## Overlay Menu
Triggered by either *More* (desktop) or the burger (mobile). Composed of:
- A blue curtain that sweeps top→bottom on open and bottom→top on close
- A mirror nav bar with close button + logo + CTA
- Display-size links for the active section (one is highlighted, others dim to 20%)
- A \`Discover\` group with secondary destinations
- A bottom strip with contact and social links

## Props
- \`activePage\` — string label that matches one of the main display links to highlight it (defaults to \`'Headless CMS'\`)

## Accessibility
- The burger and More button both expose \`aria-expanded\` and \`aria-controls\`
- The overlay sets \`aria-hidden\` when closed and disables body scroll while open
- Escape closes the overlay; focus is trapped within the open menu
- All animations honour \`prefers-reduced-motion\` (transitions degrade to instant state changes)
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Sticky Top Bar',
};

export const ActiveOnDigitalProducts = {
  name: 'Active page: Digital Products',
  args: {
    activePage: 'Digital Products',
  },
};

export const ActiveOnAI = {
  name: 'Active page: AI Solutions',
  args: {
    activePage: 'AI Solutions',
  },
};
