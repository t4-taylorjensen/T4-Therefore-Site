import TestimonialsCarousel from './TestimonialsCarousel';

import placeholderVideo from './placeholder-video-man-talking.mp4';
import person1 from './person-1.jpg';
import person2 from './person-2.jpg';
import person3 from './person-3.jpg';

const DEFAULT_TESTIMONIALS = [
  {
    name:         'Tristan Armstrong',
    title:        'Chief Executive Officer',
    company:      'Canyon Spirit',
    photo:        person1,
    video:        placeholderVideo,
    videoAsCover: true,
    quote:        '"Therefore has been tenacious improving our technological capabilities and guest experience. They have been supportive partners and met the changing needs of the tourism landscape."',
  },
  {
    name:    'Sarah Chen',
    title:   'Head of Product',
    company: 'Meridian Labs',
    photo:   person2,
    video:   placeholderVideo,
    quote:   '"Working with this team transformed how we approach digital infrastructure. Their expertise and dedication to our vision made every milestone feel achievable."',
  },
  {
    name:    'Marcus Webb',
    title:   'Founder & Creative Director',
    company: 'Northlight Studio',
    photo:   person3,
    video:   placeholderVideo,
    quote:   '"From day one, the collaboration felt effortless. They understood our brand deeply and delivered an experience our customers talk about constantly."',
  },
];

export default {
  title: 'Patterns/TestimonialsCarousel',
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
  render: () => (
    <TestimonialsCarousel
      eyebrow="Trusted by industry leaders"
      testimonials={DEFAULT_TESTIMONIALS}
    />
  ),
};
