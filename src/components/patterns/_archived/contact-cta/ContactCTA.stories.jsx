import ContactCTA from './ContactCTA';

export default {
  title: 'Archived/Patterns/ContactCTA',
  component: ContactCTA,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**ContactCTA** is a dark full-width section that combines a brand headline, contact person profile, and an inline enquiry form. It sits at the bottom of a page as the primary conversion point.

## When to Use
Place ContactCTA as the final section before the footer — after capability or case study sections have established credibility. Its dark background creates a strong visual stop that signals the end of the page narrative and invites action.

## Layout Guidelines
- **Section**: white outer wrapper with \`90px\` vertical padding, \`30px\` horizontal padding
- **Card**: \`#121212\` background, \`overflow: hidden\` — no border-radius, edge-to-edge within the section padding
- **Shader**: 100px animated canvas at the top — drifting radial blobs over a deep-blue base gradient
- **Card inner**: two-column flex, \`padding: 30px\`, \`justify-content: space-between\`
  - Left (\`459px\` fixed): eyebrow + \`55px\` headline + button pair + profile card pushed to bottom via \`justify-content: space-between\`
  - Right (\`740px\` fixed, white): form panel at \`60px\` padding

## Form Fields
- First Name / Last Name (2-column row)
- Email / Company (2-column row)
- Project description (full-width textarea, \`min-height: 111px\`)
- Send Message — full-width \`71px\` submit button

## Interactions
- Input/textarea focus: \`#4297FF\` border + blue layered box-shadow
- Primary button hover: fills \`#4297FF\`, label turns white
- Secondary button hover: \`rgba(255,255,255,0.1)\` fill
- Submit hover: \`#4297FF\` fill
- Submit flow: idle → submitting (label change) → success (replaces form with confirmation message)

## Responsive Behavior
- **≤ 1200px**: right form panel switches from fixed \`740px\` to \`flex: 1\`
- **≤ 1024px**: stacks to single column; left panel switches from \`space-between\` to \`gap: 60px\`
- **≤ 768px**: section padding reduces, headline scales with \`clamp(32px, 7vw, 55px)\`, form rows collapse to single column

## Accessibility
- \`<section>\` landmark with \`<h2>\` headline
- All inputs have associated \`<label>\` elements via \`htmlFor\`
- Submit button disabled during submission with \`cursor: not-allowed\`
- Shader canvas is purely decorative — no \`aria\` role needed
- Reduced motion: shader animation stops immediately
        `.trim(),
      },
    },
  },
};

export const Default = {};
