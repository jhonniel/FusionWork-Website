import { Ionicons } from '@expo/vector-icons';
import * as Linking from 'expo-linking';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { COMPANY } from '../../constants/company';
import { NAV_LINKS } from '../../constants/navigation';
import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts, radius, spacing } from '../../theme/typography';
import { BrandLogo } from '../ui/BrandLogo';

type Props = { onNavigate: (route: string) => void };

export function Footer({ onNavigate }: Props) {
  const { theme } = useAppTheme();
  const { isMobile, horizontalPadding, contentWidth } = useResponsive();

  return (
    <View style={[styles.wrap, { paddingHorizontal: horizontalPadding, borderTopColor: theme.cardBorder }]}>
      <View style={[styles.inner, { maxWidth: contentWidth, width: '100%', alignSelf: 'center' }]}>
        <View style={[styles.grid, isMobile && styles.gridMobile]}>
          <View style={styles.brandCol}>
            <BrandLogo variant="mark" showWork onPress={() => onNavigate('Home')} />
            <Text style={[styles.desc, { color: theme.textMuted }]}>
              Premium software development and digital solutions from Davao City, Philippines.
            </Text>
            <Pressable
              onPress={() => Linking.openURL(COMPANY.facebook)}
              style={[styles.socialBtn, { borderColor: theme.cardBorder, backgroundColor: theme.surface }]}
            >
              <Ionicons name="logo-facebook" size={18} color={brand.red} />
            </Pressable>
          </View>

          <View style={styles.linkCol}>
            <Text style={[styles.colTitle, { color: theme.text }]}>Company</Text>
            {NAV_LINKS.map((l) => (
              <Pressable key={l.route} onPress={() => onNavigate(l.route)}>
                <Text style={[styles.link, { color: theme.textMuted }]}>{l.label}</Text>
              </Pressable>
            ))}
          </View>

          <View style={styles.linkCol}>
            <Text style={[styles.colTitle, { color: theme.text }]}>Contact</Text>
            <Text style={[styles.link, { color: theme.textMuted }]}>{COMPANY.phone}</Text>
            <Text style={[styles.link, { color: theme.textMuted }]}>{COMPANY.location}</Text>
          </View>
        </View>

        <View style={[styles.bottom, { borderTopColor: theme.cardBorder }]}>
          <Text style={[styles.copy, { color: theme.textSubtle }]}>{COMPANY.copyright}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    marginTop: spacing.sectionSm,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.lg,
    borderTopWidth: 1,
  },
  inner: {},
  grid: { flexDirection: 'row', gap: 48, flexWrap: 'wrap' },
  gridMobile: { flexDirection: 'column', gap: 32 },
  brandCol: { flex: 1.2, minWidth: 240, gap: 12 },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 22,
    maxWidth: 320,
  },
  socialBtn: {
    width: 40,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  linkCol: { minWidth: 120, gap: 10 },
  colTitle: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    letterSpacing: 0.5,
    textTransform: 'uppercase',
    marginBottom: 12,
  },
  link: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 26,
  },
  bottom: {
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: StyleSheet.hairlineWidth,
    alignItems: 'center',
  },
  copy: {
    fontFamily: fonts.regular,
    fontSize: 13,
  },
});
