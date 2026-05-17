import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { StyleProp, StyleSheet, Text, TextStyle, View } from 'react-native';

import { useInView } from '../../hooks/useInView';

type ParsedStat = {
  target: number;
  suffix: string;
};

function parseStatValue(value: string): ParsedStat | null {
  const match = value.match(/^(\d+)(.*)$/);
  if (!match) return null;
  return { target: Number.parseInt(match[1], 10), suffix: match[2] };
}

function cubicOut(t: number) {
  return 1 - (1 - t) ** 3;
}

type Props = {
  value: string;
  style?: StyleProp<TextStyle>;
  delay?: number;
  duration?: number;
};

export function CountUpValue({ value, style, delay = 0, duration = 1600 }: Props) {
  const parsed = useMemo(() => parseStatValue(value), [value]);
  const [display, setDisplay] = useState(parsed ? `0${parsed.suffix}` : value);
  const rafRef = useRef<number | null>(null);
  const delayRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cancelAnimation = useCallback(() => {
    if (delayRef.current) {
      clearTimeout(delayRef.current);
      delayRef.current = null;
    }
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!parsed) return;

    cancelAnimation();
    setDisplay(`0${parsed.suffix}`);

    delayRef.current = setTimeout(() => {
      const { target, suffix } = parsed;
      const startTime = performance.now();

      const tick = (now: number) => {
        const t = Math.min((now - startTime) / duration, 1);
        setDisplay(`${Math.round(target * cubicOut(t))}${suffix}`);
        if (t < 1) {
          rafRef.current = requestAnimationFrame(tick);
        }
      };

      rafRef.current = requestAnimationFrame(tick);
    }, delay);
  }, [cancelAnimation, delay, duration, parsed]);

  const setViewRef = useInView(startAnimation, { threshold: 0.25 });

  useEffect(() => {
    if (!parsed) {
      setDisplay(value);
      return;
    }
    setDisplay(`0${parsed.suffix}`);
    return cancelAnimation;
  }, [cancelAnimation, parsed, value]);

  if (!parsed) {
    return <Text style={style}>{value}</Text>;
  }

  return (
    <View ref={setViewRef} collapsable={false} style={styles.wrap}>
      <Text style={[style, styles.tabular]} accessibilityLabel={value}>
        {display}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'center',
  },
  tabular: {
    fontVariant: ['tabular-nums'],
  },
});
