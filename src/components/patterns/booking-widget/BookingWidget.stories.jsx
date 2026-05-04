import BookingWidget from './BookingWidget';

export default {
  title: 'Patterns/BookingWidget',
  component: BookingWidget,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'travel',
      values: [
        {
          name: 'travel',
          value: 'linear-gradient(160deg, #1a1c1e 0%, #2c3440 50%, #1e2830 100%)',
        },
        {
          name: 'warm neutral',
          value: '#e8e5df',
        },
        {
          name: 'white',
          value: '#ffffff',
        },
      ],
    },
    docs: {
      description: {
        component: `
**BookingWidget** is the hero search bar for the Trova Travel experience — a premium, restrained booking interface designed to feel editorial, not utilitarian.

## Structure
A single pill-shaped container holds three interactive fields and a circular submit button:
- **Destination** — opens a dropdown with recent searches and suggested destinations
- **When** — opens a custom date picker for departure/return selection
- **Guests** — opens a popover with +/− counters for adults, children, and infants

## Interactions
- Clicking a field opens its panel; clicking another field closes the previous one
- Selecting a destination automatically advances focus to the **When** field
- Outside-click and **Escape** dismiss any open panel
- The submit button uses a **blind-wipe animation** — a gradient slides left→right to reveal a lighter blue, paired with a 2px rightward arrow nudge

## Accessibility
- All fields are \`<button>\` elements with \`aria-expanded\` and \`aria-haspopup\`
- Destination panel has \`role="listbox"\` with \`role="option"\` items
- Date picker and guests popover use \`role="dialog"\`
- Guest counts are announced via \`aria-live="polite"\`
- Full keyboard navigation; focus rings styled to brand token (\`--color-accent\`)
- All motion respects \`prefers-reduced-motion\`

## Motion Principles
Every transition is controlled and intentional. Duration 180–260ms, \`cubic-bezier(0.2, 0.8, 0.2, 1)\` easing. No bounce, no overstatement.
        `.trim(),
      },
    },
  },
};

export const Default = {
  name: 'Booking Widget',
};
