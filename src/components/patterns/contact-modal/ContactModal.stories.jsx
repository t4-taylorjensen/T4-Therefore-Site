import { useState } from 'react';
import ContactModal from './ContactModal';
import { BtnDark, IconCornerDownRight } from '../../ui/Button/Button';
import lukePhoto from '../../ui/brand assets/therefore-int-luke-bowler.jpg';

export default {
  title: 'Patterns/ContactModal',
  component: ContactModal,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'The canonical contact modal — promoted from the "D — Airy Floating" exploration in Archived/Explorations/Contact Modal Variants. This is what CMS Page V2 opens from its "Let\'s Talk" CTA.',
      },
    },
  },
};

function Demo() {
  const [open, setOpen] = useState(true);
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-bg-section)' }}>
      <BtnDark icon={IconCornerDownRight} nudge="right" onClick={() => setOpen(true)}>
        Open Modal
      </BtnDark>
      <ContactModal
        open={open}
        onClose={() => setOpen(false)}
        personPhoto={lukePhoto}
        personName="Luke Bowler"
      />
    </div>
  );
}

export const Default = { render: () => <Demo /> };
