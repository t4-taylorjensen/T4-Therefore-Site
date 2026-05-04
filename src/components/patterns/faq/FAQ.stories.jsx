import FAQ from './FAQ';

export default {
  title: 'Patterns/FAQ',
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**FAQ** is a two-column section combining an animated accordion with a sticky article sidebar. It answers common questions while surfacing a relevant insight card.

## When to Use
Place FAQ near the bottom of a marketing page, after core content sections have established the brand and offer. It addresses objections, reduces sales friction, and provides an editorial touchpoint for deeper engagement. Works well before the footer or a final CTA.

## Layout Guidelines
- Two-column layout: left (accordion) + right (sticky sidebar)
- Section border-top: \`1px solid rgba(0,0,0,0.1)\` — acts as a section divider
- Left column: \`flex: 1\`, \`padding: 60px\`, \`gap: 260px\` between header and accordion
- Header: eyebrow + 55px headline, \`gap: 30px\`
- Accordion items: \`border-top: 1px solid rgba(0,0,0,0.1)\`, trigger \`padding: 30px 0\`
- When an item is open: all other items fade to \`opacity: 0.5\`, restore on hover
- Answer panel: height animates from \`0\` to \`scrollHeight\` via \`useEffect\` + inline style
- Sidebar: \`width: 370px\`, \`position: sticky; top: 0\` — stays in view while user scrolls accordion
- Sidebar card: hover lifts \`translateY(-4px)\` and gains \`box-shadow\`

## Responsive Behavior
- **≤ 1165px**: left column padding reduces to 40px horizontal
- **≤ 768px**: stacks to single column; sidebar loses \`position: sticky\`, becomes a normal block below the accordion; sidebar image fills container width with \`aspect-ratio: 311/232\`

## Accessibility
- Each trigger is a \`<button>\` with \`aria-expanded\` and \`aria-controls\`
- Answer panel has \`role="region"\` and \`aria-labelledby\` pointing to its trigger
- Plus/minus icons are \`aria-hidden\` — the button text alone describes the action
- Keyboard operable: Tab to focus trigger, Enter/Space to toggle
- Height animation is CSS-driven via inline style — does not interfere with screen readers
        `.trim(),
      },
    },
  },
};

export const Default = {};
