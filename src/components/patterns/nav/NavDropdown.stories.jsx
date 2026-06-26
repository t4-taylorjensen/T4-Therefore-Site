import Nav from './Nav';

export default {
  title: 'Patterns/Nav/Dropdown',
  parameters: { layout: 'fullscreen' },
};

export const Default = {
  name: 'Dropdown — Open',
  render: () => (
    <div style={{ background: '#f8f8f8', minHeight: '100vh' }}>
      <Nav forceOpen activePage="CMS" />
      <div style={{ padding: '64px 80px', opacity: 0.15, pointerEvents: 'none' }}>
        <div style={{ height: 11, width: 140, borderRadius: 3, background: '#999', marginBottom: 20 }} />
        <div style={{ height: 48, width: 520, borderRadius: 4, background: '#666', marginBottom: 14 }} />
        <div style={{ height: 16, width: 360, borderRadius: 3, background: '#999', marginBottom: 8 }} />
        <div style={{ height: 16, width: 300, borderRadius: 3, background: '#999', marginBottom: 24 }} />
        <div style={{ height: 34, width: 130, borderRadius: 5, background: '#555' }} />
      </div>
    </div>
  ),
};
