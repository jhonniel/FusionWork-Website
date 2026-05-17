import { useEffect, useState } from 'react';
import { Dimensions, ScaledSize } from 'react-native';

export type Breakpoint = 'mobile' | 'tablet' | 'desktop';

const getBreakpoint = (width: number): Breakpoint => {
  if (width >= 1024) return 'desktop';
  if (width >= 768) return 'tablet';
  return 'mobile';
};

/** Responsive layout helper for mobile, tablet, and desktop widths */
export function useResponsive() {
  const [window, setWindow] = useState(Dimensions.get('window'));

  useEffect(() => {
    const onChange = ({ window: next }: { window: ScaledSize }) => setWindow(next);
    const sub = Dimensions.addEventListener('change', onChange);
    return () => sub.remove();
  }, []);

  const breakpoint = getBreakpoint(window.width);
  const isMobile = breakpoint === 'mobile';
  const isTablet = breakpoint === 'tablet';
  const isDesktop = breakpoint === 'desktop';
  const isSmallPhone = window.width < 380;
  const contentWidth = Math.min(window.width, 1200);
  const columns = isDesktop ? 3 : isTablet ? 2 : 1;

  return {
    width: window.width,
    height: window.height,
    breakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isSmallPhone,
    contentWidth,
    columns,
    horizontalPadding: isSmallPhone ? 16 : isMobile ? 20 : isTablet ? 32 : 48,
    /** Use for grid children — always full width on mobile */
    gridItemWidth: isMobile ? '100%' : undefined,
  };
}
