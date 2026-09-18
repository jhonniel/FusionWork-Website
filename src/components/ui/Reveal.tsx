import React, { useCallback, useEffect, useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import { useInView } from '../../hooks/useInView';

type Props = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  delay?: number;
  distance?: number;
  /** Skip IntersectionObserver — show immediately (hero / above-the-fold). */
  immediate?: boolean;
};

/** Simple fade + rise when the block enters the viewport. */
export function Reveal({
  children,
  style,
  delay = 0,
  distance = 12,
  immediate = false,
}: Props) {
  const [shown, setShown] = useState(immediate);
  const progress = useSharedValue(0);

  useEffect(() => {
    if (!immediate) return;
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, immediate, progress]);

  const onEnter = useCallback(() => {
    if (shown) return;
    setShown(true);
    progress.value = withDelay(
      delay,
      withTiming(1, { duration: 520, easing: Easing.out(Easing.cubic) }),
    );
  }, [delay, progress, shown]);

  const setRef = useInView(onEnter, { threshold: 0.08, rootMargin: '0px 0px -4% 0px' });

  const animStyle = useAnimatedStyle(() => ({
    opacity: progress.value,
    transform: [{ translateY: (1 - progress.value) * distance }],
  }));

  return (
    <View ref={immediate ? undefined : setRef} collapsable={false} style={[styles.host, style]}>
      <Animated.View style={[styles.fill, animStyle]}>{children}</Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  host: {
    alignSelf: 'stretch',
  },
  fill: {
    flexGrow: 1,
    width: '100%',
  },
});
