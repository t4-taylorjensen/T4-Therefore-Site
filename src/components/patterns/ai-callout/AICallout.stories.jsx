import AICallout from './AICallout';
import AIEditorialAssistant from '../../features/pages/hero-media/ai/AIEditorialAssistant';

export default {
  title: 'Patterns/AICallout (Hidden)',
  component: AICallout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Extracted from CMS Page V2. Two-column AI capability callout — media slot on the left, copy + link on the right.',
      },
    },
  },
};

export const Default = {
  args: {
    media: <AIEditorialAssistant animated />,
  },
};
