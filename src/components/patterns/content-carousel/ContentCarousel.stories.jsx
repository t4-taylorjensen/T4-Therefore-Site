import ContentCarousel from './ContentCarousel';

import aiBg        from '../../features/pages/hero-media/assets/therefore-int-bg-08.jpg';
import imgDuvine   from '../../../features/pages/assets/proj-duvine-1.jpg';
import imgGoway    from '../../../features/pages/assets/proj-goway-1.jpg';
import imgCanyon   from '../../../features/pages/assets/proj-canyon-spirit-1.jpg';
import imgNap      from '../../../features/pages/assets/proj-nap-1.jpg';
import imgTrova    from '../../../features/pages/assets/proj-trova-1.jpg';

/* First card links to the AI Capabilities callout, as requested. */
const ITEMS = [
  {
    category: 'AI & Content',
    title: 'How structured content makes AI actually useful',
    excerpt: 'Why we embed AI at the content-model level — and what becomes possible once the foundation is right.',
    image: aiBg,
    href: '#ai-capabilities',
  },
  {
    category: 'CMS Strategy',
    title: 'Choosing a headless CMS for a travel brand',
    excerpt: 'A practical framework for weighing Sanity, Contentful and Drupal against your content model.',
    image: imgDuvine,
  },
  {
    category: 'Case Study',
    title: 'Goway: a content platform built to scale',
    excerpt: 'How we centralized editorial operations across markets without growing the team.',
    image: imgGoway,
  },
  {
    category: 'Commerce',
    title: 'Connecting editorial content to live availability',
    excerpt: 'Bridging the experience layer and the booking engine for a seamless funnel.',
    image: imgCanyon,
  },
  {
    category: 'Perspective',
    title: 'Personalisation that respects the guest',
    excerpt: 'Structured content unlocks tailored experiences without the creepiness.',
    image: imgNap,
  },
  {
    category: 'Field Notes',
    title: 'What we learned replatforming a tour operator',
    excerpt: 'The migration decisions that mattered, and the ones that quietly did not.',
    image: imgTrova,
  },
];

export default {
  title: 'Patterns/ContentCarousel',
  component: ContentCarousel,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'A drag-and-arrow carousel of linkable content cards (image left / text right) with a scroll-progress load line. The dark "Go deeper on the ideas behind the work" section on CMS Page V2.',
      },
    },
  },
  args: { items: ITEMS, tone: 'dark' },
  argTypes: {
    tone: { control: 'radio', options: ['light', 'dark'] },
  },
};

/* The image-left / text-right carousel used on CMS Page V2. */
export const Default = {};
