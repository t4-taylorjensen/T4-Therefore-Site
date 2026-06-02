import '../styles/global.css';
import {
  IconArrowRight,
  IconCornerDownRight,
  IconCornerRightArrow,
} from '../components/ui/icons';

export default {
  title: 'Foundations/Icons',
  parameters: { layout: 'padded' },
};

const ICONS = [
  { name: 'IconArrowRight',      Icon: IconArrowRight,      usage: 'Decorative only — not for buttons' },
  { name: 'IconCornerDownRight', Icon: IconCornerDownRight, usage: 'Case Study CTA, FeatureStack pill' },
  { name: 'IconCornerRightArrow',Icon: IconCornerRightArrow,usage: 'Footer CTA, download' },
];

const label = {
  fontFamily: 'Roobert Mono, monospace',
  fontSize: 10,
  letterSpacing: '1px',
  textTransform: 'uppercase',
  color: 'rgba(18,18,18,0.4)',
  marginBottom: 24,
  display: 'block',
};

export const AllIcons = {
  name: 'All Icons',
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 48 }}>
      <span style={label}>Icons</span>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
        {ICONS.map(({ name, Icon, usage }) => (
          <div key={name} style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 16,
            padding: '30px 24px',
            background: '#f2f2f2',
          }}>
            <Icon style={{ width: 20, height: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              <span style={{
                fontFamily: 'Roobert Mono, monospace',
                fontSize: 11,
                color: '#121212',
                letterSpacing: '0.02em',
              }}>{name}</span>
              <span style={{
                fontFamily: 'Roobert Mono, monospace',
                fontSize: 10,
                color: 'rgba(18,18,18,0.4)',
                letterSpacing: '0.02em',
              }}>{usage}</span>
            </div>
          </div>
        ))}
      </div>

      <div>
        <span style={{ ...label, marginBottom: 16 }}>On dark</span>
        <div style={{ display: 'flex', gap: 2 }}>
          {ICONS.map(({ name, Icon }) => (
            <div key={name} style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              background: '#121212',
              color: '#ffffff',
            }}>
              <Icon />
            </div>
          ))}
        </div>
      </div>
    </div>
  ),
};
