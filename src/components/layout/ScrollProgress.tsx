import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, type SharedValue } from 'react-native-reanimated';

import { brand } from '../../theme/brand';

type Props = { progress: SharedValue<number> };

export function ScrollProgress({ progress }: Props) {
  const barStyle = useAnimatedStyle(() => ({
    width: `${Math.min(100, Math.max(0, progress.value * 100))}%`,
  }));

  return (
    <View style={styles.track}>
      <Animated.View style={[styles.bar, barStyle]}>
        <LinearGradient
          colors={[brand.redBright, brand.red, brand.redDark]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={StyleSheet.absoluteFill}
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  track: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 3,
    zIndex: 100,
    backgroundColor: 'rgba(148,163,184,0.08)',
  },
  bar: { height: 3, borderRadius: 2, overflow: 'hidden' },
});
