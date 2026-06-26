import FAQ from './FAQ';

export default {
  title: 'Archived/Patterns/FAQ',
  component: FAQ,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
**FAQ — Default (sidebar) variant.** Archived. The two-column sidebar layout is legacy; CMS Page V2 uses the \`inline\` variant (see \`Patterns/FAQ\`).
        `.trim(),
      },
    },
  },
};

export const Default = {};
