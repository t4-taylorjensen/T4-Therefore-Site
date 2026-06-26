import '../styles/global.css';
import { BtnArrow } from '../components/ui/Button/Button';
import { IconArrowLeft, IconArrowRight } from '../components/ui/icons';

export default {
  title: 'UI/Arrow',
  parameters: { layout: 'padded' },
};

const row = { display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 12 };
const onDark = { ...row, background: '#121212', padding: 24, borderRadius: 8, marginTop: 12 };
const frame = (children) => <div style={{ fontFamily: 'Roobert, sans-serif', maxWidth: 860 }}>{children}</div>;
function Note({ children }) {
  return (
    <p style={{
      fontFamily: 'Roobert Mono, monospace', fontSize: 10, color: 'rgba(18,18,18,0.4)',
      letterSpacing: '0.5px', marginTop: 16, marginBottom: 0, lineHeight: 1.8,
    }}>{children}</p>
  );
}

/* Outline carousel / slider nav arrows — the only arrow treatment in use. */
export const Default = {
  name: 'Carousel / Slider Nav',
  render: () => frame(<>
    <div style={row}>
      <BtnArrow icon={IconArrowLeft} label="Previous" nudge="left" className="btn-arrow--outline" />
      <BtnArrow icon={IconArrowRight} label="Next" nudge="right" className="btn-arrow--outline" />
      <BtnArrow icon={IconArrowRight} label="Disabled" nudge="right" className="btn-arrow--outline" disabled />
    </div>
    <div style={onDark}>
      <BtnArrow icon={IconArrowLeft} label="Previous" nudge="left" className="btn-arrow--outline btn-arrow--on-dark" />
      <BtnArrow icon={IconArrowRight} label="Next" nudge="right" className="btn-arrow--outline btn-arrow--on-dark" />
    </div>
    <Note>40×40 · transparent · 1px border (radius-sm) · fills ink (or white on dark) on hover · testimonials + ContentCarousel prev/next</Note>
  </>),
};
