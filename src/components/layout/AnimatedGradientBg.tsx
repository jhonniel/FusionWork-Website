import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { brand } from '../../theme/brand';

/** Brand-colored ambient orbs (red + logo accent hues) */
export function AnimatedGradientBg() {
  const shift = useSharedValue(0);

  useEffect(() => {
    shift.value = withRepeat(
      withTiming(1, { duration: 9000, easing: Easing.inOut(Easing.ease) }),
      -1,
      true,
    );
  }, [shift]);

  const orb1 = useAnimatedStyle(() => ({
    transform: [{ translateX: shift.value * 30 }, { translateY: shift.value * -20 }],
  }));
  const orb2 = useAnimatedStyle(() => ({
    transform: [{ translateX: shift.value * -25 }, { translateY: shift.value * 15 }],
  }));
  const orb3 = useAnimatedStyle(() => ({
    transform: [{ translateX: shift.value * 15 }, { translateY: shift.value * 10 }],
  }));

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      <Animated.View style={[styles.orb, orb1, { top: '8%', left: '0%' }]}>
        <LinearGradient colors={[`${brand.red}28`, 'transparent']} style={styles.orbGradient} />
      </Animated.View>
      <Animated.View style={[styles.orb, orb2, { bottom: '20%', right: '0%' }]}>
        <LinearGradient colors={[`${brand.purple}18`, 'transparent']} style={styles.orbGradient} />
      </Animated.View>
      <Animated.View style={[styles.orbSmall, orb3, { top: '45%', right: '15%' }]}>
        <LinearGradient colors={[`${brand.blue}15`, 'transparent']} style={styles.orbGradient} />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  orb: {
    position: 'absolute',
    width: 360,
    height: 360,
    borderRadius: 180,
  },
  orbSmall: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
  },
  orbGradient: {
    flex: 1,
    borderRadius: 999,
  },
});
