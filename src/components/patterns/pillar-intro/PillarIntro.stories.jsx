import PillarIntro from './PillarIntro';

export default {
  title: 'Patterns/PillarIntro',
  component: PillarIntro,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2. Sticky statement on the left; a scroll-tracked problem list on the right — the row nearest the viewport center gets an accent dash via IntersectionObserver.',
      },
    },
  },
};

export const Default = {};
