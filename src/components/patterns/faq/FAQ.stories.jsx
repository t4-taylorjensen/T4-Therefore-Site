import FAQ from './FAQ';

import sidebarImg from '../../ui/brand assets/therefore-int-media-placeholder.jpg';

const DEFAULT_FAQS = [
  {
    question: 'What is headless commerce?',
    answer:   'Headless commerce separates the frontend experience from backend systems. This allows enterprises to manage content, commerce, and integrations independently, creating greater flexibility, faster performance, and long-term scalability.',
  },
  {
    question: 'When does headless make sense?',
    answer:   'Headless is most effective for organizations with complex integrations, multi-channel requirements, or growth plans that exceed the limits of all-in-one platforms. It becomes valuable when flexibility and scalability outweigh simplicity.',
  },
  {
    question: 'How long does implementation take?',
    answer:   'Enterprise implementations typically range from 12 to 20 weeks, depending on integration complexity, content modeling, and migration scope. A phased approach can accelerate time to value while long-term architecture evolves.',
  },
  {
    question: 'How does headless connect to existing systems?',
    answer:   'Headless integrates through APIs, allowing CMS, commerce engines, CRM, ERP, PIM, and other platforms to operate as a unified system. The architecture is designed to support existing workflows while improving flexibility and performance.',
  },
  {
    question: 'Is headless right for mid-sized enterprises?',
    answer:   'Headless can be the right choice for mid-sized enterprises with growing complexity, multiple digital channels, or long-term scalability goals. For smaller organizations with simple requirements, a monolithic platform may remain sufficient.',
  },
];

const DEFAULT_SIDEBAR = {
  image:    sidebarImg,
  imageAlt: 'Agentic Commerce article',
  category: 'Insight',
  title:    'Agentic Commerce: Preparing for AI-Driven Transactions',
};

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

export const Default = {
  render: () => (
    <FAQ
      eyebrow="Headless Commerce FAQs"
      headline="Frequently Asked Questions"
      faqs={DEFAULT_FAQS}
      sidebar={DEFAULT_SIDEBAR}
    />
  ),
};
