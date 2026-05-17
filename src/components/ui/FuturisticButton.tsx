import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

import { useAppTheme } from '../../context/ThemeContext';
import { brand } from '../../theme/brand';
import { fonts, radius } from '../../theme/typography';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

type Variant = 'primary' | 'secondary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

type Props = {
  label: string;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  style?: ViewStyle;
  icon?: React.ReactNode;
  fullWidth?: boolean;
};

export function FuturisticButton({
  label,
  onPress,
  variant = 'primary',
  size = 'md',
  style,
  icon,
  fullWidth,
}: Props) {
  const { theme } = useAppTheme();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const sizeStyles = {
    sm: { padV: 10, padH: 18, font: 13 },
    md: { padV: 13, padH: 22, font: 14 },
    lg: { padV: 16, padH: 28, font: 15 },
  }[size];

  if (variant === 'primary') {
    return (
      <AnimatedPressable
        onPress={onPress}
        onPressIn={() => {
          scale.value = withSpring(0.98, { damping: 18 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 18 });
        }}
        style={[styles.btn, fullWidth && styles.fullWidth, animatedStyle, style]}
      >
        <LinearGradient
          colors={[brand.redBright, brand.red, brand.redDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[
            styles.gradient,
            { paddingVertical: sizeStyles.padV, paddingHorizontal: sizeStyles.padH },
          ]}
        >
          {icon}
          <Text style={[styles.primaryText, { fontSize: sizeStyles.font }]}>{label}</Text>
        </LinearGradient>
      </AnimatedPressable>
    );
  }

  return (
    <AnimatedPressable
      onPress={onPress}
      onPressIn={() => {
        scale.value = withSpring(0.98, { damping: 18 });
      }}
      onPressOut={() => {
        scale.value = withSpring(1, { damping: 18 });
      }}
      style={[
        styles.btn,
        fullWidth && styles.fullWidth,
        animatedStyle,
        variant === 'secondary' && {
          borderWidth: 1,
          borderColor: theme.cardBorder,
          backgroundColor: theme.card,
        },
        variant === 'ghost' && { backgroundColor: 'transparent' },
        {
          paddingVertical: sizeStyles.padV,
          paddingHorizontal: sizeStyles.padH,
        },
        style,
      ]}
    >
      <Text style={[styles.secondaryText, { color: theme.text, fontSize: sizeStyles.font }]}>
        {label}
      </Text>
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: radius.md,
    overflow: 'hidden',
    alignSelf: 'flex-start',
    shadowColor: brand.red,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.28,
    shadowRadius: 12,
    elevation: 4,
  },
  fullWidth: { alignSelf: 'stretch' },
  gradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  primaryText: {
    color: '#fff',
    fontFamily: fonts.semibold,
    letterSpacing: 0.2,
  },
  secondaryText: {
    fontFamily: fonts.semibold,
    textAlign: 'center',
  },
});
