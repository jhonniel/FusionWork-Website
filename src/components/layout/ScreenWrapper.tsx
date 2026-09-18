import React, { useCallback } from 'react';
import { Platform, ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
};

export function ScreenWrapper({
  children,
  showFooter = true,
  contentStyle,
  onNavigate,
  currentRoute,
}: Props) {
  const { theme } = useAppTheme();
  const insets = useSafeAreaInsets();
  const { isMobile } = useResponsive();
  const scrollY = useSharedValue(0);
  const progress = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (e) => {
      scrollY.value = e.contentOffset.y;
      const max = Math.max(e.contentSize.height - e.layoutMeasurement.height, 1);
      progress.value = e.contentOffset.y / max;
    },
  });

  const handleNav = useCallback(
    (route: string) => onNavigate(route),
    [onNavigate],
  );

  const isWeb = Platform.OS === 'web';
  const navOffset = isMobile ? 64 : 72;

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
        currentRoute={currentRoute}
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
