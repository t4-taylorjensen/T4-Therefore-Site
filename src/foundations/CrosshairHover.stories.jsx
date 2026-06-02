import CrosshairHover from '../components/ui/CrosshairHover/CrosshairHover';
import { IconCornerDownRight } from '../components/ui/Button/Button';
import img1 from '../../Case Studies/therefore-post-feature-05.jpg';
import img2 from '../../Case Studies/therefore-suite-5-waves 1.jpg';

export default {
  title: 'Foundations/Crosshair Hover',
  parameters: { layout: 'padded' },
};

const viewLabel = (
  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: 5 }}>
    View <IconCornerDownRight style={{ width: 9, height: 9 }} />
  </span>
);

export const Default = {
  name: 'Default — No Label',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <CrosshairHover style={{ width: 400, height: 280 }}>
        <img src={img1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </CrosshairHover>
      <CrosshairHover style={{ width: 400, height: 280 }}>
        <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
      </CrosshairHover>
    </div>
  ),
};

export const WithLabel = {
  name: 'With Label',
  render: () => (
    <CrosshairHover label={viewLabel} style={{ width: 520, height: 360 }}>
      <img src={img1} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
    </CrosshairHover>
  ),
};

export const CustomOpacity = {
  name: 'Custom Line Opacity',
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, color: 'rgba(18,18,18,0.4)' }}>lineOpacity 0.15</p>
        <CrosshairHover lineOpacity={0.15} style={{ width: 340, height: 240 }}>
          <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </CrosshairHover>
      </div>
      <div>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: 12, color: 'rgba(18,18,18,0.4)' }}>lineOpacity 0.5</p>
        <CrosshairHover lineOpacity={0.5} style={{ width: 340, height: 240 }}>
          <img src={img2} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </CrosshairHover>
      </div>
    </div>
  ),
};
