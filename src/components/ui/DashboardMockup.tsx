import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { radius } from '../../theme/typography';

export function DashboardMockup() {
  const { width, isMobile, isSmallPhone } = useResponsive();
  const float = useSharedValue(0);

  const sceneWidth = isSmallPhone
    ? Math.min(width - 32, 340)
    : isMobile
      ? Math.min(width - 40, 400)
      : 440;

  useEffect(() => {
    float.value = withRepeat(
      withTiming(1, { duration: 4000, easing: Easing.inOut(Easing.sin) }),
      -1,
      true,
    );
  }, [float]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: float.value * -6 }],
  }));

  return (
    <View style={[styles.scene, { width: sceneWidth, maxWidth: '100%' }]}>
      <View style={[styles.backdropPill, { width: sceneWidth * 0.92 }]} />

      <Animated.View style={[styles.wrap, animatedStyle, { width: '100%' }]}>
        <View style={styles.window}>
          <LinearGradient
            colors={['#e8eeff', '#ede9fe', '#f5f3ff']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.titleBar}
          >
            <View style={styles.dots}>
              <View style={[styles.dot, { backgroundColor: '#FF5F56' }]} />
              <View style={[styles.dot, { backgroundColor: '#FFBD2E' }]} />
              <View style={[styles.dot, { backgroundColor: '#27C93F' }]} />
            </View>
          </LinearGradient>

          <View style={[styles.body, isMobile && styles.bodyMobile]}>
            <View style={[styles.sidebar, isMobile && styles.sidebarMobile]}>
              <View style={styles.sidebarActive} />
              <View style={styles.sidebarItem} />
              <View style={styles.sidebarItem} />
              <View style={styles.sidebarItem} />
            </View>

            <View style={styles.main}>
              <View style={styles.metricsRow}>
                <LinearGradient colors={['#6d28d9', '#7c3aed']} style={styles.metricPill} />
                <LinearGradient colors={['#7c3aed', '#8b5cf6']} style={styles.metricPill} />
                <LinearGradient colors={['#6366f1', '#38bdf8']} style={styles.metricPill} />
              </View>
              <View style={[styles.contentPanel, isMobile && styles.contentPanelMobile]} />
            </View>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    minHeight: 260,
  },
  backdropPill: {
    position: 'absolute',
    height: 64,
    borderRadius: 999,
    backgroundColor: 'rgba(167, 139, 250, 0.35)',
    top: '40%',
    zIndex: 0,
  },
  wrap: {
    zIndex: 1,
    ...Platform.select({
      web: { maxWidth: 420 },
      default: {},
    }),
  },
  window: {
    backgroundColor: '#ffffff',
    borderRadius: radius.xl,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(148, 163, 184, 0.2)',
    shadowColor: '#1e1b4b',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.16,
    shadowRadius: 40,
    elevation: 12,
    width: '100%',
  },
  titleBar: {
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(148, 163, 184, 0.12)',
  },
  dots: { flexDirection: 'row', gap: 6 },
  dot: { width: 10, height: 10, borderRadius: 5 },
  body: {
    flexDirection: 'row',
    padding: 14,
    gap: 12,
    minHeight: 220,
    backgroundColor: '#fafbfc',
  },
  bodyMobile: {
    minHeight: 200,
    padding: 12,
  },
  sidebar: { width: 68, gap: 8 },
  sidebarMobile: { width: 56 },
  sidebarActive: {
    height: 26,
    borderRadius: 8,
    backgroundColor: brand.purple,
    width: '100%',
  },
  sidebarItem: {
    height: 26,
    borderRadius: 8,
    backgroundColor: '#e8ecf2',
    width: '100%',
  },
  main: { flex: 1, gap: 12 },
  metricsRow: {
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-end',
  },
  metricPill: {
    width: 32,
    height: 48,
    borderRadius: 16,
  },
  contentPanel: {
    flex: 1,
    minHeight: 130,
    borderRadius: radius.lg,
    backgroundColor: '#e8ecf2',
  },
  contentPanelMobile: {
    minHeight: 110,
  },
});
