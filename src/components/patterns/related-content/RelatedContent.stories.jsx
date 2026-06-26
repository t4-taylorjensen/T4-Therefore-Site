import RelatedContent from './RelatedContent';
import imgDuvine from '../../../features/pages/assets/proj-duvine-1.jpg';
import bgInt07 from '../../features/pages/hero-media/assets/therefore-int-bg-07.jpg';
import aiBgBase from '../../features/pages/hero-media/assets/therefore-int-bg-base.jpg';

const ITEMS = [
  { title: 'Commerce', desc: 'Headless and agentic commerce', image: imgDuvine },
  { title: 'Platforms', desc: 'Bespoke digital platforms', image: bgInt07 },
  { title: 'AI', desc: 'Agentic content operations', image: aiBgBase },
];

export default {
  title: 'Patterns/RelatedContent',
  component: RelatedContent,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2 — flush image-card grid below a quiet headline + pill link. Each card tracks the cursor with a scramble "(DISCOVER)" label on hover.',
      },
    },
  },
};

export const Default = {
  args: {
    items: ITEMS,
  },
};
