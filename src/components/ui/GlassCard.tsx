import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, View, ViewStyle } from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { brand } from '../../theme/brand';
import { radius, spacing } from '../../theme/typography';

type Props = {
  children: React.ReactNode;
  style?: ViewStyle;
  glow?: boolean;
  glowColor?: string;
  padding?: 'sm' | 'md' | 'lg' | 'none';
};

export function GlassCard({
  children,
  style,
  glow = false,
  glowColor,
  padding = 'md',
}: Props) {
  const { theme, mode } = useAppTheme();
  const accent = glowColor ?? theme.accent;

  const pad =
    padding === 'none' ? 0 : padding === 'sm' ? spacing.md : padding === 'lg' ? spacing.lg + 4 : spacing.lg;

  const content = (
    <View
      style={[
        styles.inner,
        {
          backgroundColor: theme.card,
          borderColor: glow ? `${accent}55` : theme.cardBorder,
          padding: pad,
        },
        glow && {
          shadowColor: accent,
          shadowOffset: { width: 0, height: 12 },
          shadowOpacity: 0.22,
          shadowRadius: 24,
          elevation: 4,
        },
        style,
      ]}
    >
      <LinearGradient
        colors={
          mode === 'dark'
            ? ['rgba(255,255,255,0.06)', 'transparent']
            : [`${accent}10`, 'transparent']
        }
        style={styles.topShine}
        pointerEvents="none"
      />
      {children}
    </View>
  );

  if (Platform.OS === 'ios') {
    return (
      <BlurView intensity={mode === 'dark' ? 28 : 48} tint={mode} style={styles.blur}>
        {content}
      </BlurView>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  blur: {
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  inner: {
    borderRadius: radius.lg,
    borderWidth: 1,
    overflow: 'hidden',
  },
  topShine: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 2,
  },
});
