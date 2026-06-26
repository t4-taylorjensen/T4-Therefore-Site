import '../src/components/ui/fonts/fonts.css';
import '../src/styles/global.css';

/**
 * Design-system breakpoints — mapped to the actual @media edges used
 * across the pattern CSS (see Layout/Breakpoints). Exposed on every story
 * via the viewport toolbar so each pattern can be checked at all 4 sizes.
 */
const BREAKPOINTS = {
  mobileSm: {
    name: 'Mobile SM — 480px',
    styles: { width: '480px', height: '900px' },
    type: 'mobile',
  },
  mobile: {
    name: 'Mobile — 768px',
    styles: { width: '768px', height: '1024px' },
    type: 'mobile',
  },
  tablet: {
    name: 'Tablet — 1165px',
    styles: { width: '1165px', height: '900px' },
    type: 'tablet',
  },
  desktop: {
    name: 'Desktop — 1440px',
    styles: { width: '1440px', height: '900px' },
    type: 'desktop',
  },
  desktopLg: {
    name: 'Desktop LG — 1920px',
    styles: { width: '1920px', height: '1080px' },
    type: 'desktop',
  },
};

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    viewport: {
      viewports: BREAKPOINTS,
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          'Pages',
          'Foundations', [
            'Colors',
            'Typography',
            'Spacing',
            'Layout & Grid',
            'Breakpoints',
            'Elevation',
            'Borders & Radius',
            'Icons',
            'Motion',
            'Design Tokens',
            '*',
          ],
          'UI', ['Inputs', '*'],
          'Patterns', ['Nav', 'Footer', '*'],
          'Layout',
          'Archived',
        ],
      },
    },
  },
};

export default preview;
