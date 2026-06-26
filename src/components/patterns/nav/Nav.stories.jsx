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
- **Primary links** (\`CMS\`, \`Commerce\`, \`Platforms\`, \`AI\`) — left-justified
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
- \`activePage\` — string matching one of \`CMS\`, \`Commerce\`, \`Platforms\`, \`AI\` to highlight the active nav item

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

export const ActiveOnCMS = {
  name: 'Active page: CMS',
  args: {
    activePage: 'CMS',
  },
};

export const ActiveOnCommerce = {
  name: 'Active page: Commerce',
  args: {
    activePage: 'Commerce',
  },
};

export const ActiveOnPlatforms = {
  name: 'Active page: Platforms',
  args: {
    activePage: 'Platforms',
  },
};

export const ActiveOnAI = {
  name: 'Active page: AI',
  args: {
    activePage: 'AI',
  },
};

const BREAKPOINTS = [
  { label: 'Desktop — 1440px', width: 1440 },
  { label: 'Collapse point — 1100px', width: 1100 },
  { label: 'Tablet (Menu+) — 900px', width: 900 },
  { label: 'Mobile (Menu+) — 768px', width: 768 },
  { label: 'Small phone — 390px', width: 390 },
];

export const ResponsiveBreakpoints = {
  name: 'Responsive Breakpoints',
  parameters: { docs: { description: { story: 'Each frame is clamped to a real breakpoint width so the cascade — full links → centered logo + burger → tightened mobile spacing — can be compared side by side. Click a burger to preview the mobile menu at that width.' } } },
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, padding: 24, background: '#e9e9e9' }}>
      {BREAKPOINTS.map(({ label, width }) => (
        <div key={width} style={{ flex: '0 0 auto' }}>
          <div style={{ fontFamily: 'monospace', fontSize: 11, marginBottom: 8, color: '#555' }}>{label}</div>
          <div style={{ width, maxWidth: '95vw', height: 420, overflow: 'hidden', position: 'relative', border: '1px solid #ccc', background: '#fff' }}>
            <Nav />
          </div>
        </div>
      ))}
    </div>
  ),
};
