import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import type { NavRoute } from '../../constants/navigation';
import { ScrollSpyProvider, useScrollSpy } from '../../context/ScrollSpyContext';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { AnimatedGradientBg } from './AnimatedGradientBg';
import { CursorGlow } from './CursorGlow';
import { Footer } from './Footer';
import { Navbar } from './Navbar';
import { ParticleBackground } from './ParticleBackground';
import { ScrollProgress } from './ScrollProgress';
import { SiteChat } from './SiteChat';

const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

type Props = {
  children: React.ReactNode;
  showFooter?: boolean;
  contentStyle?: ViewStyle;
  onNavigate: (route: string) => void;
  currentRoute: string;
  /** When true, navbar highlight follows the visible section while scrolling. */
  enableScrollSpy?: boolean;
};

function ScreenBody({
  children,
  showFooter = true,
  contentStyle,
  onNavigate,
  currentRoute,
  enableScrollSpy = false,
  goToRef,
}: Props & { goToRef?: React.MutableRefObject<(route: string) => void> }) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { isMobile } = useResponsive();
  const spy = useScrollSpy();
  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);
  const [activeRoute, setActiveRoute] = useState(currentRoute);

  const isWeb = Platform.OS === 'web';
  const navOffset = isMobile ? 64 : 72;

  useEffect(() => {
    if (!enableScrollSpy) setActiveRoute(currentRoute);
  }, [currentRoute, enableScrollSpy]);

  const updateActiveFromScroll = useCallback(
    (y: number) => {
      if (!enableScrollSpy || !spy) return;

      const marker = y + navOffset + 28;
      const sections = spy.getOrderedSections();
      if (sections.length === 0) return;

      let next: NavRoute = sections[0].route;
      for (const section of sections) {
        if (section.y <= marker) next = section.route;
        else break;
      }

      setActiveRoute((prev) => (prev === next ? prev : next));
    },
    [enableScrollSpy, navOffset, spy],
  );

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
      const max = Math.max(e.contentSize.height - e.layoutMeasurement.height, 1);
      progress.value = e.contentOffset.y / max;
      if (enableScrollSpy) {
        runOnJS(updateActiveFromScroll)(e.contentOffset.y);
      }
    },
  });

  const handleNav = useCallback(
    (route: string) => {
      onNavigate(route);
    },
    [onNavigate],
  );

  useEffect(() => {
    if (goToRef) goToRef.current = handleNav;
  }, [goToRef, handleNav]);

  const navRoute = enableScrollSpy ? activeRoute : currentRoute;

  return (
    <View
      style={[
        styles.root,
        { backgroundColor: theme.background },
        isWeb && styles.rootWeb,
      ]}
    >
      {isWeb ? <CursorGlow /> : null}
      <ParticleBackground count={isMobile ? 4 : 8} />
      <AnimatedGradientBg />
      <ScrollProgress progress={progress} />
      <Navbar
        currentRoute={navRoute}
        onNavigate={handleNav}
        scrollY={scrollY}
        topInset={insets.top}
      />
      <AnimatedScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={isWeb}
        style={styles.scroll}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: insets.top + navOffset,
            paddingBottom: insets.bottom + (isMobile ? 32 : 48),
          },
          contentStyle,
        ]}
      >
        <View style={styles.page}>{children}</View>
        {showFooter ? <Footer onNavigate={handleNav} /> : null}
      </AnimatedScrollView>
      <SiteChat onNavigate={handleNav} />
    </View>
  );
}

function SpyScreenWrapper(props: Props) {
  const goToRef = useRef(props.onNavigate);
  const goTo = useCallback((route: string) => {
    goToRef.current(route);
  }, []);

  return (
    <ScrollSpyProvider goTo={goTo}>
      <ScreenBody {...props} enableScrollSpy goToRef={goToRef} />
    </ScrollSpyProvider>
  );
}

export function ScreenWrapper(props: Props) {
  if (props.enableScrollSpy) {
    return <SpyScreenWrapper {...props} />;
  }
  return <ScreenBody {...props} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, width: '100%' },
  rootWeb: {
    minHeight: '100vh' as unknown as number,
  },
  scroll: { width: '100%' },
  content: {
    flexGrow: 1,
    width: '100%',
  },
  page: {
    flexGrow: 1,
    width: '100%',
  },
});
