import TestimonialsCarousel from './TestimonialsCarousel';

export default {
  title: 'Archived/Patterns/TestimonialsCarousel',
  component: TestimonialsCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**TestimonialsCarousel** is a video-first testimonial section on a dark background. Cards feature a hoverable video, person details, and a pull quote.

## When to Use
Place TestimonialsCarousel near the bottom of a marketing page, close to the primary conversion point. Social proof is most persuasive when the reader is already considering acting. Requires at least 3 testimonials to justify the carousel interaction.

## Layout Guidelines
- Dark section background (\`#121212\`) — creates strong contrast with surrounding light sections
- Inner padding: \`90px\` horizontal, \`120px\` top/bottom
- Cards: \`width: 400px\`, \`flex-shrink: 0\`, draggable horizontal track
- Track gap: \`15px\` between cards
- Navigation: previous/next arrow buttons in the header row
- Play/Pause cursor icons follow the mouse over the active video card

## Responsive Behavior
- **≤ 768px**: horizontal padding reduces, cards remain 400px (viewport scrolls)
- Navigation arrows remain visible and functional
- Video autoplay is suppressed until explicit user interaction

## Accessibility
- Each card is keyboard-focusable (\`tabindex="0"\`)
- Navigation arrows carry \`aria-label\` attributes ("Previous", "Next")
- Videos use \`preload="none"\` — no data is loaded until the user interacts
- Play/pause state is visually indicated by cursor icon crossfade
- Quote transition animation (\`.anim-quote-in\`) respects \`prefers-reduced-motion\`
        `.trim(),
      },
    },
  },
};

export const Default = {
  render: () => <TestimonialsCarousel />,
};
