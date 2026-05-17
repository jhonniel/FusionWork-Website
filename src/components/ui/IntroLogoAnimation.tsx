import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  interpolate,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import Svg, { Line } from 'react-native-svg';

import { brand } from '../../theme/brand';

const logoImage = require('../../../assets/fusion-logo-transparent.png');

const AnimatedLine = Animated.createAnimatedComponent(Line);

const HUB = { x: 150, y: 95 };

const ICON_NODES = [
  { x: 52, y: 28, color: brand.yellow, icon: 'laptop-outline' as const, delay: 0 },
  { x: 98, y: 12, color: brand.blue, icon: 'hardware-chip-outline' as const, delay: 80 },
  { x: 168, y: 16, color: brand.orange, icon: 'search-outline' as const, delay: 160 },
  { x: 228, y: 42, color: brand.purple, icon: 'globe-outline' as const, delay: 240 },
  { x: 242, y: 78, color: brand.red, icon: 'film-outline' as const, delay: 320 },
];

function branchLength(x1: number, y1: number, x2: number, y2: number) {
  return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}

function AnimatedBranch({
  x1,
  y1,
  x2,
  y2,
  delay,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  delay: number;
}) {
  const len = branchLength(x1, y1, x2, y2);
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 450, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, progress]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: len * (1 - progress.value),
  }));

  return (
    <AnimatedLine
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={brand.red}
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeDasharray={len}
      animatedProps={animatedProps}
    />
  );
}

function AnimatedIconNode({
  x,
  y,
  color,
  icon,
  delay,
  layoutScale,
}: (typeof ICON_NODES)[0] & { layoutScale: number }) {
  const pop = useSharedValue(0);
  const opacity = useSharedValue(0);

  const px = x * layoutScale;
  const py = y * layoutScale;

  useEffect(() => {
    pop.value = withDelay(delay + 180, withSpring(1, { damping: 11, stiffness: 160 }));
    opacity.value = withDelay(delay + 180, withTiming(1, { duration: 280 }));
  }, [delay, pop, opacity]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: px - 20 }, { translateY: py - 20 }, { scale: pop.value }],
  }));

  return (
    <Animated.View style={[styles.iconNode, style]}>
      <LinearGradient
        colors={[`${color}ee`, `${color}99`]}
        style={[styles.iconBox, { borderColor: `${color}66` }]}
      >
        <Ionicons name={icon} size={18} color="#fff" />
      </LinearGradient>
    </Animated.View>
  );
}

type Props = {
  width?: number;
  onAnimationReady?: () => void;
};

/** Compact animated logo — branches, icons, then full mark (tight vertical layout) */
export function IntroLogoAnimation({ width = 280, onAnimationReady }: Props) {
  const logoOpacity = useSharedValue(0);
  const logoScale = useSharedValue(0.9);
  const logoFloat = useSharedValue(0);
  const iconsLayerOpacity = useSharedValue(1);
  const hubScale = useSharedValue(0);

  const s = width / 300;
  const logoH = width * 0.36;
  const iconsH = width * 0.34;
  /** Total stage height — icons overlap logo slightly to avoid empty gap */
  const stageH = iconsH + logoH - width * 0.06;

  useEffect(() => {
    hubScale.value = withDelay(80, withSpring(1, { damping: 14 }));
    iconsLayerOpacity.value = withDelay(850, withTiming(0, { duration: 350 }));
    logoOpacity.value = withDelay(750, withTiming(1, { duration: 500, easing: Easing.out(Easing.cubic) }));
    logoScale.value = withDelay(750, withSpring(1, { damping: 11, stiffness: 90 }));
    logoFloat.value = withDelay(
      1300,
      withRepeat(
        withSequence(
          withTiming(1, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
          withTiming(0, { duration: 2200, easing: Easing.inOut(Easing.sin) }),
        ),
        -1,
        true,
      ),
    );
    const t = setTimeout(() => onAnimationReady?.(), 1100);
    return () => clearTimeout(t);
  }, [hubScale, logoOpacity, logoScale, iconsLayerOpacity, logoFloat, onAnimationReady]);

  const logoStyle = useAnimatedStyle(() => ({
    opacity: logoOpacity.value,
    transform: [
      { scale: logoScale.value },
      { translateY: interpolate(logoFloat.value, [0, 1], [0, -5]) },
    ],
  }));

  const iconsLayerStyle = useAnimatedStyle(() => ({
    opacity: iconsLayerOpacity.value,
  }));

  const hubStyle = useAnimatedStyle(() => ({
    transform: [{ scale: hubScale.value }],
    opacity: hubScale.value,
  }));

  return (
    <View style={[styles.stage, { width, height: stageH }]}>
      <Animated.View
        style={[styles.iconsLayer, iconsLayerStyle, { width, height: iconsH }]}
      >
        <Svg width={width} height={iconsH} viewBox="0 0 300 110">
          {ICON_NODES.map((node, i) => (
            <AnimatedBranch
              key={i}
              x1={HUB.x}
              y1={HUB.y}
              x2={node.x}
              y2={node.y}
              delay={node.delay}
            />
          ))}
        </Svg>
        <Animated.View style={[styles.hub, hubStyle, { left: HUB.x * s - 5, top: HUB.y * s - 5 }]}>
          <View style={styles.hubDot} />
        </Animated.View>
        {ICON_NODES.map((node) => (
          <AnimatedIconNode key={node.icon} {...node} layoutScale={s} />
        ))}
      </Animated.View>

      <Animated.View style={[styles.logoWrap, logoStyle, { marginTop: -width * 0.04 }]}>
        <Image
          source={logoImage}
          style={{ width: width * 0.92, height: logoH }}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  stage: {
    alignItems: 'center',
    alignSelf: 'center',
  },
  iconsLayer: {
    position: 'relative',
    width: '100%',
  },
  hub: {
    position: 'absolute',
    width: 10,
    height: 10,
  },
  hubDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: brand.red,
  },
  iconNode: {
    position: 'absolute',
    width: 40,
    height: 40,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoWrap: {
    alignItems: 'center',
    width: '100%',
  },
});
