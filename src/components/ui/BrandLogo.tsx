import React from 'react';
import {
  Image,
  ImageStyle,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';

import { useAppTheme } from '../../context/ThemeContext';
import { useResponsive } from '../../hooks/useResponsive';
import { brand } from '../../theme/brand';
import { fonts } from '../../theme/typography';

const logoTransparent = require('../../../assets/fusion-logo-transparent.png');

type Variant = 'full' | 'mark' | 'wordmark' | 'compact';

type Props = {
  variant?: Variant;
  onPress?: () => void;
  style?: ViewStyle;
  imageStyle?: ImageStyle;
  showWork?: boolean;
};

/** Fusion logo — transparent PNG or text wordmark (no white box) */
export function BrandLogo({
  variant = 'full',
  onPress,
  style,
  imageStyle,
  showWork = true,
}: Props) {
  const { theme } = useAppTheme();
  const { isMobile, width } = useResponsive();

  const markWidth = isMobile ? Math.min(130, width * 0.42) : 150;
  const markHeight = markWidth * 0.38;
  const fullWidth = isMobile ? Math.min(220, width * 0.72) : 260;
  const fullHeight = fullWidth * 0.36;

  if (variant === 'wordmark' || variant === 'compact') {
    const content = (
      <View style={[styles.row, style]}>
        <Text style={[styles.fusion, variant === 'compact' && styles.fusionCompact]}>
          Fusion
        </Text>
        {showWork && variant !== 'compact' ? (
          <Text style={[styles.work, { color: theme.textMuted }]}>WORK</Text>
        ) : null}
      </View>
    );
    return onPress ? <Pressable onPress={onPress}>{content}</Pressable> : content;
  }

  const content = (
    <View style={[styles.wrap, style]}>
      <Image
        source={logoTransparent}
        style={[
          variant === 'mark' ? { width: markWidth, height: markHeight } : { width: fullWidth, height: fullHeight },
          styles.image,
          imageStyle,
        ]}
        resizeMode="contain"
        accessibilityLabel="Fusion Work logo"
      />
      {variant === 'full' && showWork ? (
        <Text style={[styles.workBelow, { color: theme.textMuted }]}>WORK</Text>
      ) : null}
    </View>
  );

  if (onPress) {
    return <Pressable onPress={onPress} style={styles.pressable}>
      {content}
    </Pressable>;
  }

  return content;
}

const styles = StyleSheet.create({
  pressable: { alignSelf: 'flex-start' },
  wrap: { alignItems: 'flex-start', backgroundColor: 'transparent' },
  row: { flexDirection: 'row', alignItems: 'baseline', gap: 6, flexWrap: 'wrap' },
  image: {
    backgroundColor: 'transparent',
  },
  imageWebDark: {
    // Fallback if PNG edges still show on some browsers
  },
  fusion: {
    fontFamily: fonts.display,
    fontSize: 26,
    color: brand.red,
    letterSpacing: -0.5,
  },
  fusionCompact: {
    fontSize: 20,
  },
  work: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    letterSpacing: 2.5,
  },
  workBelow: {
    fontFamily: fonts.semibold,
    fontSize: 10,
    letterSpacing: 3,
    marginTop: 2,
    marginLeft: 2,
  },
});
