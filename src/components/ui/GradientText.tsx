import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Platform, StyleSheet, Text, TextStyle, View } from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { brand } from '../../theme/brand';
import { fonts } from '../../theme/typography';

type Props = {
  children: string;
  style?: TextStyle;
  as?: 'display' | 'body';
  variant?: 'primary' | 'accent';
};

function getGradientColors(variant: 'primary' | 'accent') {
  if (variant === 'accent') {
    return [brand.yellow, brand.orange, brand.redBright] as const;
  }
  /* Brighter stops so text stays visible on dark backgrounds */
  return ['#ff6b6b', brand.redBright, brand.red, '#ff8585'] as const;
}

/** Web: CSS gradient text (MaskedView is unreliable on react-native-web) */
function WebGradientText({
  children,
  style,
  as = 'display',
  variant = 'primary',
}: Props) {
  const colors = getGradientColors(variant);
  const baseStyle = [as === 'display' ? styles.display : styles.body, style];

  return (
    <Text
      style={[
        baseStyle,
        {
          color: brand.redBright,
          // @ts-expect-error — web-only CSS gradient text
          backgroundImage: `linear-gradient(90deg, ${colors.join(', ')})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        },
      ]}
    >
      {children}
    </Text>
  );
}

/** Native: MaskedView gradient text */
function NativeGradientText({
  children,
  style,
  as = 'display',
  variant = 'primary',
}: Props) {
  const colors = getGradientColors(variant);
  const baseStyle = [as === 'display' ? styles.display : styles.body, style];

  return (
    <MaskedView maskElement={<Text style={[baseStyle, styles.mask]}>{children}</Text>}>
      <LinearGradient colors={[...colors]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }}>
        <Text style={[baseStyle, styles.hidden]}>{children}</Text>
      </LinearGradient>
    </MaskedView>
  );
}

export function GradientText(props: Props) {
  if (Platform.OS === 'web') {
    return <WebGradientText {...props} />;
  }
  return <NativeGradientText {...props} />;
}

export function SplitHeadline({
  prefix,
  highlight,
  style,
}: {
  prefix: string;
  highlight: string;
  style?: TextStyle;
}) {
  const { theme } = useAppTheme();

  return (
    <View style={styles.split}>
      <Text style={[styles.display, { color: theme.text }, style]}>{prefix}</Text>
      <GradientText style={style} variant="primary">
        {highlight}
      </GradientText>
    </View>
  );
}

const styles = StyleSheet.create({
  display: {
    fontFamily: fonts.display,
    fontWeight: '700',
  },
  body: {
    fontFamily: fonts.semibold,
    fontWeight: '600',
  },
  mask: {
    backgroundColor: 'transparent',
    color: '#000',
  },
  hidden: {
    opacity: 0,
  },
  split: {
    gap: 2,
    marginBottom: 4,
  },
});
