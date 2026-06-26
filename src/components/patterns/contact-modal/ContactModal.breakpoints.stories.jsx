import meta, { Default } from './ContactModal.stories';
import { breakpointStories } from '../../../utils/breakpoints';

export default {
  ...meta,
  title: 'Patterns/ContactModal/Breakpoints',
};

const _bps = breakpointStories(Default);
export const MobileSm = _bps.BreakpointMobileSm;
export const Mobile = _bps.BreakpointMobile;
export const Tablet = _bps.BreakpointTablet;
export const Desktop = _bps.BreakpointDesktop;
export const DesktopLg = _bps.BreakpointDesktopLg;
