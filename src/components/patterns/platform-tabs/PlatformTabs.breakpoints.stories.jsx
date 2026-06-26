import meta, { ScrollingTabs } from './PlatformTabs.stories';
import { breakpointStories } from '../../../utils/breakpoints';

export default {
  ...meta,
  title: 'Patterns/PlatformTabs/Breakpoints',
};

const _bps = breakpointStories(ScrollingTabs);
export const MobileSm = _bps.BreakpointMobileSm;
export const Mobile = _bps.BreakpointMobile;
export const Tablet = _bps.BreakpointTablet;
export const Desktop = _bps.BreakpointDesktop;
export const DesktopLg = _bps.BreakpointDesktopLg;
