import LoadLine from './LoadLine';

export default {
  title: 'UI/LoadLine',
  component: LoadLine,
  parameters: { layout: 'padded' },
  argTypes: {
    progress: { control: { type: 'range', min: 0, max: 1, step: 0.01 } },
    tone: { control: { type: 'inline-radio' }, options: ['light', 'dark'] },
  },
};

export const Playground = {
  args: { progress: 0.4, tone: 'light' },
  render: (args) => (
    <div style={{ maxWidth: 520 }}>
      <LoadLine {...args} />
    </div>
  ),
};

export const Light = {
  render: () => (
    <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <LoadLine key={p} progress={p} />
      ))}
    </div>
  ),
};

export const OnDark = {
  render: () => (
    <div style={{ background: '#121212', padding: 32, borderRadius: 8, maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 28 }}>
      {[0, 0.25, 0.5, 0.75, 1].map((p) => (
        <LoadLine key={p} progress={p} tone="dark" />
      ))}
    </div>
  ),
};
