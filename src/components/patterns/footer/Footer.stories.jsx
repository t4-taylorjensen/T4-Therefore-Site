import Footer from './Footer';

export default {
  title: 'Patterns/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**Footer** is a white full-width footer with a bordered inner frame. It combines a brand description, CTA, large display wordmark, navigation links, and legal copy.

## When to Use
Place Footer as the final element on every page. It closes the visual narrative and provides navigation, contact, and legal access points.

## Layout Guidelines
- **Section**: white background, \`border-top: 1px solid rgba(0,0,0,0.15)\`, \`padding: 0 30px\`
- **Inner frame**: left + right borders at \`rgba(0,0,0,0.15)\` — creates a columnar frame within the 30px padding
- **Left column**: \`width: 798px\`, \`padding: 30px\`, \`border-right\` separating it from the right
  - Top: 16px body text (max 427px wide) + black CTA button
  - Bottom: "THEREFORE" wordmark in display font (61px) + © symbol
- **Right column**: \`flex: 1\`, two-column nav (90px gap) at top + legal links at bottom

## Navigation
- Left nav col: Capabilities, Insights, Culture
- Right nav col: Contact, LinkedIn, Instagram
- Legal row: Privacy Policy · Terms Conditions (11px mono, \`#888\`, uppercase)

## Responsive Behavior
- **≤ 1024px**: stacks to single column; left border-right removed, border-bottom added
- **≤ 768px**: horizontal padding reduces to 20px, nav gap reduces, wordmark scales to 42px

## Accessibility
- \`<footer>\` landmark element
- \`<nav aria-label="Footer navigation">\` for the link group
- \`<ul>\` lists for nav columns — fully keyboard navigable
- Wordmark has \`aria-label="Therefore"\`; © is \`aria-hidden\`
- CTA is an \`<a href>\` — keyboard accessible; icon is \`aria-hidden\`
        `.trim(),
      },
    },
  },
};

export const Default = {};
