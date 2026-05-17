import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import React, { useState } from 'react';
import {
  Modal,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Animated, {
  interpolate,
  useAnimatedStyle,
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

type Props = {
  currentRoute: string;
  onNavigate: (route: string) => void;
  scrollY: SharedValue<number>;
  topInset: number;
};

export function Navbar({ currentRoute, onNavigate, scrollY, topInset }: Props) {
  const { theme, mode, toggleTheme } = useAppTheme();
  const { isMobile, isDesktop, horizontalPadding, isSmallPhone } = useResponsive();
  const [menuOpen, setMenuOpen] = useState(false);
  const insets = useSafeAreaInsets();

  const barStyle = useAnimatedStyle(() => ({
    borderBottomColor: `rgba(230, 0, 0, ${interpolate(scrollY.value, [0, 100], [0, 0.25])})`,
    backgroundColor:
      scrollY.value > 24
        ? mode === 'dark'
          ? 'rgba(5, 8, 22, 0.94)'
          : 'rgba(250, 251, 252, 0.96)'
        : 'transparent',
  }));

  const navLinks = (
    <View style={styles.links}>
      {NAV_LINKS.map((link) => {
        const active = currentRoute === link.route;
        return (
          <Pressable
            key={link.route}
            onPress={() => onNavigate(link.route)}
            style={[
              styles.linkPill,
              active && {
                backgroundColor: `${brand.red}18`,
                borderColor: `${brand.red}44`,
              },
            ]}
          >
            <Text
              style={[
                styles.link,
                {
                  color: active ? brand.red : theme.textMuted,
                  fontFamily: active ? fonts.semibold : fonts.medium,
                },
              ]}
            >
              {link.label}
            </Text>
          </Pressable>
        );
      })}
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
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  linkPill: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: 'transparent',
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
