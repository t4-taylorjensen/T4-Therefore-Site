import meta, { Default } from './PillarHero.stories';
import { breakpointStories } from '../../../utils/breakpoints';

export default {
  ...meta,
  title: 'Patterns/PillarHero/Breakpoints',
};

const _bps = breakpointStories(Default);
export const MobileSm = _bps.BreakpointMobileSm;
export const Mobile = _bps.BreakpointMobile;
export const Tablet = _bps.BreakpointTablet;
export const Desktop = _bps.BreakpointDesktop;
export const DesktopLg = _bps.BreakpointDesktopLg;
