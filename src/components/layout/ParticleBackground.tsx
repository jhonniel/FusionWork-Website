import React, { useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

import { brand } from '../../theme/brand';

type Particle = { id: number; x: number; y: number; size: number; delay: number; color: string };

const ACCENT_PARTICLES = [brand.red, brand.yellow, brand.blue, brand.purple, brand.orange];

function ParticleDot({ particle }: { particle: Particle }) {
  const opacity = useSharedValue(0.15);

  React.useEffect(() => {
    opacity.value = withDelay(
      particle.delay,
      withRepeat(
        withTiming(0.55, { duration: 2600 + particle.id * 100, easing: Easing.inOut(Easing.sin) }),
        -1,
        true,
      ),
    );
  }, [opacity, particle]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return (
    <Animated.View
      style={[
        styles.particle,
        style,
        {
          left: `${particle.x}%`,
          top: `${particle.y}%`,
          width: particle.size,
          height: particle.size,
          backgroundColor: particle.color,
        },
      ]}
    />
  );
}

export function ParticleBackground({ count = 10 }: { count?: number }) {
  const particles = useMemo<Particle[]>(
    () =>
      Array.from({ length: count }, (_, id) => ({
        id,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: 2 + Math.random() * 3,
        delay: Math.random() * 800,
        color: `${ACCENT_PARTICLES[id % ACCENT_PARTICLES.length]}66`,
      })),
    [count],
  );

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="none">
      {particles.map((p) => (
        <ParticleDot key={p.id} particle={p} />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  particle: {
    position: 'absolute',
    borderRadius: 999,
  },
});
