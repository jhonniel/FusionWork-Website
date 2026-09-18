import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  Easing,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  type SharedValue,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { NAV_LINKS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';
import { BrandLogo } from '../ui/BrandLogo';
import { FuturisticButton } from '../ui/FuturisticButton';

const TAB_MS = 280;
const TAB_EASE = Easing.out(Easing.cubic);

type Props = {
  currentRoute: string;
  onNavigate: (route: string) => void;
  scrollY: SharedValue<number>;
  topInset: number;
};

type TabLayout = { x: number; width: number };

function NavTab({
  label,
  active,
  mutedColor,
  onPress,
  onLayout,
}: {
  label: string;
  active: boolean;
  mutedColor: string;
  onPress: () => void;
  onLayout: (e: LayoutChangeEvent) => void;
}) {
  const progress = useSharedValue(active ? 1 : 0);

  useEffect(() => {
    progress.value = withTiming(active ? 1 : 0, { duration: TAB_MS, easing: TAB_EASE });
  }, [active, progress]);

  const textStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], [mutedColor, brand.red]),
    transform: [{ scale: interpolate(progress.value, [0, 1], [1, 1.03]) }],
  }));

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.linkPill}>
      <Animated.Text
        style={[
          styles.link,
          textStyle,
          { fontFamily: active ? fonts.semibold : fonts.medium },
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
}

export function Navbar({ currentRoute, onNavigate, scrollY, topInset }: Props) {
  const { theme, mode, toggleTheme } = useAppTheme();
  const { isMobile, isDesktop, horizontalPadding, isSmallPhone } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const [tabLayouts, setTabLayouts] = useState<Record<string, TabLayout>>({});
  const insets = useSafeAreaInsets();

  const activeIndex = Math.max(
    0,
    NAV_LINKS.findIndex((l) => l.route === currentRoute),
  );
  const indicatorX = useSharedValue(0);
  const indicatorW = useSharedValue(0);
  const indicatorOpacity = useSharedValue(0);

  useEffect(() => {
    const route = NAV_LINKS[activeIndex]?.route;
    const layout = route ? tabLayouts[route] : undefined;
    if (!layout || layout.width <= 0) {
      indicatorOpacity.value = withTiming(0, { duration: 120 });
      return;
    }
    indicatorX.value = withTiming(layout.x, { duration: TAB_MS, easing: TAB_EASE });
    indicatorW.value = withTiming(layout.width, { duration: TAB_MS, easing: TAB_EASE });
    indicatorOpacity.value = withTiming(1, { duration: 180 });
  }, [activeIndex, indicatorOpacity, indicatorW, indicatorX, tabLayouts]);

  const barStyle = useAnimatedStyle(() => ({
    borderBottomColor: `rgba(230, 0, 0, ${interpolate(scrollY.value, [0, 100], [0, 0.25])})`,
    backgroundColor:
      scrollY.value > 24
        ? mode === 'dark'
          ? 'rgba(5, 8, 22, 0.94)'
          : 'rgba(250, 251, 252, 0.96)'
        : 'transparent',
  }));

  const indicatorStyle = useAnimatedStyle(() => ({
    opacity: indicatorOpacity.value,
    transform: [{ translateX: indicatorX.value }],
    width: indicatorW.value,
  }));

  const setTabLayout = (route: string, e: LayoutChangeEvent) => {
    const { x, width } = e.nativeEvent.layout;
    setTabLayouts((prev) => {
      const existing = prev[route];
      if (existing && Math.abs(existing.x - x) < 0.5 && Math.abs(existing.width - width) < 0.5) {
        return prev;
      }
      return { ...prev, [route]: { x, width } };
    });
  };

  const navLinks = (
    <View style={styles.links}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.indicator,
          {
            backgroundColor: `${brand.red}18`,
            borderColor: `${brand.red}44`,
          },
          indicatorStyle,
        ]}
      />
      {NAV_LINKS.map((link) => (
        <NavTab
          key={link.route}
          label={link.label}
          active={currentRoute === link.route}
          mutedColor={theme.textMuted}
          onPress={() => onNavigate(link.route)}
          onLayout={(e) => setTabLayout(link.route, e)}
        />
      ))}
    </View>
  );

  const nav = (
    <View
      style={[
        styles.inner,
        {
          paddingTop: topInset + (isSmallPhone ? 6 : 10),
          paddingHorizontal: horizontalPadding,
        },
      ]}
    >
      <BrandLogo
        variant={isSmallPhone ? 'compact' : 'mark'}
        onPress={() => onNavigate('Home')}
        showWork={!isSmallPhone}
        style={styles.logoWrap}
      />

      {isDesktop ? (
        <View style={styles.linksCenter}>{navLinks}</View>
      ) : (
        <View style={styles.spacer} />
      )}

      <View style={styles.actions}>
        <Pressable
          onPress={toggleTheme}
          style={[styles.iconBtn, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}
          accessibilityLabel="Toggle theme"
        >
          <Ionicons
            name={mode === 'dark' ? 'sunny-outline' : 'moon-outline'}
            size={18}
            color={theme.textMuted}
          />
        </Pressable>
        {!isDesktop && (
          <Pressable
            onPress={() => setMenuOpen(true)}
            style={[styles.iconBtn, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}
          >
            <Ionicons name="menu" size={22} color={theme.text} />
          </Pressable>
        )}
        {isDesktop && (
          <FuturisticButton
            label="Get Started"
            onPress={() => onNavigate('Contact')}
            size="sm"
          />
        )}
      </View>
    </View>
  );

  return (
    <>
      <Animated.View style={[styles.bar, barStyle]}>
        {Platform.OS === 'ios' ? (
          <BlurView intensity={40} tint={mode} style={styles.blur}>
            {nav}
          </BlurView>
        ) : (
          nav
        )}
      </Animated.View>

      <Modal visible={menuOpen && isMobile} animationType="slide" transparent>
        <Pressable style={styles.menuBackdrop} onPress={() => setMenuOpen(false)}>
          <View
            style={[
              styles.menuPanel,
              {
                backgroundColor: theme.surface,
                borderColor: theme.cardBorder,
                paddingBottom: Math.max(insets.bottom, 24) + 16,
              },
            ]}
            onStartShouldSetResponder={() => true}
          >
            <View style={styles.menuTop}>
              <BrandLogo variant="mark" showWork onPress={() => {}} />
              <Pressable onPress={() => setMenuOpen(false)} hitSlop={12}>
                <Ionicons name="close" size={26} color={theme.text} />
              </Pressable>
            </View>
            {NAV_LINKS.map((link) => (
              <Pressable
                key={link.route}
                style={[
                  styles.menuItem,
                  currentRoute === link.route && { backgroundColor: `${brand.red}12` },
                ]}
                onPress={() => {
                  setMenuOpen(false);
                  onNavigate(link.route);
                }}
              >
                <Text style={[styles.menuLink, { color: theme.text }]}>{link.label}</Text>
                <Ionicons name="chevron-forward" size={18} color={theme.textSubtle} />
              </Pressable>
            ))}
            <FuturisticButton
              label="Get Started"
              onPress={() => {
                setMenuOpen(false);
                onNavigate('Contact');
              }}
              fullWidth
              style={{ marginTop: 20 }}
            />
          </View>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 90,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  blur: { overflow: 'hidden' },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 12,
    maxWidth: 1200,
    width: '100%',
    alignSelf: 'center',
    gap: 8,
  },
  logoWrap: {
    flexShrink: 1,
    maxWidth: '48%',
  },
  spacer: { flex: 1, minWidth: 8 },
  linksCenter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  links: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  indicator: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    borderRadius: radius.md,
    borderWidth: 1,
  },
  linkPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    zIndex: 1,
  },
  link: { fontSize: 14 },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 0 },
  iconBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'flex-end',
  },
  menuPanel: {
    borderTopLeftRadius: radius.xl,
    borderTopRightRadius: radius.xl,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    maxHeight: '88%',
  },
  menuTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: radius.md,
    marginBottom: 4,
  },
  menuLink: { fontFamily: fonts.semibold, fontSize: 17 },
});
