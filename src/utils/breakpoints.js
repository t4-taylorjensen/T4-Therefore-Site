/**
 * breakpointStories — given a base story (object or render fn), returns the 4
 * design-system breakpoint variants, each pinned to its viewport. Spread the
 * result into a story file's named exports so every pattern lists
 * Mobile SM / Mobile / Tablet / Desktop in the sidebar, each opening at that size.
 *
 * Viewport ids must match the `viewports` keys defined in .storybook/preview.js.
 *
 *   export const { BreakpointMobileSm, BreakpointMobile, BreakpointTablet, BreakpointDesktop }
 *     = breakpointStories(Default);
 */
export function breakpointStories(base) {
  const norm = typeof base === 'function' ? { render: base } : (base || {});
  const make = (id, name) => ({
    ...norm,
    name,
    parameters: { ...(norm.parameters || {}), viewport: { defaultViewport: id } },
  });
  return {
    BreakpointMobileSm: make('mobileSm', 'Mobile SM — 480px'),
    BreakpointMobile: make('mobile', 'Mobile — 768px'),
    BreakpointTablet: make('tablet', 'Tablet — 1165px'),
    BreakpointDesktop: make('desktop', 'Desktop — 1440px'),
    BreakpointDesktopLg: make('desktopLg', 'Desktop LG — 1920px'),
  };
}
