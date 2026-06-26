import ContactCTA from './ContactCTA';
import lukePhoto from '../../ui/brand assets/therefore-int-luke-bowler.jpg';

export default {
  title: 'Patterns/ContactCTA',
  component: ContactCTA,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: "Extracted from CMS Page V2 — full-bleed ink contact section with a mini photo + name + CTA card pinned bottom-right, opening the canonical ContactModal. Distinct from Patterns/ContactCTA (a different visual design with an inline form) and the archived Let's Talk explorations.",
      },
    },
  },
};

export const Default = {
  args: {
    contactPhoto: lukePhoto,
  },
};
