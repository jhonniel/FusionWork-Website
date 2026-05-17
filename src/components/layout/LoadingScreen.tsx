import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { COMPANY } from '../../constants/company';
import { useAppTheme } from '../../context/ThemeContext';
import { brand } from '../../theme/brand';
import { fonts } from '../../theme/typography';
import { useResponsive } from '../../hooks/useResponsive';
import { IntroLogoAnimation } from '../ui/IntroLogoAnimation';

type Props = { onFinish: () => void };

const SPLASH_MS = 3600;

export function LoadingScreen({ onFinish }: Props) {
  const { theme } = useAppTheme();
  const { width: screenW, isMobile } = useResponsive();
  const logoWidth = Math.min(isMobile ? screenW - 48 : 300, 300);

  const taglineOpacity = useSharedValue(0);
  const taglineY = useSharedValue(10);
  const progressWidth = useSharedValue(0);
  const screenOpacity = useSharedValue(1);

  useEffect(() => {
    taglineOpacity.value = withDelay(1200, withTiming(1, { duration: 450 }));
    taglineY.value = withDelay(1200, withTiming(0, { duration: 450, easing: Easing.out(Easing.cubic) }));

    progressWidth.value = withDelay(
      400,
      withTiming(1, { duration: SPLASH_MS - 600, easing: Easing.inOut(Easing.cubic) }),
    );

    const finishTimer = setTimeout(() => {
      screenOpacity.value = withTiming(0, { duration: 400 }, (done) => {
        if (done) onFinish();
      });
    }, SPLASH_MS);

    return () => clearTimeout(finishTimer);
  }, [onFinish, progressWidth, screenOpacity, taglineOpacity, taglineY]);

  const taglineStyle = useAnimatedStyle(() => ({
    opacity: taglineOpacity.value,
    transform: [{ translateY: taglineY.value }],
  }));

  const progressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value * 100}%`,
  }));

  const screenStyle = useAnimatedStyle(() => ({
    opacity: screenOpacity.value,
  }));

  return (
    <Animated.View style={[styles.container, screenStyle]}>
      <LinearGradient
        colors={['#050816', '#0a0f1a', '#14080a']}
        style={StyleSheet.absoluteFill}
      />

      <View style={styles.center}>
        <View style={styles.brandBlock}>
          <IntroLogoAnimation width={logoWidth} />
          <Animated.Text style={[styles.tagline, { color: theme.textMuted }, taglineStyle]}>
            {COMPANY.slogan}
          </Animated.Text>
        </View>
      </View>

      <View style={styles.loaderTrack}>
        <Animated.View style={[styles.loaderBar, progressStyle]} />
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 999,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  brandBlock: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    maxWidth: 340,
    width: '100%',
  },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    marginTop: 0,
    paddingHorizontal: 8,
  },
  loaderTrack: {
    position: 'absolute',
    bottom: 72,
    alignSelf: 'center',
    width: 200,
    height: 3,
    backgroundColor: 'rgba(148,163,184,0.12)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loaderBar: {
    height: 3,
    backgroundColor: brand.red,
    borderRadius: 4,
  },
});
