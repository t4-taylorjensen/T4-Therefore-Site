import { useRef } from 'react';
import PageTransition from './PageTransition';
import '../../../styles/global.css';
import { BtnPrimary } from '../../ui/Button/Button';

export default {
  title: 'Foundations/Page Transition',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Vertical curtain wipe: a solid ink panel sweeps upward — entering from the bottom to cover the screen, then continuing up and off the top to reveal the page. Click the button to preview.',
      },
    },
  },
};

function Demo() {
  const wipe = useRef(null);
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-white)',
        fontFamily: 'var(--font-primary), sans-serif',
      }}
    >
      <BtnPrimary onClick={() => wipe.current.play()} style={{ height: 'auto', padding: '14px 24px' }}>
        Preview transition
      </BtnPrimary>
      <PageTransition ref={wipe} color="var(--color-ink)" />
    </div>
  );
}

export const Default = { name: 'Preview', render: () => <Demo /> };
